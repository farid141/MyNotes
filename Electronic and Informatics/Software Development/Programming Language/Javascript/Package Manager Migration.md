# Package Manager

## 1. Instalasi pnpm

Jika pnpm belum terpasang:

```sh
npm install -g pnpm
```

Atau menggunakan corepack (lebih direkomendasikan untuk Node versi baru):

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

## 2. Hapus artifact npm (opsional tapi direkomendasikan)

Agar lingkungan bersih:

```sh
rm -rf node_modules
rm package-lock.json
```

## 3. Instal ulang dependensi menggunakan pnpm

```sh
pnpm install
```

pnpm akan membuat `pnpm-lock.yaml` sebagai gantinya.

## 4. Update script yang mungkin mengacu ke npm

Biasanya Anda tidak perlu mengubah apa pun, karena perintah dalam `package.json` tetap sama.
Misal:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build"
}
```

Tetap dapat dijalankan:

```sh
pnpm dev
pnpm build
```

Namun, jika ada script yang secara eksplisit memanggil `npm`, misalnya:

```json
"scripts": {
  "prepare": "npm run build"
}
```

Anda ubah menjadi:

```json
"prepare": "pnpm build"
```

## 5. Integrasi workspace (jika monorepo)

Jika proyek Anda monorepo, pnpm mendukung workspace dengan cepat. Tambahkan `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

## 6. Validasi lingkungan

Jalankan:

```sh
pnpm -v
pnpm install
pnpm run dev
```

Pastikan tidak ada error terkait resolusi modul.

---

Jika Anda mau, saya dapat membantu melakukan **konversi otomatis** hanya dengan melihat `package.json` dan struktur proyek Anda — tinggal kirimkan saja.
Memindahkan proyek JavaScript/Node.js ke drive lain di Windows **sebaiknya tidak membawa folder `node_modules`**, karena:

1. `node_modules` biasanya sangat besar.
2. Path absolut di Windows kadang berubah dan bisa menyebabkan dependency rusak.
3. Lebih aman melakukan reinstall menggunakan npm/pnpm/yarn setelah dipindah.

Berikut langkah yang direkomendasikan:

---

## Cara Memindahkan Proyek ke Drive Lain (Windows)

## 1. Copy folder proyek **tanpa** `node_modules`

Salin seluruh folder proyek Anda, **kecuali** `node_modules`.

Jika ingin otomatis mengabaikan:

* Pastikan ada `.gitignore` yang berisi `node_modules`.
* Copy melalui Git clone (jika pakai Git), atau manual delete terlebih dahulu.

## 2. Setelah proyek berada di lokasi baru, hapus file lock (opsional)

Jika sebelumnya menggunakan npm:

`package-lock.json`

Jika ingin pastikan clean install, hapus file tersebut.

**Kalau mau migrasi ke pnpm**, hapus package-lock.json.

## 3. Reinstall dependensi

### Jika tetap pakai npm

```sh
npm install
```

### Jika sudah migrasi ke pnpm

```sh
pnpm install
```

Ini akan membangun kembali `node_modules` yang benar sesuai proyek dan environment di lokasi baru.

---

## Catatan Tambahan

### 1. `node_modules` jangan pernah dicopy manual

* Banyak symbolic link.
* Struktur folder sangat dalam → Windows sering error “path too long”.
* Lebih cepat install ulang daripada copy.

### 2. Kalau proyek Anda besar dan ingin mempercepat

Gunakan pnpm agar node_modules tidak terlalu besar.

### 3. Jika proyek adalah monorepo atau workspace

Setelah dipindah, lakukan:

```sh
pnpm install --recursive
```

---

Jika Anda mau, kirimkan **struktur folder proyek** atau isi `package.json`, dan saya bantu review apakah aman untuk dipindahkan atau ada hal yang harus disesuaikan.
Ya, **bisa**, tetapi **bukan dengan memindahkan isi folder `node_modules` secara langsung**. pnpm **tidak menggunakan struktur `node_modules` yang sama** dengan npm, sehingga isi `node_modules` lama **tidak bisa dipakai ulang**.

Namun, **dependensi yang sudah terpasang** (daftarnya) bisa di-convert dan diinstal ulang oleh pnpm.

Berikut cara yang benar:

---

## 1. pnpm Tidak Memakai Struktur `node_modules` Seperti npm

npm membuat struktur *nested* (tertanam banyak folder di dalam folder lain).
pnpm menggunakan **content-addressable store** (**global store**) dan membuat symlink yang rapi.

