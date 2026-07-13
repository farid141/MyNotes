# Backup

Proses backup db bervariasi caranya

## Postgres

### DBeaver

Dengan DBeaver, kita harus memiliki `postgresql` terinsatall di host. Atau bisa hanya ambil `pgdump`, salin `pg_dump.exe` dan semua `dll` di `pgsql/bin/`:

1. klik kanan schemas > Tools > Backup data
2. Pada windows, tentukan `Local Client`, yaitu direktori folder tempat `pg_dump` disimpan di host

### PG Dump

#### Dalam Server

```bash
# Hilangkan parameter -d jika ingin backup seluruhnya
pg_dump -U nama_user -d nama_database -f lokasi_file.sql
```

#### Dari Luar Server

Syarat Penting Agar Bisa Konek ke Server Luar

Jika Anda mengalami error saat mencoba mem-backup server luar, pastikan tiga konfigurasi ini sudah diizinkan di server target:

- File `postgresql.conf`: Parameter listen_addresses di server harus diatur ke `*` agar menerima koneksi dari luar, bukan hanya localhost.
- File `pg_hba.conf`: Harus ada aturan yang mengizinkan IP komputer Anda (atau IP publik Anda) untuk `mengakses database dengan metode autentikasi yang sesuai` (seperti scram-sha-256 atau md5).
- Firewall Server: Port 5432 di server luar tersebut harus dibuka dan tidak diblokir oleh firewall jaringan atau cloud provider (seperti AWS Security Group atau UFW di Ubuntu).

```bash
pg_dump -h alamat_ip_server -p 5432 -U nama_user -d nama_database -F c -f nama_file.dump
```
