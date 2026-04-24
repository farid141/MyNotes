# Production

Hasil build di Go berupa binary, sehingga tidak perlu webserver lagi untuk menjalankannya.

## Build Go

## 1️⃣ Jalankan build Go di **local**

Misal kamu sudah punya file Go (`main.go`) dan sudah di-build menjadi binary:

```bash
go build -o myapp main.go
```

Binary `myapp` sudah siap dijalankan di platform sesuai tempat build.

### a. Buat Dockerfile sederhana

Misal multi-stage build supaya image final kecil:

```dockerfile
# Stage 1: Build
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o myapp

# Stage 2: Minimal image
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/myapp .
# Optional: copy configs, scripts, etc.
# COPY config.yaml .

# Set default ENV
ENV APP_ENV=development
ENV PORT=8080

EXPOSE 8080

CMD ["./myapp"]
```

### b. Build image

```bash
docker build -t myapp:latest .
```

### c. Buat dan jalankan container dengan env custom

```bash
docker run -it --rm \
  -e APP_ENV=production \
  -e PORT=3000 \
  -p 3000:3000 \
  myapp:latest
```

* `-e` untuk override environment variable.
* `-p host:container` untuk port mapping.

## Cross Platform

* Multi-stage build bikin **image lebih kecil** karena hanya membawa binary, tanpa source code atau Go SDK.
* Pastikan binary Go kamu **di-build untuk target OS/ARCH** image Docker. Misal alpine pakai `CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o myapp`.
