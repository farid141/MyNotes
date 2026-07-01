# Development Problem

- `error message yang kurang jelas`, karena mekanisme throw error tidak konsisten.
Dalam kasus nested function dipanggil terlalu dalam, bisa saja parent handle error. Padahal error di child memang ditujukan menjadi error akhir
- `type tidak strict`. Dikarenakan `fastapi` adalah `unopionated` framework, maka gaya folder development bervariasi. Akan berbahaya jika tidak ada aturan yang `disepakati bersama`, apa lagi untuk app besar. Kembalian fungsi tidak diatur, akan bernasalah untuk projek besar dimana nested function terlalu dalam.
- `immature authority and fixing method`, tidak diberikan akses ke server production kalau ada bug. Hanya mengecek code, padahal bisa saja karena environment beda. Harus proaktif.
- `ketika bug production`, saya memulai dari logging terlebih dahulu. Kalau belum jelas, bisa lanjut masuk ke container docker dan melihat logs. Jika sudah jelas bisa langsung mengecek kode.

Berani mengakui kesalahan dan terbuka kalo butuh bantuan. Daripada hanya diam saja atau mendebug diam2 karena defensif dan takut terlihat salah, apa adanya aja. Menurut saya juga karena `nothing to lose`. Berani dipecat, tapi kita manfaatin untuk mencoba2 bikin sistem terbaik dan `kesalahan bisa menghasilkan pelajaran`.
