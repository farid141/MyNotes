# CQRS

Command Query Responsibility Segregation. Memisahakan model `command` dan `query`. Bisa dengan memisahkan db, atau table saja.

Search dapat menggunakan DB: `opensearch`

## Open Search

Merupakan DB khusus pencarian dengan efisiensi tinggi. Mekanisme kerja menggunakan `n-gram`, seperti `PGTrigram`

## Elastic Search

Ada fitur menyimpan jumlah grouping, sehingga tidak perlu bikin query terpisah. Kalo kita butuh fitur facet dan pake db biasa seperti postgre dll, harus bikin query terpisah.

## Challange

Tantangannya, ketika beda db `read` dan `write` adalah sinkronisasi read ketika ada write. Dalam beberapa kasus, user sudah input data, tapi ketika search tidak ada, user akan mencoba insert lagi sehingga akan ada data duplikat.

Terdapat beberapa pendekatan untuk ini:

### CDC

`CDC` (Change Data Capture): `write db data change` => `debezium via WAL` => `kafka` => `agregasi` => `read db`

Dalam kasus tersebut, `agregasi` dapat berupa container agregasi seperti `kafkasql` atau jika ingin lebih simple pake product search yang didalamnya `consume event` dari kafka dan ngebentukin sebelum dimasukkan ke `read db`.
