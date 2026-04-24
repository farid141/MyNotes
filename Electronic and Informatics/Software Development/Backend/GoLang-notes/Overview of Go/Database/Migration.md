# Migration

Digunakan untuk menyimpan aktifitas perubahan database dalam file migrasi. Merupakan tools CLI yang bisa diakses secara global.

## Golang Migrate

<github.com/golang-migrate/migrate>. Mendukung banyak jenis database

`go install -tags 'postgres mysql' github.com/golang-migrate/migrate/v4/cmd/migrate@latest`

jika butuh driver lain tambahkan dengan pemisah spasi

### Membuat migration

```bash
migrate create -ext mysql -dir db/migrations nama_file_migrasi [n]
```

Dari perintah tersebut akan terbuat file sql migrasi. Bisa kita tambahkan `DDL/DML` untuk operasi ke database, `n` (opsional) dapat membuat beberapa file migrasi sekaligus.

Jika kita menjalankan up dan ada beberapa file, tiap file akan diberi urutan sendiri (bukan batch).

### Menjalankan migration

```bash
migrate -database db_url -path db/migrations up
```

state migration akan disimpan pada table `schema_migrations`. Sehingga apabila kita punya file migration baru, tidak akan menjalankan migrasi yang sudah dilakukan sebelumnya

### Rollback migration

```bash
migrate -database db_url -path db/migrations down [n]
```

state migration akan disimpan pada table `schema_migrations`. Sehingga apabila kita punya file migration baru, tidak akan menjalankan migrasi yang sudah dilakukan sebelumnya.

### Dirty State

Terjadi ketika dalam sebuah file migrasi sukses sebagian. Dalam kasus ini `schema_migrations` belum menambahkan migrasi tersebut ke tabel. Sehingga akan gagal ketika migrasi dijalankan (up/down).

Untuk menangani kasus seperti itu, kita harus menangani secara manual (singkirkan aksi yang sukses dan jalankan `up` ulang)

## Soda/pop

soda/pop merupakan bagian dari buffalo framework adalah salah satu package untuk migration pada go

install soda: `go get github.com/gobuffalo/pop@latest`
untuk menambahkan soda pada mac/linux, kita perlu:

1. menambahkan path go ke file .zprofile/.bash_profile
2. kemudian source .zprofile/.bash_profile untuk merefresh path yang didaftarkan ke sistem

konfigurasi database dituliskan dalam file database.yml pada root folder

untuk menambahkan migration:
soda generate fizz migration_name
