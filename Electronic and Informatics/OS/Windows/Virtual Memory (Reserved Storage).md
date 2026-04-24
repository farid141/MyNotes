# Virtual Memory

Virtual memory yang ada dalam Reserved Storage Windows berfungsi sebagai "ban serep" atau ruang cadangan untuk paging file agar sistem tetap stabil meskipun kapasitas penyimpanan utama Anda hampir penuh.
Berikut adalah kegunaan utamanya:

* Mencegah Crash Saat Disk Penuh: Jika hard drive atau SSD Anda benar-benar penuh, Windows tidak bisa memperluas file memori virtual (pagefile.sys). Hal ini biasanya menyebabkan aplikasi force close atau sistem hang. [Reserved Storage](https://www.youtube.com/watch?v=HR4WBqVdWY0) memastikan selalu ada ruang khusus yang tidak bisa diganggu gugat untuk kebutuhan ini.
* Menangani Beban RAM Berlebih: Saat RAM fisik (misalnya 8GB) sudah terpakai semua oleh aplikasi berat, Windows akan memindahkan data yang jarang digunakan ke memori virtual di dalam penyimpanan cadangan ini agar komputer tidak macet.
* Kelancaran Update Windows: Salah satu fungsi utama Reserved Storage adalah menyimpan file sementara selama proses update. Memori virtual di dalamnya membantu mengelola proses latar belakang saat instalasi pembaruan sistem sedang berjalan agar tidak kekurangan sumber daya.
* Penyimpanan File Sementara (Cache): Selain untuk memori virtual, ruang cadangan ini juga digunakan untuk menyimpan cache aplikasi dan sistem agar kinerja Windows tetap responsif meskipun ruang penyimpanan yang bisa Anda gunakan (C:) sudah menipis. [1, 2, 3]

Singkatnya: Memori virtual di reserved storage adalah cara Windows mengamankan sebagian ruang di drive Anda agar sistem tidak "sesak napas" dan tetap bisa berjalan normal saat RAM penuh atau memori penyimpanan hampir habis.
Apakah Anda ingin tahu cara mengecilkan atau menambah kapasitas Reserved Storage ini di komputer Anda?

[1] [https://www.youtube.com](https://www.youtube.com/watch?v=HR4WBqVdWY0&t=125)
[2] [https://www.youtube.com](https://www.youtube.com/watch?v=dbbv-eIbyUA&t=8)
[3] [https://support.apple.com](https://support.apple.com/id-id/guide/mac-help/mh11852/mac#:~:text=Memori%20virtual%20adalah%20teknik%20yang%20digunakan%20komputer,untuk%20sementara%20waktu%20jika%20jumlah%20RAM%20terbatas.)

Berdasarkan gambar yang Anda kirim, Virtual memory Anda cukup besar (21.7 GB). Anda bisa mengecilkan ukurannya secara manual, namun perlu hati-hati agar sistem tidak menjadi tidak stabil atau sering crash saat membuka banyak aplikasi.
Berikut adalah langkah-langkah untuk mengecilkannya:

## Cara Mengatur Ulang Ukuran Virtual Memory

   1. Klik Start, ketik "View advanced system settings", lalu tekan Enter.
   2. Pada tab Advanced, di bagian Performance, klik tombol Settings....
   3. Pindah ke tab Advanced lagi, lalu di bagian Virtual memory, klik Change....
   4. Hapus centang pada "Automatically manage paging file size for all drives".
   5. Pilih drive C:, kemudian pilih opsi Custom size.
   6. Masukkan angka (dalam MB) untuk Initial size dan Maximum size.

* Saran: Jika RAM fisik Anda 16GB, Anda bisa mencoba set ke 4096 MB (4GB) atau 8192 MB (8GB) untuk menghemat ruang.

   1. Klik tombol Set, lalu klik OK.
   2. Restart komputer Anda agar perubahan tersimpan.

------------------------------

## Hal Penting yang Perlu Diperhatikan

* Risiko Pengecilan berlebih: Jika Anda mengaturnya terlalu kecil dan RAM fisik Anda penuh saat menjalankan aplikasi berat (seperti game atau edit video), Windows mungkin akan menutup aplikasi tersebut secara paksa atau mengalami Blue Screen.
* Hibernation File: Di gambar Anda juga terlihat Hibernation file sebesar 6.28 GB. Jika Anda jarang menggunakan fitur Hibernate (tidur tapi status tersimpan meski mati listrik), Anda bisa menonaktifkannya untuk menghemat 6 GB lagi dengan mengetik powercfg -h off di Command Prompt (Admin).
* Reserved Storage: Bagian ini (6.57 GB) dikelola otomatis oleh Windows untuk update sistem dan biasanya tidak disarankan untuk dimatikan agar proses update Windows tidak gagal.

Apakah Anda ingin tahu berapa angka Custom size yang ideal berdasarkan total RAM fisik yang terpasang di PC Anda saat ini?

Dilihat dari gambar tersebut, angka 21.7 GB memang tergolong cukup besar, tetapi apakah itu "5 kali lipat dari yang disarankan" sangat bergantung pada kapasitas RAM fisik yang terpasang di komputer Anda.
Berikut adalah beberapa poin untuk menentukan apakah angka tersebut normal atau berlebihan:

## 1. Rumus "Saran" Umum

Secara tradisional, Windows sering menyarankan paging file (Virtual Memory) sebesar 1,5 kali hingga 3 kali lipat dari jumlah RAM fisik.

* Jika RAM Anda 8 GB, maka 21.7 GB itu hampir 3 kali lipat (masih dalam batas wajar otomatis Windows).
* Jika RAM Anda 4 GB, maka 21.7 GB itu memang sekitar 5 kali lipat, yang berarti Windows merasa sistem Anda sangat kekurangan RAM fisik sehingga butuh "cadangan" yang sangat besar di SSD/HDD agar tidak crash.

## 2. Mengapa Ukurannya Bisa Sebesar Itu?

Di gambar Anda, Windows diatur secara otomatis. Windows akan memperbesar Virtual Memory jika:

* Anda sering membuka banyak aplikasi berat secara bersamaan (Chrome dengan banyak tab, game, dan editing).
* Terjadi memory leak (aplikasi yang memakan RAM terus-menerus tanpa melepasnya).
* Anda jarang melakukan restart komputer, sehingga data sementara terus menumpuk di Virtual Memory.

## 3. Apakah Aman Jika Dikecilkan?

Jika Anda memiliki RAM fisik yang besar (misal 16 GB atau lebih), angka 21.7 GB tersebut sebenarnya bisa Anda pangkas manual menjadi 4 GB - 8 GB saja untuk menghemat ruang penyimpanan. Namun, jika RAM fisik Anda kecil (misal 4 GB atau 8 GB), mengecilkan angka ini secara drastis bisa menyebabkan:

* Aplikasi berat tiba-tiba tertutup (Force Close).
* Muncul pesan error "Your computer is low on memory".
* Sistem terasa lebih lambat saat berpindah antar aplikasi.

Kesimpulan:
Angka 21.7 GB memang terlihat "gemuk" untuk sekadar cadangan. Jika Anda butuh ruang kosong di Drive C, Anda bisa mencoba mengaturnya secara manual ke 8192 MB (8 GB) sebagai jalan tengah.
Berapa kapasitas RAM fisik yang terpasang di PC/Laptop Anda saat ini? (Bisa dicek di Task Manager > tab Performance).
