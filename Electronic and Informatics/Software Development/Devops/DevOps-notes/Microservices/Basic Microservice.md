# Basic Microservice

Jadi pada dasarnya komunikasi dalam sistem microservice ada 2:

- dari client ke service
- antar service

Kemudian dalam komunikasi client ke service akan melalui API Gateway / Backend for Frontend (BFF).

Biasanya untuk menjalankan microservice, menggunakan docker compose berisi service2 yang berkomunikasi dengan jaringan internal docker.

Semua komunikasi antar service menggunakan API (REST, gRPC, GraphQL, dll) atau message broker (RabbitMQ, Kafka, dll)

## Tujuan microservice

- sistem db tersebar agar traffic tidak menumpuk di 1 DB
- maintainable 1 orang 1 service, tidak crash kalau service lain berubah

## Event Bus

Event bus merupakan sebuah tools penghubung antara service. Didalamnya kita dapat menentukan service mana yang akan menerima event apa.

## Studi Kasus

service D membutuhkan service lain
Service D bertujuan untuk mengambil list semua order dan detail produk spesifik user dimana:

- service A: CRUD user
- service B: CRUD Produk
- service D: CRUD order

Ada 2 pendekatan untuk bikin service D:

- sync: direct using request to service A, B or C secara berurutan (seperti bukan microservice)
- async: ada Event Bus, service D kirim event ke bus berisi type dan data, bus meneruskan ke service A, B, C. Setelah semua data terkumpul, bus mengirim balik ke service D

Tidak semua komunikasi antar service harus lewat event bus, bisa juga direct request kalau memang dibutuhkan response cepat.

### Alternatif

Perlu diingat lebih baik Service D memiliki database sendiri untuk menyimpan data yang sudah dikumpulkan dari service lain, daripada harus request terus ke service lain setiap kali butuh data. sehingga membuatnya Zero Dependency.

Kita bisa membuat cara lain:

- setiap ada product update nama (service A), maka service D akan update db sendiri
- setiap ada user update info (service B), maka service D akan update db sendiri
- setiap ada order baru (Service D), maka service D akan update produk unik user tsb simpan di db sendiri

Sebenarnya pendekatan ini memakan banyak storage karena data duplication, namun hal tersebut bukan lah masalah di harga pasar saat ini.

## Masalah

- Bagaimana jika consum/produce gagal?
- Bagaimana jika ada service down sehingga tidak bisa menerima request atau event?

sebenarnya bisa diminimalisir dengan retry, circuit breaker, dead letter queue, dsb
