# Konsep User dan Authority

Konsep **user dan ownership di database** sering membingungkan di awal karena berbeda dengan file system. Mari mulai dari MySQL yang paling sederhana.

## 1. Database itu seperti gedung

Bayangkan sebuah gedung.

* Database Server = gedung
* Database = ruangan
* Table = lemari
* Row = dokumen
* User = orang yang masuk ke gedung

Misalnya

```bash
MySQL Server
│
├── toko
│   ├── produk
│   ├── pelanggan
│   └── transaksi
│
└── hr
    ├── pegawai
    └── gaji
```

Di MySQL, **database tidak punya pemilik (owner).**

## 2. User berada di level server

Misalnya kita membuat user

```sql
CREATE USER 'farid'@'%' IDENTIFIED BY 'password';
```

Sekarang server memiliki user

```bash
MySQL Server

Users
------
root
farid
admin
reporting
```

User `farid` ini belum bisa melakukan apa pun.

## 3. Baru diberikan hak akses

Misalnya

```sql
GRANT ALL PRIVILEGES ON toko.* TO 'farid'@'%';
GRANT SELECT ON hr.* TO 'farid'@'%';
```

boleh akses database toko semua operasi, tapi hanya bisa SELECT di database hr

```bash
farid

Database toko
✔ SELECT
✔ INSERT
✔ UPDATE
✔ DELETE

Database hr
✔ SELECT
❌ INSERT
❌ UPDATE
❌ DELETE
```

Database **bukan milik farid**. Farid hanya diberi izin. Sehingga kalau user dihapus, database tetap ada.

## 4. Level privilege

Privilege dapat diberikan di beberapa level.

Secara default, level tertinggi (server) dimiliki user `root`. Dia juga bisa memberikan izin untuk memberikan izin ke user dibawahnya. Cukup tambahkan `WITH GRANT` dibelakang command `GRANT`.

### 1. Server

```sql
GRANT SUPER ON *.*;
```

Semua database.

### 2. Database

```sql
GRANT ALL ON toko.*;
```

Semua table dalam database toko.

### 3. Table

```sql
GRANT SELECT ON toko.produk;
```

Hanya table produk.

### 4. Column

```sql
GRANT SELECT(nama, harga) ON toko.produk;
```

Hanya kolom tertentu.

### Ringkasan

Di MySQL, konsep utamanya adalah:

* **User**: identitas yang digunakan untuk login ke server MySQL.
* **Database**: wadah untuk tabel, view, prosedur, dan objek lainnya.
* **Ownership**: **tidak ada** untuk database maupun tabel.
* **Privilege**: mekanisme untuk menentukan apa yang boleh dilakukan setiap user (misalnya `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, dan lain-lain).

Karena itu, ketika seseorang mengatakan "database milik user X" dalam konteks MySQL, biasanya yang dimaksud adalah **user X memiliki hak akses penuh (ALL PRIVILEGES)** terhadap database tersebut, bukan bahwa database itu benar-benar memiliki owner seperti pada beberapa sistem database lain (misalnya Oracle atau PostgreSQL).

## Postgre SQL

Dalam postgre konsepnya agak sedikit berbeda.

Postgre tidak mengenal `USER`, tetapi `ROLE`. Role bisa login, bisa tidak. Kalau bisa maka mirip seperti `USER`. Kalau tidak, biasanya digunakan sebagai `GROUP`.

`CREATE ROLE farid LOGIN PASSWORD 'password';`

### Database Memiliki Owner

`CREATE DATABASE toko OWNER farid;`

Owner memiliki kemampuan:

* DROP DATABASE
* ALTER DATABASE
* mengubah setting database
* memberikan privilege tertentu

Tanpa harus diberi GRANT lagi.

### Tabel Memiliki Owner

Owner nya adalah user yang membuat tabel tersebut.
