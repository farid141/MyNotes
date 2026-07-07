# Best Practice Tracing

## Agar investigasi berjalan mulus

Kunci keberhasilan observability bukan hanya memasang tool, tetapi juga memastikan ketiganya saling terhubung. Praktik yang sangat disarankan adalah:

* **Gunakan OpenTelemetry** untuk menghasilkan trace dan metrics secara konsisten.
* **Sertakan `trace_id` dan `span_id` di setiap log**, sehingga Loki bisa langsung mengaitkan log dengan trace yang sedang dilihat.
* **Tambahkan label penting** seperti `service_name`, `environment`, `version`, `endpoint`, dan `status_code` pada metrics, logs, dan traces.
* **Gunakan structured logging (JSON)** agar log mudah difilter berdasarkan `user_id`, `request_id`, `trace_id`, atau atribut lainnya.

Dengan praktik tersebut, alur investigasi menjadi sangat cepat: mulai dari alert atau lonjakan metrik di dashboard, masuk ke trace untuk menemukan service yang bermasalah, lalu membuka log spesifik dari request yang sama untuk menemukan akar penyebabnya. Ini adalah workflow observability yang umum digunakan pada sistem produksi modern.

## Microservice VS Monolith

### Metrics

```bash
http_requests_total{
    job="order-service", # Tambahkan hanya untuk microservice
    method="POST",
    route="/checkout",
    status="500"
}
```

### Logging

Biasanya terdapat `request_id` yang sama dalam satu proses/service di dalamnya. Untuk microservice, dishare dalam Headers `X-Request-ID: req-123`.

### Trace

Sebuah observability perusahaan tidaklah selalu lengkap. Terkadang kalo tidak pake `tracing`, perusahaan cukup menggunakan `request_id`.

Sedangkan dalam tracing, terkadang tidak perlu menggunakan `request_id` karena sudah ada `trace_id` yang cara kerja hampir sama, tetapi kita juga punya `span_id` yang merupakan `child` dari `trace_id`. Nantinya dalam grafana, kita dapat menghubungkan `loki` dengan `trace`, ketika span diklik, akan menampilkan log berkaitan dengan span tersebut.

Namun, dalam beberapa kasus, request_id tetap disertakan dikarenakan ada beberapa tools yang tidak support `oTel` namun support:

* Nginx
* API Gateway
* Load Balancer
* Legacy Service
* Cron Job

#### Span dalam Span

Konsep utama tracing adalah kita dapat membuat span dalam span

```bash
HTTP POST /checkout

├── Validate Token

├── OrderService.checkout()
│
│   ├── Inventory.reserve()
│   │
│   │   └── SELECT inventory
│   │
│   ├── Payment.charge()
│   │
│   │   └── HTTP POST Payment Gateway
│   │
│   └── OrderRepository.save()
│       │
│       └── INSERT orders
│
└── Response
```
