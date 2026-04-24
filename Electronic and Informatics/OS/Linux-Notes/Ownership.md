# Linux permission

ketika menjalankan command ls -l, akan ditampilkan baris data dengan format sebagai berikut

> [fd][rwx][rwx][rwx] owner_name group_name  ... ...

- `f/d` menyatakan data tersebut adalah file/dir
- `rwx` sebanyak 3 kali merupakan permission dari file (berupa `-` jika tidak diizinkan), masing-masing:
user, group, selain user dan group

## Command untuk modifikasi permission

- `chmod [options] nama_file`
dimana options dapat berupa
  - `777`angka desimal masing-masing user-group-lainnya
  - `+[rwx]` memberikan semua entitas untuk akses r/w/x
  - `-[rwx]` menghapus semua entitas untuk akses r/w/x
- `chown [nama_user][:nama_group] nama_file`
