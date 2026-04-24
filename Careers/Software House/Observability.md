# Monitoring & Observability

## Monitoring

Monitoring merupakan cara menampilkan komparasi `metriks` dengan `treshold` secara garis besar.

Contoh umum:

- cpu
- memory
- response time
- server load
- network traffic
- db query

hanya untuk antisipasi hal yang sudah diperhitungkan

## Observaiblity

Observability merupakan kemudahan untuk menemukan penyebab utama dari masalah. Tiga pilar observability:

1. `Logging` Jejak peristiwa/aktivitas aplikasi.
2. `Metrics` Angka terukur seperti request per second, error rate, GC pause, memory, CPU.
3. `Tracing` Menelusuri request end-to-end di banyak service.

### Minimal

- Logging struktur JSON, dipasang middleware
- Error monitoring (Sentry atau Rollbar)

#### Tools Pendukung Lainnya

- `Grafana` frontend UI untuk tampilin logs, metrics, 
- `Prometheus` db storing metrics (time series)
- `Tempo` db for storing traces
- `Loki` db for storing logs
- `Open Telemetry` (vendor agnostic) collect data
- `Sentry` Error Program

docker image `grafana/otel-lgtm` (not recomend for prod)
