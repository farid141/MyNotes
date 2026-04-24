# Defer

Digunakan untuk menutup resource external ketika selesai digunakan, karena dapat menggunakan banyak memory.
Dalam penggunaannya, ditambahkan keyword `defer` di awal `fungsi/statement`. Fungsi/statement tersebut akan dijalankan setelah fungsi saat ini berakhir.

- Closing files or network connections.
- Unlocking mutexes.
- Releasing resources like memory or database connections.
- Logging or debugging purposes.
