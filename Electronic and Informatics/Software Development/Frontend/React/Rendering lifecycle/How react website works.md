# Penjelasan

## 🔧 **Struktur Dasar Project React**

Ketika kamu membuat project React (misalnya dengan `create-react-app`), kamu akan mendapatkan struktur seperti ini:

```bash
my-app/
├── public/
│   └── index.html     ← Titik awal HTML aplikasi
├── src/
│   ├── index.jsx      ← Entry point React
│   ├── App.jsx        ← Komponen utama
│   └── ...            ← Komponen lainnya
├── package.json       ← Dependency & script
```

---

## 🧩 **1. index.html – Titik Awal Aplikasi**

File ini berada di folder `public/`. Ini adalah satu-satunya file HTML yang dikirim ke browser. Di dalamnya ada tag `<div>` kosong yang akan diisi oleh React.

Contoh:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>React App</title>
</head>
<body>
  <div id="root"></div>  <!-- Inilah yang akan dimanipulasi React -->
</body>
</html>
```

📌 **Catatan:** React tidak membuat banyak halaman HTML. React hanya memanipulasi elemen dalam div `id="root"` menggunakan JavaScript dan konsep Virtual DOM.

---

## 🔄 **2. index.jsx – Titik Masuk React**

File ini adalah jembatan antara HTML dan komponen React. Di sinilah React mulai bekerja.

Contoh:

```jsx
// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

🔍 **Penjelasan**:

- `ReactDOM.createRoot(...)`: Mengambil elemen `<div id="root">` dari `index.html`
- `.render(<App />)`: Merender komponen `App` ke dalam elemen tersebut
- Jadi, semua komponen React akan tampil di dalam `<div id="root">`

---

## 🧱 **3. App.jsx – Komponen Utama**

`App.jsx` adalah komponen React pertama yang dirender. Di dalamnya bisa ada banyak komponen lain.

Contoh:

```jsx
// src/App.jsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <h1>Hello from React!</h1>
      <Footer />
    </div>
  );
}

export default App;
```

📌 **Setiap komponen di React adalah fungsi (function component)** yang mengembalikan JSX — yaitu sintaks mirip HTML yang nanti diubah menjadi elemen DOM nyata.

---

## ⚙️ **Bagaimana React Bekerja Secara Umum**

1. Browser membuka `index.html`
2. React (melalui `index.jsx`) mencari `<div id="root">`
3. React me-render komponen `App.jsx` ke dalam div itu
4. Di dalam `App.jsx`, bisa ada banyak komponen lain → ini disebut "component tree"
5. Jika ada perubahan (state berubah), React **tidak reload seluruh halaman**, tapi hanya bagian yang berubah di Virtual DOM → cepat dan efisien.

---

## 🔄 Ringkasan Alur

```bash
index.html → <div id="root">
      ↑
index.jsx → ReactDOM.createRoot().render(<App />)
      ↑
App.jsx → Komponen utama, bisa punya banyak anak komponen
```
