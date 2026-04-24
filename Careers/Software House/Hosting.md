# Hosting

Hosting adalah istilah layanan yang dapat diakses internet. Ada beberapa jenis hosting

## Layanan Tersedia

**Hosting** = layanan yang menyediakan:

1. **Server** (komputer yang selalu menyala 24/7)
2. **Storage** (tempat file website, API, database, atau aplikasi)
3. **Network** (IP publik, bandwidth, DNS)
4. **Environment** (software pendukung seperti PHP, Node.js, Nginx, database, dll)

## Jenis Aset yang Bisa di-Hosting

Hosting tidak selalu berarti “website”. Bisa berupa:

* Website (HTML, WordPress, React build)
* Backend API (FastAPI, Express, Laravel, Go)
* File statis (gambar, dokumen)
* Database
* Microservice
* Container (Docker)
* Virtual Machine

Makanya hosting banyak jenisnya: shared hosting, VPS, cloud hosting, object storage hosting, database hosting, container hosting, dan lain-lain.

### Hosting Umumnya

Oke, mari kita bedah perbedaan antara **shared hosting**, **VPS**, dan **cloud hosting** secara jelas dan sistematis. Saya juga akan kasih insight kapan cocok pakai yang mana.

### 1. **Shared Hosting**

* **Definisi:** Banyak website berbagi satu server fisik yang sama. Semua sumber daya (CPU, RAM, disk) dibagi rata.

Pembagian rata disini adalah semisal 1 server fisik dengan RAM `10GB` dipakai `50 web`:

* `10 web aktif` maka masing2 dapat `1GB`
* `20 web aktif` maka masing2 dapat `0.5GB`

* **Kelebihan:**

  * Murah, biasanya paket bulanan sangat terjangkau.
  * Cocok untuk pemula atau website kecil (blog, portofolio).
  * Tidak perlu konfigurasi server, biasanya sudah siap pakai.
* **Kekurangan:**

  * Performa tidak stabil (kalau website lain di server ramai, situs kamu bisa lambat).
  * Akses root / custom software terbatas.
  * Skalabilitas rendah, tidak ideal untuk website yang traffic tinggi.

### 2. **VPS (Virtual Private Server)**

* **Definisi:** Server fisik dibagi menjadi beberapa virtual server menggunakan virtualisasi. Setiap VPS punya sumber daya sendiri (RAM, CPU, disk) yang dedicated untuk kamu.
* **Kelebihan:**

  * Lebih stabil daripada shared hosting.
  * Bisa akses root, install software sesuai kebutuhan.
  * Lebih aman karena resources terisolasi.
  * Cocok untuk website menengah, aplikasi, atau backend kecil.
* **Kekurangan:**

  * Lebih mahal dibanding shared hosting.
  * Perlu pengetahuan server (Linux, konfigurasi web server, firewall).
  * Maintenance ditanggung pengguna (kecuali managed VPS).

### 3. **Cloud Hosting**

* **Definisi:** Hosting berbasis cloud, biasanya menggunakan jaringan server di banyak lokasi. Sumber daya bisa scale secara otomatis sesuai traffic.
* **Kelebihan:**

  * Sangat scalable, cocok untuk traffic fluktuatif atau tinggi.
  * Redundancy tinggi → kalau satu server down, server lain bisa take over.
  * Bisa bayar sesuai penggunaan (pay-as-you-go).
  * Bisa konfigurasi lebih fleksibel, mirip VPS tapi lebih modern.
* **Kekurangan:**

  * Harga bisa lebih mahal, terutama jika traffic tinggi.
  * Bisa lebih kompleks untuk setup awal.
  * Kadang terlalu overkill untuk website kecil/simple.

### **Ringkasan Perbandingan**

| Fitur          | Shared Hosting   | VPS                        | Cloud Hosting                             |
| -------------- | ---------------- | -------------------------- | ----------------------------------------- |
| Biaya          | Murah            | Menengah                   | Menengah–Tinggi                           |
| Kontrol server | Terbatas         | Full root akses            | Full root/managed                         |
| Skalabilitas   | Rendah           | Medium                     | Tinggi                                    |
| Keamanan       | Rendah (bersama) | Medium                     | Tinggi (isolasi & redundansi)             |
| Maintenance    | Minim            | Tanggung pengguna          | Bisa managed/otomatis                     |
| Cocok untuk    | Blog, portofolio | Aplikasi, website menengah | Startup, aplikasi skala besar, e-commerce |

## Istilah yang sering dipakai

* **Web Hosting** → hosting untuk website
* **App Hosting** → hosting untuk aplikasi (web app, backend)
* **Database Hosting** → hosting khusus database
* **Cloud Hosting** → hosting dengan infrastruktur cloud

Tapi secara umum orang menyebut semua itu **hosting**.
