
# Race Conditions

Bagus — row-level locking itu salah satu senjata paling langsung dan efektif melawan *lost update* / race condition di level database. Aku jelaskan **dari nol sampai praktik**: konsep, apa yang terjadi di tiap tahap, contoh SQL + Python, variasi (NOWAIT / SKIP LOCKED), jebakan (deadlock, isolation levels), dan best practices.

---

## Inti singkat

**Row-level locking**: kamu mem-lock baris tertentu di dalam sebuah transaksi sehingga proses lain tidak bisa membaca/menulis baris itu untuk perubahan yang konflik sampai transaksi selesai (commit/rollback). Implementasinya biasanya lewat `SELECT ... FOR UPDATE` (atau API setara).

---

## 1. Kenapa perlu lock? (masalah yang diselesaikan)

Tanpa lock, dua worker bisa:

- Baca status yang sama (`PENDING`)
- Sama-sama memutuskan perubahan berbeda (A → `SUCCESS`, B → `FAILED`)
- Tulis satu setelah yang lain → *lost update*.

Row lock memastikan hanya satu worker yang memegang hak eksklusif untuk memutuskan dan menulis status itu pada waktu bersamaan.

---

## 2. Gambaran tahapannya (sequence dengan `SELECT ... FOR UPDATE`)

Misal ada 2 worker (A dan B), DB memiliki `transactions(id, status, ...)`.

**Worker A** dan **Worker B** bermaksud memproses `TXN123`.

1. **Worker A** mulai transaksi DB (`BEGIN`).
2. Worker A: `SELECT * FROM transactions WHERE id='TXN123' FOR UPDATE;`

   - DB mengunci baris `TXN123` *exclusively* untuk transaksi A.
3. **Worker B** mulai transaksi DB (`BEGIN`).
4. Worker B: `SELECT * FROM transactions WHERE id='TXN123' FOR UPDATE;`

   - Karena baris sudah dikunci oleh A, behavior tergantung mode:

     - Default: B **menunggu** sampai A commit/rollback (blocking).
     - Jika `NOWAIT` digunakan: B segera error (no wait).
     - Jika `SKIP LOCKED` digunakan: B **melewatkan** baris yang terkunci (berguna untuk worker queue).
5. Worker A memutuskan status (mis. set `SUCCESS`) → `UPDATE transactions SET status='SUCCESS' WHERE id='TXN123';`
6. Worker A `COMMIT`.
7. Jika B sedang menunggu, setelah A commit, B's `SELECT ... FOR UPDATE` akan dapat lock dan membaca status *terbaru* (`SUCCESS`) sehingga B tidak akan menimpa ke `FAILED`. Jika B menggunakan `NOWAIT` dan mendapat error, ia bisa retry/abandon.
8. End.

Intinya: lock memaksa worker B membaca *state up-to-date* setelah A selesai, bukan snapshot lama.

---

## 3. Contoh SQL (Postgres)

### Blocking version (default)

```sql
BEGIN;
SELECT * FROM transactions
WHERE id = 'TXN123'
FOR UPDATE;

-- now do decision & update
UPDATE transactions SET status='SUCCESS', updated_at = now()
WHERE id = 'TXN123';

COMMIT;
```

#### NOWAIT — langsung error jika locked

```sql
SELECT * FROM transactions
WHERE id='TXN123'
FOR UPDATE NOWAIT;
-- jika locked, DB akan mengembalikan error: could not obtain lock
```

#### SKIP LOCKED — skip baris yang sedang dikunci

Cocok untuk worker queue: worker akan mengambil baris yang belum diproses dan melewatkan yang dipegang worker lain.

```sql
SELECT * FROM transactions
WHERE status = 'PENDING'
FOR UPDATE SKIP LOCKED
LIMIT 1;
```

---

## 4. Variasi DB & isolation level — perbedaan penting

- **PostgreSQL**

  - `SELECT ... FOR UPDATE` mengunci baris yang dipilih. `NOWAIT`/`SKIP LOCKED` tersedia.
  - Isolation default: `READ COMMITTED` (atau `REPEATABLE READ` / `SERIALIZABLE` pada level lebih tinggi).
- **MySQL / InnoDB**

  - `SELECT ... FOR UPDATE` mengunci baris; perilaku gap-locks tergantung isolation level (`REPEATABLE READ` dapat menghasilkan next-key locks).
  - `NOWAIT` tidak tersedia sebelum MySQL 8.0.1 (?) — syntax dan behavior sedikit berbeda.
- **SQLite**

  - Tidak memiliki row-level locking native; lock cenderung pada database/table. Jadi row-level locking pattern tidak berlaku.
- **Advisory locks** (Postgres `pg_try_advisory_lock`)

  - Alternatif: lock user-space (integer key), tidak terkait baris otomatis — lebih fleksibel tapi kamu harus manage mapping key↔baris.

---

## 5. Deadlocks dan timeouts

- **Deadlock**: dua transaksi menunggu lock yang dimiliki satu sama lain → DB mendeteksi deadlock dan membatalkan salah satu transaksi (rollback) dengan error.
- **Timeouts**: kamu bisa/harus set timeout pada client side supaya thread tidak menunggu selamanya.
- **Handling**: tangkap error deadlock/lock timeout, lalu retry dengan strategi backoff. Jangan lupa batasi jumlah retry.

---

## 6. Contoh Python — psycopg2 (Postgres) dengan retry dan NOWAIT handling

