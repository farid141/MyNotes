# UUID dan Slug

Keduanya sering kali digunakan sebagai ID atau identifier sebuah website. Padahal lebih simple menggunakan `int auto increment`. Mengapa demikian?

## UUID

- Entitas ID sebuah data sulit ditebak, user bisa coba geser2 untuk dapetin info produk lainnya dan juga memprediksi perkiraan jumlah transaksi sehingga dapat dijadikan sasaran empuk.
- Merge database jadi lebih mudah, semisal kita punya database dengan struktur yang sama, tidak akan terjadi tabrakan.
- Generate sebelum insert, tidak perlu tahu id terakhir

Tapi juga ada kekurangan:

- Ukuran lebih besar daripada int, akan terasa berat jika data jutaan
- Debugging kurang nyaman

Disarankan menggunakan sortable UUID agar index fragmentation bekerja.

## Slug

- SEO
- Shareability (bisa tahu kira2 konten isinya apa)
- Readibility
- Branding UX
