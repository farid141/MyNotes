# Database

Dalam berinteraksi dengan database, dibutuhkan modul built-in `database/sql` dan juga `driver SQL untuk Go`

## Download driver

`go get -u github.com/go-sql-driver/mysql`

1. Import driver untuk panggil init `import (_ "module name")`

## Database Pooling

Sudah diatur Go dibalik layar, merupakan sebuah kumpulan koneksi ke database. Bisa diset min dan max untuk koneksi yang aktif

Beberapa pengaturan yang bisa digunakan:

- setMaxIdleConns(number)
- setMaxOpenConns(number)
- setConnMaxIdleTime(duration)
- setConnMaxLifetime(duration)

## Fungsi yang tersedia

### Eksekusi dan Query

Eksekusi menggunakan `db.ExecContext()` digunakan untuk perintah seperti `INSERT, CREATE, DELETE`. Sedangkan Query menggunakan `db.QueryContext()` untuk operasi `SELECT`.

```go
 // query non-select
_, err := db.ExecContext(context, sql, params)

// query select
rows, err := db.QueryContext(context, sql, params)
for rows.Next() {
    var id, name string
    err := rows.Scan(&id, &name)
    if(err != nil){
        panic(err)
    }
}
defer rows.Close() // rows harus ditutup
```

Dalam `QueryContext` ada 3 hal yang perlu diperhatikan

- Pengambilan data dengan `rows.Scan` dan harus memiliki jumlah variadic param sesuai dengan column dari query select
- untuk mengambil data selanjutnya menggunakan `rows.Next`
- `rows.Close` untuk menutup resource/ram yang dipakai.

#### Menangani data nullable

```go
var email sql.NullString
err := rows.Scan(&email)

// mengecek email berupa string atau null
if email.Valid{
    // proses string
}
```

#### Parameter Query

Dalam penggunaan `QueryContext` dan `ExecContext` tidak disarankan menggunakan string secara langsung (`tanpa variadic params`). Hal ini memiliki resiko kerentanan `SQL Injection`. Dimana string yang diproses ternyata mengandung karakter yang dapat mengubah query.

Untuk mengatasi itu, kita dapat gunakan params yang berupa variadic daripada format string.

Gunakan karakter `?` dalam sql string, akan direplace oleh variadic yang dikirim setelahnya

```go
sqlString := "SELECT username FROM USER WHERE username = ? AND password = ?"
rows, err := db.QueryContext(context, sqlString, "farid", "secret")
```

### Mengambil id setelah insert

```go
result, err := db.QueryContext(context, sqlString, "farid", "secret")
insertId, err := result.LastInsertId()
```

### Prepare Statement

Cara `efisien untuk batch operation` dimana satu query digunakan berulang ulang untuk data yang berbeda, sehingga koneksi lebih efisien

```go
sqlString := "INSERT INTO comments (email, comment) VALUES (?, ?)"
stmt, err := db.PrepareContext(ctx, sqlString)
if err != nil
    panic

defer stmt.Close() // close statement

for i:=0; i<10; i++{
    email := "farid" + strconv.Itoa(i) + "@gmail.com"
    comment := "comment" + strconv.Itoa(i)
    result, err := stmt.ExecContext(ctx, email, comment) //gunakan stmt
}
```

### Transaction

Untuk membuat operasi SQL bisa dirollback kalau gagal

```go
tx, err := db.Begin()
if err != nil
    panic(err)

// do query stuff...

err := tx.Commit();
if err != nil
    panic(err)

```
