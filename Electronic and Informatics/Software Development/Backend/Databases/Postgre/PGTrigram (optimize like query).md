# PG Trigram

Merupakan sebuah extensi postgresql untuk mengoptimasi `like` query. Dimana sebuah kolom yang akan dicari akan dibalik layar menyimpan 3 gram kata dalam bentuk array.

```bash
# data kolom nama
samsung => sam, ams, msu, sun, ung

# query like
name like %samsu%
samsu => sam, ams, msu # dicocokkan minimal 1 gram. Cocok dengan indeks 0, 1, 2
```

Akan memangkas waktu 2-5 kali lebih cepat dibanding tanpa `pg_trigram`
