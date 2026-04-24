# Repository Service Pattern

Dalam penerapan **Repository Pattern** di Go (Golang), ketika sebuah route melakukan beberapa aksi ke **beberapa tabel** (atau entity), sebaiknya logika akses ke masing-masing tabel tetap **dipisahkan ke dalam repository masing-masing**, bukan ditaruh semua langsung di route handler. Namun, orchestration (koordinasi antara banyak repository) bisa dilakukan di **service layer**, bukan di handler/route, dan bukan di repository.

## Struktur Ideal

1. **Handler (route)**: Terima input, validasi awal, panggil service.
2. **Service Layer**: Koordinasi antar repository, logika bisnis lintas entity.
3. **Repository**: Akses langsung ke tabel/database untuk 1 entity saja.

---

### Contoh Kasus

Misalnya route `/checkout` menyentuh tabel:

* `orders`
* `order_items`
* `payments`

Maka kamu bisa buat:

* `OrderRepository`
* `OrderItemRepository`
* `PaymentRepository`

Lalu buat satu `CheckoutService` (atau `OrderService`) yang menggunakan ketiganya.

```go
type OrderService struct {
    orderRepo      OrderRepository
    orderItemRepo  OrderItemRepository
    paymentRepo    PaymentRepository
}

func (s *OrderService) Checkout(input CheckoutInput) error {
    // Buat order
    orderID, err := s.orderRepo.Create(input.OrderData)
    if err != nil {
        return err
    }

    // Buat order items
    for _, item := range input.Items {
        item.OrderID = orderID
        err := s.orderItemRepo.Create(item)
        if err != nil {
            return err
        }
    }

    // Buat payment
    err = s.paymentRepo.Create(input.PaymentData)
    if err != nil {
        return err
    }

    return nil
}
```

### Kenapa Jangan Taruh Langsung di Route?

* Route/handler sebaiknya tetap **tipis**, hanya menerima HTTP request, validasi, dan kirim ke service.
* Menaruh logika bisnis di handler menyulitkan untuk testing dan reuse.
* Logika update beberapa tabel sering butuh **transaction management**, dan ini sebaiknya dikelola di service layer, bukan handler atau repository.

---

### Bonus: Transaksi DB

Kalau kamu perlu memastikan semuanya sukses atau rollback, kamu bisa terapkan transaction:

```go
func (s *OrderService) Checkout(input CheckoutInput) error {
    tx, err := s.db.Begin()
    if err != nil {
        return err
    }

    defer func() {
        if p := recover(); p != nil {
            tx.Rollback()
            panic(p)
        } else if err != nil {
            tx.Rollback()
        } else {
            err = tx.Commit()
        }
    }()

    // Kemudian pass `tx` ke semua repo yang mendukung transaksi
    err = s.orderRepo.CreateTx(tx, input.OrderData)
    ...
}
```

---

### Kesimpulan

> **Gunakan repository untuk per-table logic. Koordinasi antar repo taruh di service. Handler sebaiknya tetap tipis.**

## Short Process

> **Iya, sebaiknya tetap pakai service layer meskipun logic-nya sedikit**, karena:

* Konsistensi struktur.
* Mudah scaling nanti.
* Memisahkan tanggung jawab (SRP).

---

### Tapi... ada pengecualian pragmatis

Kalau case-nya **benar-benar sederhana** — misalnya hanya `CreateCustomer()` → langsung simpan ke database, **tanpa validasi bisnis**, tanpa rule khusus, dan tidak menyentuh entity lain — **boleh** langsung panggil repository dari handler. Ini disebut pendekatan pragmatis.

Contoh:

```go
func (h *CustomerHandler) Create(w http.ResponseWriter, r *http.Request) {
    var input CreateCustomerInput
    json.NewDecoder(r.Body).Decode(&input)

    customer := Customer{Name: input.Name, Email: input.Email}
    err := h.customerRepo.Create(customer)
    if err != nil {
        http.Error(w, "failed", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
}
```

Tapi kalau nanti bertambah misalnya:

* Validasi email unik
* Cek blacklist
* Kirim notifikasi
* Logging khusus

...maka kamu akan cepat menyadari butuh service layer, dan kamu harus refactor ulang. Maka lebih aman tetap buat service layer dari awal.

---

### Rekomendasi

