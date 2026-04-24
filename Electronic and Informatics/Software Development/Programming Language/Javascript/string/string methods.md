# Penjelasan

Tipe data **String** digunakan untuk merepresentasikan teks.  
Dapat dibuat dengan tanda kutip tunggal `'...'`, ganda `"..."`, atau backtick `` `...` `` (template literal).

```js
let str1 = "Hello";
let str2 = 'World';
let str3 = `Hello, ${str2}`; // Template literal
```

---

## Panjang String

- `str.length` → mengembalikan jumlah karakter dalam string

---

## Akses Karakter

- `str[index]` atau `str.charAt(index)`
- `str.at(index)` → mendukung indeks negatif (ES2022)

```js
"hello"[0];      // "h"
"hello".at(-1);  // "o"
```

---

## Konversi

- `String(num)` → mengubah angka ke string
- `num.toString()` → sama seperti di Number

---

## Ubah Huruf

| Method         | Deskripsi |
|----------------|-----------|
| `str.toUpperCase()` | Ubah ke huruf besar |
| `str.toLowerCase()` | Ubah ke huruf kecil |

---

## Pemangkasan Spasi

| Method         | Deskripsi |
|----------------|-----------|
| `str.trim()`        | Hapus spasi di awal & akhir |
| `str.trimStart()`   | Hapus spasi di awal |
| `str.trimEnd()`     | Hapus spasi di akhir |

---

## Pencarian & Pemeriksaan

| Method / Operator           | Deskripsi |
|-----------------------------|-----------|
| `str.includes(substr)`      | Apakah substr ada di string |
| `str.startsWith(substr)`    | Apakah dimulai dengan substr |
| `str.endsWith(substr)`      | Apakah diakhiri dengan substr |
| `str.indexOf(substr)`       | Index pertama substr (atau -1) |
| `str.lastIndexOf(substr)`   | Index terakhir substr |
| `str.search(regex)`         | Cari posisi dengan regex |
| `str.match(regex)`          | Ambil hasil match regex |
| `str.matchAll(regex)`       | Semua match (iterator, butuh loop/spread) |

---

## Ekstraksi

| Method             | Deskripsi |
|--------------------|-----------|
| `str.slice(start, end)`     | Potong string dari start hingga sebelum end |
| `str.substring(start, end)` | Sama seperti `slice`, tapi tidak mendukung index negatif |
| `str.substr(start, length)` | Ambil `length` karakter dari `start` (deprecated) |

---

## Replace & Manipulasi

| Method                     | Deskripsi |
|----------------------------|-----------|
| `str.replace(find, new)`   | Ganti string (bisa pakai regex) |
| `str.replaceAll(find, new)`| Ganti semua match (ES2021) |
| `str.repeat(n)`            | Ulangi string sebanyak n kali |
| `str.padStart(len, pad)`   | Tambah padding di awal |
| `str.padEnd(len, pad)`     | Tambah padding di akhir |
| `str.split(separator)`     | Pecah string jadi array berdasarkan separator |
| `Array.join(separator)`    | (dari array) Satukan jadi string |

---

## Template Literal (Backtick)

- Gunakan `` `Hello, ${name}!` `` untuk interpolasi variabel.
- Mendukung multi-line string.

```js
let name = "Jane";
`Hello, ${name}!`; // "Hello, Jane!"
```

## Escaping character

Beberapa karakter tidak bisa digunakan seperti biasa escape dengan menambahkan karakter `\` sebelum karater tersebut.
