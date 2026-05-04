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

Jejak peristiwa/aktivitas proses yang dijalankan sebuah aplikasi. Pola umumnya adalah, semua logs akan disimpan dalam loki sebagai time series, dimana data dipush oleh `log collector` seperti `promtail`. Dimana promtail akan langsung mengirim ke loki setiap ada perubahan file log yang dipantau.

### Loki

Untuk mengumpulkan detail log dari code, bisa diberi label untuk mempermudah visualisasi. Default Port 3000.

#### Alur Umum Logging

1. Aplikasi → output logs ke stdout/stderr
2. Agent log collector ambil logs
3. Kirim ke Loki

Agent Log Collector yang biasanya digunakan ada `Promtail` atau `Aloy`.

Alur ini bertujuan agar aplikasi tidak lemot karena ada proses push ke loki secara langsung di sebuah endpoint. Karena lebih cepat jika mengeluarkan ke stdout.

#### Loki Playground

<https://github.com/hkhcoder/vprofile-project/tree/monitoring>

1. download script sh
2. change execute permission
3. execute permission: it will automatically setup loki service in your machine, and return test result of calling loki service in localhost

## 2. Metrics

Angka terukur seperti request per second, error rate, GC pause, memory, CPU. Pola umumnya adalah metrics dari server (`host` dan `app`):

- `app` mengeluarkan metrics dari endpoint `/metrics`
- `host` mengeluarkan metrics melalui ...

Kedua jalur tersebut discrape oleh prometheus selama 5 detik sekali.

### Prometheus

```bash
# contoh command
node_cpu_seconds_total
http_requests_total
```

Mengumpulkan metrics http dengan mekanisme pull-based dari:

- service/app level (melalui library BE)
- host level (melalui node exporter) secara berkala.

Default port 9090

Data yang di-pull akan disimpan dalam bentuk time-series.

Bisa juga digunakan untuk alerting, ketika metrics mencapai nilai tertentu, maka akan memberikan peringatan berupa email, slack, dll.

#### Lebih Dalam Prometheus

<!-- halaman2 di UI prometheus -->
<!-- query2 prometheus -->

#### Data Node Exporter

- CPU
- Memory
- Disk
- Network

#### Data Metrics App

Untuk level app, biasanya tersedia library prometheus yang akan expose di `/metrics`, kemudian di konfigurasi prometheus kita setting untuk mengarah ke endpoint app tersebut. Data yang dikumpulkan seperti:

- Request metrics
- Latency (paling penting)
- Error rate
- Resource usage (app-level)
- Custom business metrics

#### Fitur Prometheus

- query by promql
- integrate with alertmanager/Grafana for fancy monitoring
- ideal untuk cloud-native&k8s monitoring
- bisa diakses di webUI

#### Alert Manager

Mengirim notifikasi (email, slack, etc) berdasarkan prometeus (jadi bukan code langsung).

### Node Exporter

Selain ingin tahu data2 yang diterima oleh prometheus dari scraping node exporter, saya juga ingin tahu lebih dalam fitur2 lain, apa ada?.

## 3. Tracing

Berisi proses yang terjadi dilayer code backend.

## Visualisasi Grafana

Berguna untuk menampilkan data:

- `metrics` dari prometheus yang mengcollect dari node exporter/endpoint app
- `logs` dari loki
- `traces`

Untuk menampilkan data tersebut, tambahkan dulu url app (loki, prometheus, tempo) ke settings->data source

Bisa bikin beberapa dashboard? halaman explore? kemudian apa lagi?

Default port 3000, user/password = admin/admin

## Alternative Tools Aloy

Sebagai "replacement" `promtail` dan `node exporter` sekaligus yaitu collect metric serta logs. Aloy berjalan sesuai dengan prinsip open telemetry (otel)

## Production Architecture

### Host

Di setiap host / node:

- App container
- Node Exporter
- Log agent (misalnya Promtail)

### Central

- Prometheus
- Loki
- Jaeger / Tempo
- Grafana

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
