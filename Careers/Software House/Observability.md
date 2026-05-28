# Observability

Observability merupakan kemudahan untuk menemukan penyebab utama dari masalah. Tiga pilar observability:

1. `Logging` Jejak peristiwa/aktivitas aplikasi.
2. `Metrics` Angka terukur seperti request per second, error rate, GC pause, memory, CPU.
3. `Tracing` Menelusuri request end-to-end di banyak service.

Selain 3 point tersebut, biasanya dibutuhkan dashboard visualisasi Grafana.

Urutan identifikasi masalah, pemasangan alert pada prometheus juga memungkinkan penanganan lebih cepat.

1. Metrics => “Something is wrong”
2. Trace => “Where exactly?”
3. Logs => “What exactly happened?”

## 1. Logging

Jejak peristiwa/aktivitas proses yang dijalankan sebuah aplikasi. Aplikasi akan menyimpan log pada `file .log`, kemudian ada `log collector` seperti `promtail` yang akan langsung mengirim ke loki berupa time-series setiap ada perubahan file log yang dipantau.

### Loki

Untuk mengumpulkan detail log dari code, bisa diberi label untuk mempermudah visualisasi. Default Port 3000.

#### Alur Umum Logging

1. Aplikasi → output logs ke stdout/stderr
2. Agent log collector ambil logs
3. Kirim ke Loki

#### Agent Log Collector

Biasanya digunakan ada `Promtail` atau `Aloy`. Didalamnya, kita mengkonfigurasi direktori file `.log` dan url loki, <http://loki:3100/loki/api/v1/push>. Namun biasanya di bahasa pemrograman tersedia library untuk push ke promtail lewat `queue` jadi tidak terlalu menghambat performa.

Alur ini bertujuan agar aplikasi tidak lemot karena ada `proses push ke loki` secara langsung di sebuah endpoint. Karena lebih cepat jika mengeluarkan ke stdout daripada satu proses dengan app.

#### Loki Playground

<https://github.com/hkhcoder/vprofile-project/tree/monitoring>

1. download script sh
2. change execute permission
3. execute permission: it will automatically setup loki service in your machine, and return test result of calling loki service in localhost

## 2. Metrics

Angka terukur seperti `request per second, error rate, GC pause, memory, CPU`. Pola umumnya adalah metrics dari server (`host` dan `app`):

- `app` mengeluarkan metrics dari endpoint `app/metrics`
- `host` mengeluarkan metrics melalui `node-exporter:9100`

Kedua jalur tersebut `discrape` oleh prometheus selama 5 detik sekali.

### Prometheus

```bash
# contoh command
node_cpu_seconds_total
http_requests_total
```

Mengumpulkan metrics http dengan mekanisme `pull-based/scrape` dari:

- service/app level (melalui library BE)
- host level (melalui node exporter) secara berkala.

Default port prometheus `9090`

#### Data Prometheus

Data yang di-pull akan disimpan dalam bentuk time-series.

| timestamp | http_requests_total |
| --------- | ------------------- |
| 10:00:45  | 180                 |
| 10:01:00  | 2                   |
| 10:01:15  | 15                  |
| 10:01:30  | 40                  |

Jenis data dibagi menjadi 2:

- Counter: `request total`, `jobs processed`, `error total`
- Gauge: `memory usage`, `active connections`

Untuk data seperti RPS, biasanya ditampilkan di grafik berupa selisih request/ selisih interval, dikarenakan angka pasti akan terus naik dan hanya turun ketika app down.

#### Lebih Dalam Prometheus

- query by promql
- integrate with alertmanager/Grafana for fancy monitoring
- ideal untuk cloud-native&k8s monitoring
- bisa diakses di webUI
<!-- halaman2 di UI prometheus -->
<!-- query2 prometheus -->

#### Data Node Exporter (Host Level)

- CPU: node_cpu_seconds_total
- Memory: node_memory_MemAvailable_bytes, node_memory_MemTotal_bytes
- Disk: node_disk_read_bytes_total, node_disk_written_bytes_total
- Network: node_network_receive_bytes_total, node_network_transmit_bytes_total

#### Data Metrics (App Level)

Untuk level app, biasanya tersedia `library prometheus` yang akan expose di `/metrics`, kemudian di konfigurasi `prometheus` kita setting untuk mengarah ke endpoint `/metrics` tersebut. Data yang dikumpulkan seperti:

- Request metrics
- Latency (paling penting)
- Error rate
- Resource usage (app-level)
- Custom business metrics

Dalam code yang ditulis, paling umum ada middleware untuk metrics HTTP Request. Kemudian wrapper untuk menghitung latency sebelum dan sudah proses.

Selain itu, kita juga perlu menuliskan pemanggilan observe pada beberapa titik. Agar lebih simple dan clean biasanya dibuat dalam `wrapper` atau `context`.

```python
DB_LATENCY.observe(
    time.perf_counter() - start
)
```

```python
from fastapi import FastAPI, Request
from fastapi.responses import Response
from prometheus_client import (
    Counter,
    Histogram,
    Gauge,
    generate_latest,
    CONTENT_TYPE_LATEST
)
import time

app = FastAPI()

REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total HTTP requests",
    ["method", "route", "status"]
)

# Business Metrics Counter
#########################################
PAYMENT_SUCCESS = Counter(
    "payment_success_total",
    "Successful payments"
)

PAYMENT_FAILED = Counter(
    "payment_failed_total",
    "Failed payments"
)
#########################################

# Common Metrics Query
#########################################
REQUEST_LATENCY = Histogram(
    "http_request_duration_seconds",
    "HTTP request latency",
    ["method", "route"]
)

INFLIGHT_REQUESTS = Gauge(
    "http_requests_in_progress",
    "Current inflight requests"
)
#########################################

@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    start_time = time.time()

    INFLIGHT_REQUESTS.inc()

    response = None

    try:
        response = await call_next(request)
        return response

    finally:
        latency = time.time() - start_time

        route = request.url.path
        method = request.method
        status = response.status_code if response else 500

        REQUEST_COUNT.labels(
            method=method,
            route=route,
            status=status
        ).inc()

        REQUEST_LATENCY.labels(
            method=method,
            route=route
        ).observe(latency)

        INFLIGHT_REQUESTS.dec()

@app.get("/")
async def home():
    return {"message": "hello"}

@app.get("/metrics")
async def metrics():
    return Response(
        generate_latest(),
        media_type=CONTENT_TYPE_LATEST
    )
```

