# Payment Apps

## Payment Gateway

uang tidak langsung masuk ke rekening, melainkan ditahan gateway dahulu (escrow).

### Validasi

Ada proses validasi dan verifikasi transaksi, seperti:

- pengecekan nominal dan status pembayaran dari pihak bank,
- deteksi fraud (misalnya nominal aneh, user mencurigakan),
- proses settlement (pemindahan uang ke rekening merchant).

Jika validasi gagal, transaksi bisa berstatus invalid atau void, dan dana dikembalikan ke pengguna.

## Menggunakan Harga dari API pihak ketiga

Dalam beberapa kasus jika kita berlangganan biasanya ada webhook untuk mengupdate data pada database internal setiap saat. Jika tidak ada, perlu konfirmasi dengan `GET` lagi untuk dapatin info langsung pada proses krusial, seperti **checkout**.

Mantap 💪 — topik **payment transaction flow** ini inti banget kalau kamu ingin memahami sistem finansial dari sisi *engineering*.
Mari kita bahas dari sudut pandang developer, bukan teori ekonomi — jadi fokusnya ke **alur data, status transaksi, dan sistem integrasi**.

## Payment Transaction Flow (Developer Perspective)

### **1️⃣ Inisiasi Transaksi**

1. User menekan tombol *Bayar* di aplikasi.
2. Sistem backend merchant membuat **Payment Request** ke Payment Gateway API.
3. Gateway merespons dengan data untuk redirect / token pembayaran (mis. `payment_url`, `transaction_id`).

### **2️⃣ User Melakukan Pembayaran**

1. User diarahkan ke halaman bank atau metode pembayaran tertentu (mis. e-wallet, QRIS, virtual account, kartu kredit).
2. User menyelesaikan pembayaran.
3. Gateway menerima **notifikasi sukses/gagal** dari pihak bank/channel.

### **3️⃣ Gateway Mengirim Webhook ke Merchant**

1. Setelah status transaksi diketahui, gateway akan **mengirim webhook callback** ke sistem merchant:

    - contoh endpoint: `POST /webhook/payment`
    - payload berisi: `transaction_id`, `status`, `amount`, `signature`

2. Merchant **wajib memverifikasi signature** untuk memastikan data valid dan bukan spoofing.
3. Merchant mengupdate status transaksi di database (mis. `PENDING → SUCCESS`).

### **4️⃣ Merchant Mengembalikan Response ke User**

1. Setelah webhook diterima dan diverifikasi, merchant frontend bisa menampilkan status “Pembayaran Berhasil”.
2. Biasanya frontend juga punya endpoint `GET /transaction-status` untuk *polling* status terbaru jika webhook terlambat.

### **5️⃣ Settlement (Arus Dana)**

1. Biasanya **T+1 atau T+2** (hari kerja berikutnya): gateway mentransfer dana ke rekening merchant.
2. Proses ini disebut **settlement**, dan bisa dilengkapi dengan **reconciliation report** untuk memastikan semua transaksi sinkron antara gateway dan sistem internal merchant.

## Status Transaksi (Lifecycle)

Umumnya, transaksi punya siklus status seperti ini:

| Status      | Arti                                  | Siapa yang Ubah    |
| ----------- | ------------------------------------- | ------------------ |
| `INITIATED` | Transaksi dibuat, belum dibayar       | Merchant           |
| `PENDING`   | Menunggu pembayaran dari user         | Gateway            |
| `SUCCESS`   | Pembayaran berhasil diverifikasi      | Gateway → Merchant |
| `FAILED`    | Pembayaran gagal (expired / invalid)  | Gateway            |
| `CANCELED`  | User batal bayar                      | Merchant/User      |
| `REFUNDED`  | Dana dikembalikan ke user             | Gateway / Merchant |
| `SETTLED`   | Dana sudah masuk ke rekening merchant | Gateway            |

---

### 🧠 4. Konsep Teknis Penting

| Konsep                       | Penjelasan                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| **Idempotency Key**          | Digunakan saat membuat transaksi supaya permintaan duplikat tidak membuat transaksi ganda.       |
| **Webhook Signature (HMAC)** | Keamanan untuk memastikan webhook benar-benar berasal dari gateway.                              |
| **Retry Mechanism**          | Webhook atau request transaksi sering di-*retry* jika gagal dikirim — sistem harus *idempotent*. |
| **Audit Trail**              | Log transaksi untuk keperluan debugging dan pelacakan.                                           |
| **Reconciliation Script**    | Proses otomatis mencocokkan data internal merchant dengan laporan gateway setiap hari.           |

---

### 💡 5. Tantangan Nyata di Dunia Production

1. **Webhook Delay / Missing Notification**
   → Solusi: polling `GET /transaction-status` jika belum ada webhook setelah X menit.

2. **Race Condition (double payment)**
   → Solusi: gunakan *idempotency key* dan *database transaction lock*.

3. **Gateway Timeout**
   → Harus punya mekanisme retry dengan log detail.

4. **Settlement Mismatch**
   → Gunakan reconciliation otomatis berbasis CSV/API dari gateway.

## Penyebab Missing Notif

Terdapat beberapa penyebab missing notif, dibagi menjadi dari external atau dari internal developer:

### Internal

- Kesalahan penulisan konfigurasi webhook di setting payment gateway.
- Endpoint trothling (melebihi limit persatuan waktu yang diatur)
- Kesalahan processing di sisi server

### Eksternal

- Infrastruktur atau jaringan.
- gateway bermasalah.
- skema dari gateway berubah.
