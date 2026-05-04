# Penjelasan

Pada runtime NodeJS, aplikasi yang digunakan bisa dependen ke modul yang didevelop orang lain. Untuk itu dibutuhkan package manager untuk mengelola modul agar dapat digunakan pada projek kita.

## 📚 **Beberapa Package Manager Populer**

Berikut adalah package manager paling umum digunakan dalam ekosistem Node.js:

### 1. **NPM (Node Package Manager)**

#### 🔹 Deskripsi

* Package manager **resmi** yang disertakan secara default saat menginstal Node.js.
* Mendukung instalasi paket lokal dan global.
* Menggunakan file `package.json` dan `package-lock.json`.

#### 🔹 Kelebihan

* **Default dan terintegrasi** dengan Node.js.
* Ekosistem luas.
* Kompatibilitas tinggi dengan semua proyek Node.js.

#### 🔹 Kekurangan

* Pengelolaan `node_modules` bisa membuat duplikasi besar.
* Versi yang lama (v6 ke bawah) lambat dan tidak deterministik.

---

### 2. **PNPM (Performant NPM)**

#### 🔹 Deskripsi

* Alternatif modern untuk NPM, difokuskan pada **efisiensi dan performa tinggi**.
* Menggunakan **symlink dan hard link** dari store pusat untuk menghindari duplikasi file.
* Lockfile: `pnpm-lock.yaml`

#### 🔹 Kelebihan

* **Instalasi tercepat**.
* **Hemat ruang disk** (tidak ada duplikasi `node_modules`).
* **Dependency isolation ketat**, mencegah hidden bugs.
* Dukungan monorepo bawaan (`pnpm-workspace.yaml`).

#### 🔹 Kekurangan

* Struktur `node_modules` yang lebih strict bisa memunculkan error pada tool lama.
* Butuh adaptasi awal (perintah berbeda dari `npm` seperti `pnpm add` alih-alih `install`).

---

### 3. **Yarn**

#### 🔹 Deskripsi

* Dikembangkan oleh **Facebook** sebagai alternatif dari npm, dengan fokus pada kecepatan dan stabilitas.
* Menggunakan `yarn.lock` untuk manajemen versi.
* Mendukung **Yarn Workspaces** untuk monorepo.

#### 🔹 Kelebihan

* **Instalasi paralel** yang cepat (versi awal lebih cepat dari npm v6).
* Determinisme tinggi.
* Dukungan baik untuk proyek besar dan monorepo.

#### 🔹 Kekurangan

* Versi 1 dan 2 berbeda signifikan, membuat migrasi agak rumit.
* Lebih kompleks jika dibandingkan `npm` dan `pnpm`.
* Yarn v2+ menggunakan format baru (`Plug'n'Play`) yang tidak kompatibel dengan semua tool.

---

## 📊 **Tabel Perbandingan Singkat**

| Fitur / Tool              | **npm**         | **pnpm**          | **yarn**         |
| ------------------------- | --------------- | ----------------- | ---------------- |
| Kecepatan Instalasi       | 🟡 Sedang       | 🟢 Cepat 🔝       | 🟢 Cepat         |
| Penggunaan Disk           | 🔴 Boros        | 🟢 Sangat hemat   | 🟡 Cukup efisien |
| Determinisme              | 🟡 Baik         | 🟢 Sangat baik    | 🟢 Baik          |
| Struktur `node_modules`   | 🔓 Longgar      | 🔒 Ketat & rapih  | 🔓 Longgar       |
| Dukungan Monorepo         | 🟡 Terbatas     | 🟢 Built-in       | 🟢 Workspaces    |
| Kompatibilitas dengan npm | 🟢 Penuh        | 🟢 Penuh          | 🟢 Penuh         |
| Learning Curve            | 🟢 Umum dikenal | 🟡 Butuh adaptasi | 🟢 Mudah         |

## 🚀 **Kesimpulan**

* **npm**: Cocok untuk pemula dan standar industri, apalagi versi terbaru (v7+) sudah cukup cepat.
* **pnpm**: Ideal untuk proyek besar, tim kolaboratif, dan penggunaan jangka panjang. Sangat efisien dan modern.
* **Yarn**: Masih populer di proyek besar, tapi tergantung pada preferensi tim dan tool yang digunakan.
