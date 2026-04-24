# Vibe Coding

Menulis code dengan bantuan AI Agent. Dalam catatan ini dilakukan dengan menggunakan `GoogleAntigravity`.

Github issue sebagai pengumpul fitur yang akan didevelop, penting sebagai SOP dalam proses development/ticketing.

gaperlu tau detail tech aplikasinya, yang penting logic aplikasi, nanti akan mengikuti

## Pemilihan Model Berdasarkan Jenis Task

Ada 2 jenis penggunaan agent berdasarkan tujuannya

* Planning : untuk highlevel, (gunakan model yang `canggih`, tapi ingatkan jangan terlalu detail). `Gemini 3.1 pro`
* Implementation: (gunakan model yang `murah`, agar hemat dan bisa rewrite terus menerus) `Gemini Flash`

## Langkah Pembuatan Fitur

Nantinya semua planning fitur akan dibuat di github issue

### 1. Planning Buatkan Issue (file issue.md)

```text
Bustkan issue.md, berisi planing untuk membuat inl:

Buat project baru di folder ini

Menggunakan Bun

Dan gunakan dependency:

* ElysiaJS
* Drizzle
* MySQL

Jangan terlalu low level atau detail. Cukup instruksikan secara high level

Nanti documen planning nya akan digunakan oleh Programmer atau model yang lebih murah untuk diimplementasikan
```

### 2. Submit Issue Github (berdasarkan issue.md)

```text
Buatkan github issue, isinya hanya hello world. Gunakan GithubCLI di komputer ini.
```

### 3. Kerjakan Issue

```text
buat branch feature/<feat_name>, kerjakan github issue: <link ke github issue>
```

### 4. Minta buatkan PR

```text
buatkan PR ke branch main
```

Merge dan hapus branch fitur tersebut, jika aman.

### 4b. Review (Opsional, pakai model pintar)

```text
coba review PR ini apakah ada yang masih perlu di improve atau tidak, jika ada tambahkan di komentar PR nya. <PR_url>
```

```text
cek komen di PR <PR_url>, perbaiki sesuai yang diminta di
komentar
```

### 5. Pull branch utama ke local

```text
buatkan PR ke branch main
```

## Template Planning

### Aplikasi Backend

#### 1. Planning Fitur User

```markdown
buatkan issue.md yang berisi perencanaan untuk nanti
di implementasikan oleh junior programmer atau ai
model yang lebih murah.

Isi dari planning nya adalah sebagai berikut :

buat tabel users:
id integer auto increment
name varchar 255 not null
email varchar 255 not null
password varchar 255 not null (password merupakan
hash dari bcrypt)
created_at timestamp default current_timestamp

buatkan API untuk registrasi user baru

Endpoint : POST /api/users

Request Body :

{
    "name" : "Eko",
    "email" : "eko@locahost",
    "password" : "rahasia"
}

Response Body (Succees) :

{
    "data" : "OK"
}

Response Body (Error) :

{
    "error" : "Email sudah terdaftar"
}

Stuktur Folder di dalam src
- routes : ini berisi routing elysia js
- services : ini berisi logic bisnis aplikasi

Struktur file
- routes : menggunakan format misal users-route.ts
- services : menggunakan format misal users-service.ts

Jelaskan tahapan-tahapan yang harus dilakukan untuk
mengimplementasikan fitur ini, anggap nanti yang
mengimplementasikan adalah junior programmer atau
model AI yang lebih murah.
```

### Debugging & Bug Fixing

#### Debugging

```text
Coba jalankan aplikasinya dengan panjang field name 300 karakter
```

#### Fixing

```text
buatkan issue.md untuk bug ini, jelaskan tahapan bagaimana cara perbaikinya untuk junior programmer atau model yang lebih murah
```

```text
Submit sebagai bug issue baru di github
```

```text
perbaiki issue https://github.com/ProgrammerZamanNow/belajar-vibe-coding/issues/12 di branch bugfix/valiasi-panjang
```

Cek PR, submit dan hapus jika selesai.

### Testing

Gunakan model pintar

```text
buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programmer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut :

- Buatkan unit test untuk semua API yang tersedia
- simpan di folder tests, menggunakan bun test
- setiap skenario, hapus datanya terlebih dahulu agar konsisten
- buat skenario test per API selengkap mungkin

Jangan buatkan terlalu detail instruksi unit testnya. Buatkan saja skenario apa yang harus di test, biarkan nanti yang implementasi detail skenario nya adalah junior programmer atau model yang lebih murah
```

### Dokumentasi

#### Bikin README

```text
update README.md, jelaskan tentang aplikasi ini, arsitekturnya seperti folder dan penamaan file atau struktur file, jelaskan juga API yang tersedia, jelaskan juga schema database yang ada, cara setup project, technology stack yang digunakan, library yang digunakan, cara run aplikasi, cara test aplikasi
```

Buatkan branch feature/documentation, commit dan push

#### Tambahkan Comment Code

```text
Tambahkan komentar di tiap fungsi dalam file ... jelaskan untuk apa fungsi tersebut
```

#### Pembuatan Swagger

```text
buatkan issue.md yang berisi perencanaan untuk nanti di implementasikan oleh junior programmer atau ai model yang lebih murah.

Isi dari planning nya adalah sebagai berikut :

saya mau tambahkan fitur swagger di project ini.
Agar user lain yang mau menggunakan API di app ini lebih mudah tinggal membuka swagger nya.

Buat tahapan-tahapan yang harus dilakukan untuk implementasi fitur ini, jelaskan secara detail dengan target junior
programmer atau model yang lebih murah
```

### Eksplorasi dan Learning

Jelaskan kepada saya, ini project apa?
Jelaskan lengkap alur registrasi user.

Coba buatkan diagram flow untuk registrasi user.