Akibatnya:

* Folder `node_modules` hasil npm **tidak kompatibel** dengan pnpm.
* Tidak bisa sekadar "dipindahkan".

---

## 2. Yang DAPAT Dipindahkan: Daftar Dependensi (package.json)

Jika di `package.json` sudah ada dependency misalnya:

```json
"dependencies": {
  "express": "^4.18.2",
  "axios": "^1.1.0"
}
```

Maka pnpm cukup menjalankan:

```sh
pnpm install
```

pnpm akan:

* Membaca dependency list dari `package.json`
* Melakukan resolusi ulang
* Menghasilkan `pnpm-lock.yaml`
* Membuat struktur `node_modules` versi pnpm

---

## 3. Cara Migrasi Lengkap dari npm ke pnpm

1. **Hapus `node_modules`:**

   ```sh
   rm -rf node_modules
   ```

2. **Hapus lock file npm:**

   ```sh
   del package-lock.json
   ```

   (opsional tetapi direkomendasikan)
3. **Jalankan instalasi ulang dengan pnpm:**

   ```sh
   pnpm install
   ```

---

## 4. Bagaimana Dengan Dependensi Global (npm -g)?

Jika Anda ingin memigrasikan paket global dari npm ke pnpm:

Lihat daftar global:

```sh
npm ls -g --depth=0
```

Instal ulang di pnpm:

```sh
pnpm add -g <nama-package>
```

Tidak ada cara otomatis untuk memindahkan, tetap perlu reinstall.

---

## Ringkasan

| Yang Bisa Dipindahkan                 | Bisa? | Cara                |
| ------------------------------------- | ----- | ------------------- |
| Folder `node_modules` dari npm → pnpm | Tidak | Wajib install ulang |
| Daftar dependency di package.json     | Bisa  | pnpm install        |
| Paket global npm → pnpm               | Bisa  | Reinstall manual    |

---

Jika Anda ingin, saya bisa bantu:

* Review package.json Anda
* Buatkan command migrasi otomatis
* Analisis risiko perubahan versi setelah pindah ke pnpm

Tinggal kirimkan `package.json` Anda.
Baik, berikut **SOP/workflow resmi** yang aman dan stabil jika Anda ingin memakai **pnpm di lokal**, tetapi repository origin dan deployment tetap memakai **npm**.

Saya susun dengan format yang bisa langsung dipakai untuk dokumentasi tim.

---

# SOP Workflow

**Lokal menggunakan pnpm • Origin/CI menggunakan npm**
(Stabil, aman, tidak bentrok)

---

## 1. Setup Lokal (Developer)

### 1.1. Install dependency

Gunakan pnpm:

```
pnpm install
```

### 1.2. Tambah dependency

```
pnpm add <package>
```

### 1.3. Hapus lock file pnpm dari Git

Pastikan Anda menambahkannya ke `.gitignore`:

```
pnpm-lock.yaml
```

Agar tidak memengaruhi workflow tim.

---

## 2. Update package-lock.json untuk Origin (NPM)

Setiap kali Anda menambah atau menghapus dependency dengan pnpm, jalankan:

```
npm install --package-lock-only
```

Fungsi perintah ini:

* Mengupdate **package-lock.json**
* Tidak mengubah **node_modules**
* Tidak bentrok dengan pnpm
* 100% aman untuk development

---

## 3. Commit ke Repository

Commit hanya file berikut:

* `package.json`
* `package-lock.json`
  (hasil update dari npm)
* kode sumber Anda

Jangan commit:

* `pnpm-lock.yaml`
* `node_modules`

---

## 4. Developer lain / CI/CD

Developer lain atau CI/CD pipeline cukup menjalankan:

```
npm ci
```

Manfaat:

* Menggunakan package-lock.json yang sudah Anda update
* Build reproducible
* Tidak perlu pnpm di server CI/CD

Semua proses deploy tetap konsisten menggunakan npm.

---

# Ringkasan Cepat (Cheatsheet)

**Tambah dependency di lokal (pnpm):**

```
pnpm add <pkg>
```

**Update lock npm:**

```
npm install --package-lock-only
```

**Commit:**

* package.json
* package-lock.json

**Ignore:**

* pnpm-lock.yaml

**Origin/CI:**

```
npm ci
```

---

Jika Anda ingin, saya bisa buatkan versi Markdown-nya atau versi yang siap ditempel di README proyek/tim Anda.
