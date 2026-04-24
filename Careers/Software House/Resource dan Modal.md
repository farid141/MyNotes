# Resource dan Modal

Berikut penjelasan komprehensif mengenai strategi penggunaan VPS sebagai *lab environment* dan pondasi awal software house, serta bagaimana men-deploy banyak aplikasi dari klien berbeda dengan CI/CD yang rapi dan berkelanjutan.

## 1. Apakah satu VPS bisa menjalankan banyak aplikasi?

Ya, **sangat bisa**, dengan syarat arsitektur deployment Anda benar. Secara umum ada tiga pendekatan:

### A. **Multi-App di satu VPS menggunakan Docker**

Ini adalah pendekatan paling umum dan fleksibel untuk software house kecil–menengah.

* Setiap aplikasi dijalankan sebagai **container terpisah**.
* Anda bisa membuat struktur seperti:

  * `client-a-api`
  * `client-a-frontend`
  * `client-b-api`
  * `client-b-frontend`
  * `client-c-worker`
* Port diisolasi, environment variable terpisah.
* Anda bisa menggunakan **Docker Compose** untuk tiap proyek, atau **Traefik / Nginx Reverse Proxy** untuk routing domain ke container tertentu.

#### **Kelebihan**

* Isolasi kuat antara aplikasi.
* CI/CD mudah karena hanya perlu “docker build push pull”.
* Migrasi ke server lain cepat.
* Konflik dependency hampir nol.

#### **Kekurangan**

* Konsumsi RAM lebih besar dibanding bare metal.

## 2. Bagaimana struktur server agar multi-project nyaman?

Contoh struktur direktori di VPS:

```bash
/srv/
   client-a/
      docker-compose.yml
      env/
   client-b/
      docker-compose.yml
      env/
   client-c/
      docker-compose.yml

/opt/reverse-proxy/
   traefik/
      traefik.yml
      acme.json
```

Semua aplikasi tidak saling tabrakan, domain diarahkan lewat reverse proxy.

## 3. Setup agar CI/CD berjalan mulus

### **CI/CD Via Container Registry + Pull di VPS (Paling Stabil)**

**Flow:**

1. Developer push code ke GitHub.
2. GitHub Actions:

   * build image Docker
   * push ke GitHub Container Registry / Docker Hub
3. VPS melakukan:

   * `docker compose pull`
   * `docker compose up -d`

Anda dapat automatisasikan deploy dengan:

* SSH Action (GitHub) ke server
* atau **webhook** yang memicu script deploy di server

**Contoh GitHub Actions:**

```yaml
name: Deploy

on:
  push:
    branches: ["main"]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker Image
        run: docker build -t ghcr.io/user/client-a:latest .

      - name: Push Image
        run: docker push ghcr.io/user/client-a:latest

    # OTOMATISASI UPDATE DI SERVER
      - name: Deploy to VPS
        uses: appleboy/ssh-action@v0.1.10
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_KEY }}
          script: |
            cd /srv/client-a
            docker compose pull
            docker compose up -d
```

**Kelebihan:**

* Build selalu dilakukan di CI, bukan di VPS.
* Versi image tersimpan aman di registry.
* Deployment ke VPS sangat cepat.

## 4. Haruskah setiap client memakai domain/subdomain terpisah?

Idealnya iya.

Misalnya:

* client-a-api.softwarehouse.com
* client-b-dashboard.softwarehouse.com
* client-c-api.softwarehouse.com

Reverse proxy traefik mengarahkan domain sesuai container.

## 5. Apakah 1 VPS cukup jangka panjang?

Tergantung kebutuhan:

| RAM VPS | Kebutuhan                     | Suitable For                  |
| ------- | ----------------------------- | ----------------------------- |
| 2 GB    | 1–2 app kecil                 | Learning                      |
| 4 GB    | 3–6 app kecil                 | Starter software house        |
| 8 GB    | 10+ app microservice kecil    | Small SaaS & multiple clients |
| 16+ GB  | heavy workload, banyak client | Growing business              |

Model scaling:

* Saat klien bertambah → pisahkan ke VPS khusus per client besar.
* Pastikan Anda dapat *snapshot* dan *migrate* cepat.

## 6. Tools yang wajib jika ingin jadi software house

* **Docker**
* **Nginx Proxy Manager atau Traefik**
* **GitHub Actions**
* **GitHub Container Registry**
* Logging (Loki, Promtail) – optional
* Monitoring (Grafana, Prometheus) – optional

Ini membuat workflow profesional dan minim error.

## 7. Rekomendasi Setup untuk Anda

1. Beli VPS 4 GB RAM (awal).
2. Install:

   * Docker
   * Docker Compose
   * Nginx Proxy Manager atau Traefik
3. Struktur direktori `/srv/client-x/`.
4. Semua service berjalan dalam container.
5. Semua deployment melalui CI/CD GitHub → Registry → VPS.

Ini akan membuat Anda sangat siap menjalankan software house dengan standar engineering yang rapi dan kredibel.
