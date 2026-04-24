# 💡 Apa itu Virtual DOM?

**Virtual DOM** adalah **representasi JavaScript dari DOM asli (real DOM)** yang ada di browser.

Daripada langsung memanipulasi elemen di halaman web (real DOM), React pertama-tama membuat versi virtual-nya di memori, lalu:

1. Melakukan perubahan di virtual DOM
2. Membandingkan dengan versi sebelumnya (proses ini disebut *diffing*)
3. Baru setelah itu **meng-update hanya bagian kecil dari real DOM yang benar-benar berubah**

---

## 🧠 Kenapa Pakai Virtual DOM?

Karena **manipulasi DOM asli itu lambat**. Kalau setiap perubahan langsung menyentuh real DOM, performa bisa turun, apalagi di aplikasi besar.

Dengan virtual DOM, React bisa:

- Menghindari manipulasi langsung ke real DOM sesering mungkin
- Hanya update bagian yang berubah
- Mengurangi repaint dan reflow di browser
- Menjaga performa tetap stabil

---

## 🔁 Proses Kerja Virtual DOM

1. **Render pertama**:  
   React membuat virtual DOM berdasarkan JSX yang kita tulis, lalu render ke real DOM.

2. **Ada perubahan (state/props)**:  
   React membuat **virtual DOM baru** → membandingkan dengan yang lama (**diffing**)

3. **Reconciliation**:  
   React mencari perbedaan (diff), lalu membuat **"patch"** — perubahan minimum yang perlu dilakukan

4. **Update real DOM**:  
   React meng-update hanya elemen yang berubah di real DOM

---

### 🎯 Contoh Ilustrasi

Misalnya kamu punya komponen:

```jsx
function App() {
  const [count, setCount] = useState(0);
  return <h1>Count: {count}</h1>;
}
```

- Pertama kali: React render `<h1>Count: 0</h1>` ke virtual DOM, lalu ke real DOM
- Saat `setCount(1)`:  

    - React buat virtual DOM baru: `<h1>Count: 1</h1>`
    - Bandingkan dengan yang lama
    - Hanya bagian teks “0” ke “1” yang berubah
    - React update hanya bagian itu di real DOM

🚀 Cepat, efisien, tanpa reload halaman.

---

## 🔄 Diagram Singkat

1. JSX → Virtual DOM → Real DOM (Render pertama)
2. State berubah → Virtual DOM baru
3. Compare (diff) → Cari perubahan
4. Patch → Update real DOM
