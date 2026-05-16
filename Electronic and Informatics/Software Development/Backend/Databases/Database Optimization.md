# Database Optimization

Proses mendesain database supaya pencarian, insert, update, delete tetap efisien meskipun datanya jutaan row.

## Indexing

Penerapannya bagus untuk kolom yang sering dipakai dalam operasi:

- WHERE
- JOIN
- ORDER BY
- GROUP BY

Semisal created at pada `Where created_at >= 2026-01-01`

Dengan memberikan index, kita seolah2 memberi tahu db bagaimana menyimpan dan mendapatkan data dari table.

### Composite Index

Merupakan index terdiri dari 2 kolom `(company_id, status)`. Urutan disini penting, karena urutan dari awal akan berdampak. Dalam index tersebut, kita tidak perlu bikin index `company_id` lagi karena sudah include. Namun kita boleh menambahkan index `status` jika memang sering menggunakan kolom itu dalam operasi `where`

Berikut adalah ilustrasi penyimpanan yang dilakukan db ketika kita menerapkan index tersebut.

| company_id | status  |
| ---------- | ------- |
| 1          | paid    |
| 1          | pending |
| 1          | unpaid  |
| 2          | paid    |
| 2          | pending |
| 3          | paid    |

Semisal kita menambahkan index `status` disamping composite index tersebut, maka kita akan mendapatkan `katalog` tambahan seperti berikut:

paid    -> company 1
paid    -> company 2
paid    -> company 3
pending -> company 1
pending -> company 2
unpaid  -> company 1

### Best Practice

Jangan berikan terlalu banyak index pada suatu table, karena akan memperberat operasi insert. Gunakanlah untuk table yang datanya sangat banyak dan sering dipake.

### Jangan Gunakan fungsi

Query dengan fungsi akan membuat indexing sia-sia, karena tiap baris akan dikonversi dengan fungsi dahulu

```sql
-- Bad
SELECT *
FROM orders
WHERE YEAR(created_at) = 2026;

-- Better
SELECT *
FROM orders
WHERE created_at >= '2026-01-01'
AND created_at < '2027-01-01';
```

## Pagination

Terapkan data dengan pagination cursor jika memungkinkan

```sql
-- common
LIMIT 50 OFFSET 0

-- cursor
WHERE id > last_id
LIMIT 50
```

Tetapi, kekurangannya adalah UI tidak bisa loncat2 karena harus tahu `last_id`, kita harus menampilkan data dari id awal, dan menjadikan id akhir dari data awal ke request berikutnya.

Sehingga, cursor pagination tidak selalu menjadi solusi terbaik, biasanya digunakan untuk data:

- audit log
- notification feed
- activity history
- event stream

Atau mungkin dipadukan dengan filter `hari`. Agar seolah2 user dapat loncat.

## Normalization & Denormalization

Normalisasi adalah memecah kolom2 sebuah tabel ke tabel tersendiri agar data tidak redundant. Kita jadi memiliki relasi ke tabel dan dapat menambah kolom untuk table entitas tersebut dengan mudah. Juga karena referensi, maka bila bagian/kolom dari entitas tersebut berubah, akan langsung dimengerti pemanggil (tidak update satu persatu seperti tabel sebelumnya).

Denormalisasi adalah menggabung kolom2 tabel terpisah ke satu tabel. Hal ini bertujuan untuk meningkatkan efisiensi query agar tidak perlu join. Semisal tabel `sales_summary`