```python
import time
import psycopg2
from psycopg2 import sql, OperationalError, errors

def process_transaction(conn, txn_id, max_retries=3):
    attempt = 0
    while attempt < max_retries:
        attempt += 1
        try:
            with conn:
                with conn.cursor() as cur:
                    # BEGIN happens automatically with conn context
                    cur.execute("SELECT status FROM transactions WHERE id=%s FOR UPDATE", (txn_id,))
                    row = cur.fetchone()
                    if not row:
                        return False
                    status = row[0]
                    if status != 'PENDING':
                        # someone else already processed
                        return True
                    # decision logic (call gateway, etc.)
                    # but DON'T call external network inside this tx if possible
                    cur.execute("UPDATE transactions SET status=%s WHERE id=%s", ('SUCCESS', txn_id))
            return True

        except OperationalError as e:
            # handle deadlock or lock timeout
            print("db op error:", e)
            time.sleep(0.5 * attempt)  # backoff
    raise Exception("Failed to process after retries")
```

**Catatan penting**: hindari panggilan jaringan lama *selama* transaksi terbuka — lakukan pre-checks sebelum lock, atau gunakan two-phase approach (lock → quick check → enqueue heavy work).

---

## 7. Contoh SQLAlchemy (ORM) — `with_for_update`

```python
from sqlalchemy import select, update
from sqlalchemy.orm import Session

def process_txn(session: Session, txn_id: str):
    with session.begin():
        stmt = select(Transactions).where(Transactions.id == txn_id).with_for_update()
        txn = session.execute(stmt).scalar_one_or_none()
        if not txn: 
            return
        if txn.status != 'PENDING':
            return
        txn.status = 'SUCCESS'
        session.add(txn)
    # commit at end of with
```

Untuk SKIP LOCKED in SQLAlchemy:

```python
stmt = select(Transactions).where(Transactions.status == 'PENDING').with_for_update(skip_locked=True).limit(1)
```

---

## 8. Pola rekayasanya supaya aman & scalable

1. **Short transactions** — lock hanya selama operasi DB singkat (baca + update). Jangan lakukan network I/O di antara `SELECT ... FOR UPDATE` dan `UPDATE` jika bisa dihindari.
2. **Make decisions outside tx when possible** — e.g., enqueue event, worker locks and makes final decision using cached data or idempotency.
3. **Idempotency + conditional update** — lock dibarengi with `UPDATE ... WHERE status='PENDING'` untuk double-safety.
4. **SKIP LOCKED for workers** — bagus untuk mem-partition pekerjaan, menghindari blocking.
5. **NOWAIT for low-latency failover** — jika kamu mau kegagalan cepat dan retry di lain waktu.
6. **Retry policy** — tangani deadlocks dan timeouts dengan bounded retry/backoff.
7. **Avoid long-running transactions** — no user interaction inside tx; persist raw payload before processing.

---

## 9. Contoh pola aman (gabungan conditional update + FOR UPDATE)

1. Worker mengambil event & menyimpan raw payload.
2. Worker mulai transaction.
3. `SELECT status FROM transactions WHERE id='TXN123' FOR UPDATE;`
4. Jika `status != PENDING` → rollback & stop.
5. Update status dengan `UPDATE ... WHERE id=... AND status='PENDING'`.
6. Commit.
7. Lakukan kerja-kerja panjang (refund API, notify) di luar transaksi, tapi gunakan idempotency keys.

SQL:

```sql
BEGIN;
SELECT status FROM transactions WHERE id='TXN123' FOR UPDATE;
-- verify
UPDATE transactions SET status='SUCCESS' WHERE id='TXN123' AND status='PENDING';
COMMIT;
-- long-running external calls here
```

---

## 10. Contoh nyata: mengatasi race webhook + polling

- Webhook handler:

  - simpan raw event
  - attempt to acquire lock on txn row (`FOR UPDATE NOWAIT`)

    - jika NOWAIT gagal → respond 200 and enqueue event for retry later (or skip because another worker is processing)
  - if acquired → read current status, apply conditional update, commit, respond 200.

- Polling worker:

  - pick candidate transactions (`WHERE status IN ('PENDING','PENDING_CONFIRMATION')`)
  - `SELECT ... FOR UPDATE SKIP LOCKED LIMIT N` → process only unlocked ones
  - update & commit

Dengan `SKIP LOCKED`, polling tidak mengganggu webhook processing yang sedang berlangsung.

---

## 11. Tradeoffs & caveats

- **Lock contention**: banyak concurrent workers contending pada baris populer → throughput turun. Desain sharding/queueing untuk work distribution.
- **Deadlocks**: skenario multi-row updates dapat menyebabkan deadlocks (urutkan akses resource secara deterministik untuk mengurangi kemungkinan).
- **Isolation surprises**: InnoDB gap locks bisa menyebabkan locking lebih luas di isolation levels tertentu; paham behavior DB yang kamu pakai.
- **Complex transactions**: Block hanya bagian yang butuh konsistensi.

---

## 12. Ringkasan langkah praktis

- Gunakan `SELECT ... FOR UPDATE` di dalam transaksi untuk mem-lock baris sebelum membuat keputusan yang mengubah state.
- Pilih mode: default (block), `NOWAIT` (fail fast), atau `SKIP LOCKED` (great for workers).
- Tangani deadlock/timeout dengan retry/backoff.
- Keep transactions short — jangan lakukan jaringan di dalamnya.
- Kombinasikan dengan idempotency/conditional updates untuk double safety.
- Monitor lock waits, deadlocks, throughput; optimalkan berdasarkan bottleneck.

---

Kalau mau, sekarang aku bisa:

- Tunjukkan **demo langkah-per-langkah** yang mengeksekusi race condition lalu memperbaikinya dengan `SELECT ... FOR UPDATE` (contoh script Python + PostgreSQL).
- Atau buat **snippet webhook handler + worker** yang memakai `SKIP LOCKED` agar scalable.

Mau saya buatkan contoh kode lengkap (psycopg2 atau SQLAlchemy) yang bisa kamu jalankan?
