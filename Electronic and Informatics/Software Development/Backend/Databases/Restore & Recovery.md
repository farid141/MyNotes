# Restore & Recovery

Strategi agar dapat memulihkan database ke data sebelumnya jika terjadi insiden.

## Backup

1. Full Backup (besar & lama)

    ```sql
    pg_dump mydb > full.sql

    -- atau binary:

    pg_basebackup
    ```

2. Incremental Backup

    Hanya simpan `perubahan` sejak backup terakhir.

    Lebih hemat storage.

3. Differential Backup

    Simpan perubahan sejak full backup terakhir.

    Contoh:

    Minggu full
    Senin diff
    Selasa diff (berisi Senin+Selasa)

    Restore:
    Minggu + Selasa

4. Point-in-Time Recovery (PITR)

    Database menyimpan command yang dilakukan. Restore tinggal memberikan parameter waktu. Namun tetap harus ada base recovery point yang disimpan. PITR akan menjamin data yang lost sebelum insiden bisa dibackup lengkap. WAL jauh lebih efisien karena hanya simpan delta/perubahan.

    Jadi kita perlu base backup / snapshot dulu (generate by cronjob), kemudian untuk proses restore, WAL akan kembali ke base backup dan menjalankan semua command setelah waktu backup sampai waktu yang ditentukan

### Tempat Backup

Baiknya tempat backup yang dipakai berbeda dengan database, agar jika ada searangan bisa restore.

### Implmentasi

Contoh requirement:

* Full backup: harian
* WAL archive: realtime
* retention: 30 hari
* restore target: < 30 menit

#### Step 1: Enable WAL Archiving

Di PostgreSQL edit:

```conf id="x2n4la"
postgresql.conf
```

ubah:

```conf id="f7pz9d"
wal_level = replica
archive_mode = on
archive_command = 'cp %p /backup/wal/%f'
max_wal_senders = 5
```

Penjelasan:

* wal_level: berapa detail log transaksi
* archive_mode: aktifkan arsip WAL
* archive_command: setiap WAL file selesai, copy ke backup

Restart:

```bash id="57qk1e"
sudo systemctl restart postgresql
```

#### Step 2: Full Base Backup

Buat snapshot awal.

```bash id="8s1vqp"
pg_basebackup \
  -D /backup/base/$(date +%F) \
  -Ft \
  -z \
  -P \
  -U postgres
```

Artinya:

* `-D` lokasi
* `-Ft` tar
* `-z` compress
* `-P` progress

Schedule harian:

```bash id="v2k8qz"
crontab -e
```

Tambah:

```cron id="g3c7rd"
0 2 * * * /usr/local/bin/backup.sh
```

Jam 2 pagi.

#### Step 3: Simpan ke lokasi berbeda

Minimal:

### local

`/backup`

### secondary server

atau cloud:

* Amazon Web Services
* Google Cloud
* Cloudflare object storage

Rule umum:
**3-2-1 backup rule**

* 3 copy
* 2 media berbeda
* 1 offsite

#### Step 4: Verifikasi backup

Banyak orang berhenti di “backup sukses”.

Padahal file bisa corrupt.

Harus test:

```bash id="e4mr7y"
tar -tf backup.tar.gz
```

dan checksum:

```bash id="q8nv3s"
sha256sum backup.tar.gz
```

#### Step 5: TEST RESTORE (paling penting)

Backup tanpa test restore = asumsi.

Misal tiap minggu restore ke staging.

```bash id="n6d2hf"
createdb restore_test
pg_restore -d restore_test backup.dump
```

Lalu cek:

```sql id="u1pk5j"
SELECT COUNT(*) FROM users;
```

Harus masuk akal.

## Recovery Scenario

Ini bagian paling penting.

## Case 1: Human error

Orang hapus data.

```sql id="6bz4kc"
DELETE FROM orders;
```

Recovery:

1. Stop DB
2. Restore base backup
3. Replay WAL sampai sebelum delete

Contoh:

```conf id="s0jm8t"
recovery_target_time = '2026-05-01 14:31:59'
```

Start DB.

Database kembali sebelum delete.

## Case 2: Server disk mati total

Langkah:

### Provision server baru

Install PostgreSQL

### Restore base backup

```bash id="9x4lpm"
tar -xvf base.tar
```

### Copy WAL archive

ke server

### Recovery

Start database

Postgres replay log otomatis

## Case 3: Corruption

Kadang index corrupt.

Tidak selalu full restore.

Bisa:

```sql id="k7bq2v"
REINDEX DATABASE mydb;
```

atau restore table tertentu.

## Kesimpulan

Pake PITR aja dengan waktu update base snapshot yang lama