**Kalau kamu sedang bangun sistem baru dan ingin maintainable dalam jangka panjang**, bahkan untuk logic sederhana, sebaiknya:

```go
// Handler
func (h *CustomerHandler) Create(w http.ResponseWriter, r *http.Request) {
    var input CreateCustomerInput
    json.NewDecoder(r.Body).Decode(&input)

    err := h.customerService.CreateCustomer(input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
}

// Service
func (s *CustomerService) CreateCustomer(input CreateCustomerInput) error {
    // Mungkin nanti validasi, sanitize, check uniqueness
    customer := Customer{Name: input.Name, Email: input.Email}
    return s.repo.Create(customer)
}
```

---

### Kesimpulan

| Situasi                          | Pake Service?                       |
| -------------------------------- | ----------------------------------- |
| Satu entity, simple, no logic    | **Boleh tanpa service (pragmatik)** |
| Satu entity tapi ada rule bisnis | **Pakai service**                   |
| Multi entity, transaksi, rules   | **Wajib pakai service**             |
| Long-term project / team besar   | **Sebaiknya selalu pakai service**  |

Kalau kamu mau template struct folder untuk use case ini, tinggal bilang aja.

Pertanyaan ini menyentuh jantung arsitektur aplikasi Go modern: **bagaimana cara Service memanggil Repository** – lewat *dependency injection* (DI), atau langsung oper objek DB?

---

### 🔧 Jawaban Praktis

Biasanya **pakai Dependency Injection (DI)** – entah manual atau lewat framework – dan repository sudah punya akses ke DB-nya.

**Service tidak langsung oper `*sql.DB` atau `*gorm.DB` ke repository** saat dipanggil, karena:

* Service seharusnya tidak tahu detail cara repository bekerja.
* Abstraksi lebih terjaga.

---

### ✅ Contoh Manual Dependency Injection (umum di Go)

#### 1. Setup di awal (komposisi dependency)

```go
type App struct {
    DB             *sql.DB
    CustomerRepo   CustomerRepository
    CustomerService CustomerService
    Handler        *CustomerHandler
}

func InitApp() *App {
    db := setupDB()

    repo := NewCustomerRepo(db)
    service := NewCustomerService(repo)
    handler := NewCustomerHandler(service)

    return &App{
        DB:              db,
        CustomerRepo:    repo,
        CustomerService: service,
        Handler:         handler,
    }
}
```

#### 2. Repository menerima `*sql.DB` via constructor

```go
type CustomerRepository interface {
    Create(customer Customer) error
}

type customerRepo struct {
    db *sql.DB
}

func NewCustomerRepo(db *sql.DB) CustomerRepository {
    return &customerRepo{db}
}
```

#### 3. Service menerima repository via constructor

```go
type CustomerService interface {
    CreateCustomer(input CreateCustomerInput) error
}

type customerService struct {
    repo CustomerRepository
}

func NewCustomerService(repo CustomerRepository) CustomerService {
    return &customerService{repo}
}
```

#### 4. Handler menerima service

```go
type CustomerHandler struct {
    service CustomerService
}

func NewCustomerHandler(service CustomerService) *CustomerHandler {
    return &CustomerHandler{service}
}
```

---

### 📦 Opsi Lain: Pakai DI Framework

Kalau app kamu makin besar, kamu bisa pakai DI library seperti:

* `google/wire` – compile-time dependency injection
* `uber/dig` – runtime DI container

Tapi untuk 80% use case, **manual DI seperti di atas sudah cukup bagus dan sangat idiomatic di Go.**

---

### ❗Yang Harus Dihindari

```go
func (s *CustomerService) CreateCustomer(input CreateCustomerInput) error {
    db := getDB() // BAD: coupling tinggi
    repo := NewCustomerRepo(db)
    return repo.Create(...)
}
```

Ini melanggar prinsip separation of concerns dan bikin testing susah.

---

### 🧠 Kesimpulan

* ✅ Gunakan **manual DI**: Pass repository ke service melalui constructor.
* ✅ Repository menerima `*sql.DB` atau `*gorm.DB` saat inisialisasi.
* ❌ Hindari pass `*sql.DB` langsung dari service ke repository saat runtime.
* ❌ Hindari service membuat repository baru di dalam fungsinya.

---

Kalau kamu ingin saya bantu buatkan struktur folder + init dependency lengkap sebagai template, tinggal bilang aja.
