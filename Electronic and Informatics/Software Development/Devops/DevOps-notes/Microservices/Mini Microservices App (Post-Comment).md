# Mini Microservices App (Post-Comment)

- `post service`: simpan dan get post
  - POST /posts
  - GET /posts
- `comment service`: simpan dan get comment by post id
  - POST /posts/:id/comments
  - GET /posts/:id/comments

Setiap service akan menggunakan package (cors, express, axios)

## Masalah Bulk Request

Dalam FE flow request ketika page load pertama adalah:

- Main component: GET all posts
- Post Component: GET all comments by post id

post comment dilakukan sebanyak n*1 sesuai jumlah posts

### Solusi Microservice

#### Sync

FE hanya request ke `/posts?comments=true` kemudian didalam service post akan melakukan request untuk semua comment dari posts id yang ada.

Pendekatan ini hanya memindahkan layer ke BE, sehingga performa tetap sama.

#### Async

FE request ke service baru `Query Service` dimana dia akan:

- konsum event create post dan comment
- Memiliki DB tersendiri berisi posts dan kommen

Proses komunikasi antar service akan dilakukan melalui `Event Bus` (bsia berupa RabbitMQ, Kafka, NATS), namun dalam kasus ini dibikin pake `express` yang mem-broadcast semua event ke semua service.

Setiap service akan memiliki endpoint `/events` untuk menerima data dari eventbus, didalamnya akan berisi filtering event apa yang akan diberi aksi.

## Menambahkan Moderate Comment Service

Pada saat comment dibuat:

1. status akan pending secara default (dibuat di endpoint create). Dan emmit `commentCreated` event.
2. Kemudian service moderatecomment akan melihat content dan emmit `commentModerated` event yang akan dikonsum service comment.
3. service comment emmit `commentUpdated` yang akan dikonsum semua service.

Hal ini dilakukan agar ada event lebih generic dan bersih `commentUpdated`.

## Handling missing event (event sync)

Ketika servis mati, tidak akan mendapat trigger update dari event sehingga data tidak sesuai. Ini adalah tantangan untuk sinkronisasi data antar service.

Untuk itu dibuat `eventbus datastore`, DB yang berisi list event pada service eventbus. Ketika servis nyala, akan minta ke `datastore eventbus` event2 yang terjadi setelah event terakhir yang diterima service tersebut.
