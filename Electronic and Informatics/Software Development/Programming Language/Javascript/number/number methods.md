# Penjelasan

Tipe data **Number** digunakan untuk merepresentasikan angka dalam JavaScript, baik bilangan bulat maupun desimal.

## Konversi ke String

- `num.toString()`  
  Mengubah angka menjadi string.

```js
(123).toString();       // "123"
(123.45).toString();    // "123.45"
```

---

## Pembulatan & Format Angka

| Method               | Deskripsi                                                                 | Contoh |
|----------------------|--------------------------------------------------------------------------|--------|
| `num.toFixed(digits)` | Membulatkan ke jumlah digit desimal tertentu, hasil string              | `(2.345).toFixed(2)` → `"2.35"` |
| `num.toPrecision(len)` | Menyajikan angka dengan panjang total `len` digit (termasuk desimal)     | `(26.67).toPrecision(2)` → `"27"`<br>`(266.67).toPrecision(2)` → `"2.7e+2"` |

---

## Konversi ke Number

| Fungsi / Method         | Deskripsi                                                                 |
|--------------------------|--------------------------------------------------------------------------|
| `Number(str)`            | Konversi string ke number (NaN jika tidak valid sepenuhnya)             |
| `parseInt(str)`          | Mengurai angka bulat dari string (berhenti saat menemukan non-digit)     |
| `parseFloat(str)`        | Mengurai angka desimal dari string                                       |
| `Number(new Date())`     | Konversi tanggal ke number (timestamp dalam ms)                          |

```js
Number("123")         // 123
Number("123abc")      // NaN
parseInt("123abc")    // 123
parseFloat("12.34abc")// 12.34
Number(new Date("2023-01-01")) // 1672531200000
```

---

## Validasi Number

| Method/Fungsi      | Deskripsi                          |
|--------------------|-------------------------------------|
| `isNaN(val)`        | Mengecek apakah nilai adalah `NaN` |
| `isFinite(val)`     | Mengecek apakah nilai bukan `Infinity` atau `NaN` |
| `Number.isInteger(val)` | Mengecek apakah bilangan bulat (true/false) |
| `Number.isNaN(val)`     | Cek spesifik apakah benar-benar `NaN` |
| `Number.isFinite(val)`  | Sama dengan global `isFinite`, tapi tidak coercive |

---

## Konstanta Penting

| Properti              | Nilai / Deskripsi                     |
|------------------------|--------------------------------------|
| `Number.MAX_VALUE`     | Nilai terbesar representasi number   |
| `Number.MIN_VALUE`     | Nilai positif terkecil representasi  |
| `Number.POSITIVE_INFINITY` | Infinity                          |
| `Number.NEGATIVE_INFINITY` | -Infinity                        |
| `Number.NaN`           | Representasi `Not-a-Number`          |
