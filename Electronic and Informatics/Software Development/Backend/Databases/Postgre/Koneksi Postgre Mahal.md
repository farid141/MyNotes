# Koneksi Postgre Mahal

khusus untuk postgre:
1 koneksi = 1 proses OS
10 MB per koneksi

Dibandingkan db lain

sehingga sangat butuh connection pooling

## Pooling

Perhitungan koneksi bisa disetting di code, atau kalo kita pake multi server, tinggal kita kalikan jumlah server dengan setting per code.

Error yang muncul:
`too many connections, memory allocation postgre over limit`

khusus untuk aplikasi besar tambahkan pooler untuk koneksi ke db . Ketika request melebihi koneksi yg ditentukan, akan antre daripada error.

## Prepared Statement dan Masalah

Ketika jalanin multiple query yang sama cuma datanya yang beda, lebih baik pakai `prepared statement`, akan menghemat waktu karena tercache dan rekonstruksi query tidak dilakukan ulang.

Ketika prepared statement dilakukan bersamaan dengan pooler, bisa saja terjadi bug karena koneksi yang diassign oleh pooler berbeda (tidak ada cached prepared statement). Untuk itu gunakan `session mode` daripada `transaction mode` pada pooler. Per sesi dari BE(client DB) akan selalu pakai koneksi yang sama.

Kalo butuh yang kenceng, pake transaction mode, tapi `tidak boleh ada prepared statement`.
