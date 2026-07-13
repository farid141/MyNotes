# Diffing Database

Ya, ada. Bahkan ini adalah praktik yang cukup umum ketika DDL belum dikelola dengan migration. Ada beberapa pendekatan, tergantung database yang Anda gunakan.

## Opsi 1: Schema Diff Tool (Paling mudah)

Hampir semua DB memiliki tool untuk membandingkan schema.

| Database      | Tool                                              |
| ------------- | ------------------------------------------------- |
| MySQL/MariaDB | MySQL Workbench, dbForge Schema Compare, Skeema   |
| PostgreSQL    | pgAdmin, migra, apgdiff                           |
| SQL Server    | SQL Server Data Tools (SSDT), Redgate SQL Compare |
| Oracle        | SQL Developer Schema Compare                      |

Tool tersebut akan menampilkan:

* Tabel yang hanya ada di production
* Tabel yang hanya ada di development
* Perbedaan kolom
* Perbedaan index
* Primary key
* Foreign key
* Constraint
* Default value

Bahkan sebagian dapat menghasilkan SQL untuk menyamakan schema.

---

## Opsi 2: Bandingkan INFORMATION_SCHEMA (Bisa otomatis)

Kalau database sama-sama MySQL/MariaDB misalnya, Anda bisa membandingkan metadata dari `information_schema`.

### Cek tabel yang berbeda

Misalnya:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'production_db'

EXCEPT

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'development_db';
```

Kalau MySQL (tidak ada `EXCEPT`):

```sql
SELECT p.table_name
FROM information_schema.tables p
LEFT JOIN information_schema.tables d
ON d.table_schema='development_db'
AND d.table_name=p.table_name
WHERE p.table_schema='production_db'
AND d.table_name IS NULL;
```

---

### Cek kolom yang berbeda

```sql
SELECT
    table_name,
    column_name,
    column_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_schema='production_db';
```

Lalu lakukan hal yang sama untuk development dan bandingkan.

Atau kalau kedua schema ada di server yang sama:

```sql
SELECT
    p.table_name,
    p.column_name,
    p.column_type AS prod_type,
    d.column_type AS dev_type
FROM information_schema.columns p
LEFT JOIN information_schema.columns d
ON p.table_name=d.table_name
AND p.column_name=d.column_name
AND d.table_schema='development_db'
WHERE p.table_schema='production_db'
AND (
    d.column_name IS NULL
    OR p.column_type<>d.column_type
    OR p.is_nullable<>d.is_nullable
    OR IFNULL(p.column_default,'')<>IFNULL(d.column_default,'')
);
```

---

## Opsi 3: Dump Schema lalu diff (Sangat direkomendasikan)

Dump hanya schema tanpa data.

MySQL:

```bash
mysqldump -d production_db > prod.sql

mysqldump -d development_db > dev.sql
```

Lalu bandingkan menggunakan:

```bash
diff prod.sql dev.sql
```

atau

```bash
git diff --no-index prod.sql dev.sql
```

Karena hasilnya berupa SQL, Anda bisa melihat:

* CREATE TABLE
* ALTER TABLE
* Index
* Constraint
* Trigger

---

## Opsi 4: Gunakan Schema Diff Tool di CLI (Paling profesional)

Misalnya untuk MySQL:

* Skeema
* Atlas
* Liquibase
* Flyway (dengan fitur diff pada edisi tertentu)

Contoh menggunakan Atlas:

```bash
atlas schema diff \
  --from "mysql://user:pass@prod/db" \
  --to "mysql://user:pass@dev/db"
```

Outputnya akan berupa SQL:

```sql
ALTER TABLE users
ADD COLUMN phone varchar(30);

CREATE TABLE orders (...);

DROP TABLE logs;
```

Sangat berguna ketika ingin mulai menerapkan migration.

---

## Rekomendasi

Kalau kondisinya:

* ❌ Belum ada migration
* ✅ Sudah ada production dan development
* ✅ Ingin mengetahui seluruh perbedaan schema

Saya menyarankan alur berikut:

1. Bandingkan schema menggunakan tool diff (atau dump schema).
2. Pastikan development mengikuti production (atau sebaliknya sesuai kebijakan tim).
3. Setelah schema sinkron, mulai gunakan migration (misalnya dengan Flyway, Liquibase, atau mekanisme migration dari framework yang digunakan).
4. Larang perubahan DDL langsung di database production agar seluruh perubahan tercatat melalui migration.

Dengan begitu, perbedaan schema di masa depan dapat dilacak dan direproduksi dengan lebih mudah.

Kalau Anda memberi tahu:

* Database yang digunakan (MySQL, PostgreSQL, SQL Server, Oracle, dll.),
* Apakah production dan development berada di server yang sama atau berbeda,

saya bisa memberikan query atau tool yang paling sesuai untuk lingkungan Anda.
