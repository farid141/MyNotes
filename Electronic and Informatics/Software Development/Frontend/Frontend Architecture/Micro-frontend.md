# Micro-frontend

Tentu! **Micro-frontend** adalah pendekatan arsitektur di mana **UI (frontend)** dari sebuah aplikasi besar dibagi menjadi bagian-bagian kecil yang dapat dikembangkan, diuji, dan di-*deploy* secara **mandiri** oleh tim-tim yang berbeda — mirip dengan konsep **microservice** di backend.

---

## 🧩 Konsep Dasar Micro-Frontend

> **“Each team owns an end-to-end feature, from the database to the user interface.”**
> — Gaya pengembangan modern berbasis domain-driven design

### ⚙ Arsitektur Micro-Frontend

* Aplikasi besar dibagi menjadi beberapa **"fragments"** atau **"sub-apps"**.
* Setiap fragment bisa:

  * Dibuat dengan framework berbeda (React, Vue, Angular, dll).
  * Dideploy secara independen.
  * Dimuat ke dalam satu halaman utama (host atau container app).

## 🧱 Contoh Struktur

Misalnya, aplikasi e-commerce:

```md
+-------------------------------------------------------+
|                ⬅️ Container App (Shell)               |
| +----------+ +-------------------+ +---------------+ |
| | Navbar   | | Product Catalog   | | Shopping Cart | |
| | (Team A) | | (Team B - React)  | | (Team C - Vue)| |
| +----------+ +-------------------+ +---------------+ |
+-------------------------------------------------------+
```

---

## 🚀 Cara Implementasi Micro-Frontend

### 1. **Module Federation (Webpack 5) \[Modern]**

* Fitur Webpack untuk **mengimpor modul dari aplikasi lain secara runtime**.
* Cocok untuk React, Angular, Vue, dll.

#### Langkah Umum

1. **App A (Host)**: Konfigurasi `ModuleFederationPlugin` sebagai host.
2. **App B (Remote)**: Menyediakan komponen/halaman sebagai remote module.
3. **App A** memuat App B secara dinamis saat runtime.

```js
// webpack.config.js (Host)
new ModuleFederationPlugin({
  name: 'hostApp',
  remotes: {
    productApp: 'productApp@http://localhost:3001/remoteEntry.js',
  },
})
```

```js
// Di dalam host (React)
const ProductPage = React.lazy(() => import('productApp/ProductPage'))
```

---

### 2. **Iframe-Based Approach \[Sederhana]**

* Setiap micro-frontend di-*deploy* sebagai aplikasi mandiri, lalu di-*embed* pakai `<iframe>`.
* Isolasi tinggi, mudah dipisah, tapi terbatas dalam integrasi dan komunikasi antar bagian.

---

### 3. **Single-spa (Framework untuk micro-FE)**

* Library open-source untuk menggabungkan beberapa framework frontend dalam satu halaman.
* Mengatur lifecycles antar aplikasi kecil (mount, unmount, load, dll).

```js
registerApplication({
  name: '@team/navbar',
  app: () => System.import('@team/navbar'),
  activeWhen: ['/'],
})
```

---

## ✅ Kelebihan Micro-Frontend

* Tim bisa bekerja secara **independen dan paralel**.
* Setiap bagian bisa di-*deploy* tanpa menunggu yang lain.
* Cocok untuk **aplikasi besar** dan **organisasi besar**.

## ❌ Kekurangan

* Lebih kompleks dalam **build, routing, komunikasi antar bagian**.
* Ukuran bundle bisa membesar jika tidak hati-hati.
* Potensi **inkonsistensi UI/UX**.

---

## 📌 Kapan Sebaiknya Dipakai?

Gunakan micro-frontend jika:

* Kamu memiliki **tim besar** yang menangani bagian frontend berbeda.
* Aplikasi sangat **kompleks dan tumbuh cepat**.
* Ingin **scalability** dan **independen deployment**.

🚦 Kapan Gunakan Yang Mana?
🔧 iframe: Cepat dan mudah. Cocok untuk prototipe, integrasi cepat, atau isolasi tinggi.
⚙️ Webpack MF: Ideal untuk sistem modern yang butuh runtime integration dan efisiensi loading.
🧩 Single-spa: Pilih ini kalau ingin framework-agnostic dan kontrol penuh atas lifecycle antar bagian aplikasi.