##### App Container Resource Metrics (Cadvisor)

Cadvisor digunakan untuk monitoring metrics semua container, sehingga cukup dibuat satu container host saja.

```yaml
services:
  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"

    # Bind-Mounting ke host level
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker:/var/lib/docker:ro

    privileged: true
```

Konfigurasi Prometheus

```conf
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "cadvisor"
    static_configs:
      - targets: ["cadvisor:8080"]
```

##### Common Prometheus Client Query

```bash
# RPS
rate(http_requests_total[1m])

# Error rate
rate(http_requests_total{status=~"5.."}[5m])

# P95
histogram_quantile(
  0.95,
  rate(http_request_duration_seconds_bucket[5m])
)
```

#### Alert Manager

Merupakan sebuah service tersendiri yang nantinya akan menerima alert dari prometheus dan mengirim notifikasi (email, slack, etc) ke receiver.

```conf
groups :
- name: kubernetes-alerts
  rules:
    - alert: HighPodMemory
      expr: container_memory_usage_bytes > 1e9
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High memory usage detected"
```

Di dalam `AlertManager` terdapat beberapa konfigurasi seperti routing, mengkonfigurasi receiver seperti `webhook` dll.

## 3. Tracing

Berisi proses yang terjadi dilayer code backend secara spesifik by trace_id.

### Tempo

Berguna untuk breakdown trace yang terjadi pada suatu proses.

```python
resource = Resource.create({
    "service.name": "flask-app"
})
provider = TracerProvider(resource=resource)
processor = BatchSpanProcessor(
    OTLPSpanExporter(endpoint="http://tempo:4318/v1/traces")
)

provider.add_span_processor(processor)
trace.set_tracer_provider(provider)
tracer = trace.get_tracer(__name__)

# Penggunaan
with tracer.start_as_current_span("validate-user"):
    logger.info("Validating user")
    time.sleep(0.2)

with tracer.start_as_current_span("query-product"):
    logger.info("Querying product")
    time.sleep(0.3)
```

Pada penggunaan tempo, biasanya dibutuhkan `OLTPExporter` yang berupa service, tapi pada contoh diatas kita gunakan dari library python, jadi menyatu dengan code.

```yaml
tempo:
    image: grafana/tempo:2.9.0
    command: [ "-config.file=/etc/tempo.yaml" ]
    volumes:
        - ./tempo.yaml:/etc/tempo.yaml
    ports:
        - "3200:3200"
        - "4318:4318"
```

## Visualisasi Grafana

Berguna untuk menampilkan data:

- `metrics` dari prometheus yang mengcollect dari node exporter/endpoint app
- `logs` dari loki
- `traces`

Untuk menampilkan data tersebut, tambahkan dulu url app (loki, prometheus, tempo) ke settings->data source

Bisa bikin beberapa dashboard? halaman explore? kemudian apa lagi?

Default port 3000, user/password = admin/admin

## Alternative Tools Aloy

Sebagai "replacement" `promtail` dan `node exporter` sekaligus yaitu `expose metrics serta push logs`. Aloy berjalan sesuai dengan prinsip open telemetry (otel)

## Production Architecture

### Centralized (Big Environment)

Di setiap host / node / vps:

- App container
- Node Exporter
- Log agent (misalnya Promtail)

Di central server:

- Prometheus
- Loki
- Jaeger / Tempo
- Grafana

### One Server (Small Environement)

Bikin docker compose untuk host dan app:

- Host (prometheus, Loki, Tempo, Grafana, AlertManager, Cadvisor)
- App (DB, FE, BE)

apa itu ec2 instance? apakah vps? inbound security group rule?

script untuk webservice EC2 instance "webnode_setup.sh":

1. basic system setup
2. install "prometheus node exporter" dan setup servicenya
3. setup titan app (python flask webservice) dan setup servicenya
4. load generation setup log (menghasilkan file log) dengan memanggil sh script yang melakukan stress
5. install alloy, setting config dan arahkan ke IP prometheus dan endpoint webservice yang akan di scrape, arahkan IPloki yang akan dipush

node exporter dan titan akan dibuat service systemd masing2.

Shell script tersebut juga menjalankan load.sh
nohup /usr/local/bin/load.sh > /dev/null 2>&1 &

- > /dev/null Mengalihkan standard output (stdout) ke /dev/null.
- 2>&1 Mengalihkan standard error (stderr) ke tempat yang sama dengan stdout.

## Tools Linux

- wget bisa digunakan untuk download text/file sh dari website
- systemctl bisa digunakan untuk membuat service custom dalam file systemctl.conf, membuat file service /etc/systemd/system/loki.service
- ufw ubuntu firewall (akses port keluar)
- setting env di bash:
set -e
- /usr/local/bin letakkan file binary difolder ini, maka bisa dieksekusi dari bash

LOKI_VERSION="3.5.7"
LOKI_VERSION="3.5.7"
LOKI_VERSION="3.5.7"
