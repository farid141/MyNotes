# _variable

Digunakan untuk menghindari error compile pada Go karena variable tidak digunakan.

## Menghiraukan Variable

Dalam Go, semua variable harus digunakan agar tidak `error compile`. Tetapi ada kasus ketika sebuah fungsi `mengembalikan beberapa nilai` dan kita tidak ingin menggunakan semua nilainya.

Untuk itu kita dapat menamainya "_" agar tidak error

## Menjalankan init function dari sebuah modul

Dibuat alias dengan tanda _, agar diabaikan

```go
import (_ "module_name")
```
