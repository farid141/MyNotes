# Pengertian

`Context` adalah sebuah data yang membawa _value_ dan _sinyal_ seperti **cancel**, **timeout**, atau **deadline** antar proses. Dalam aplikasi web berbasis Go, biasanya context sudah otomatis dibuat saat menerima sebuah request.

## Interface `Context`

```go
type Context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key interface{}) interface{}
}
```

## Cara Membuat Context

Ada dua cara membuat context:

1. **Manual**, dengan mengimplementasikan interface `Context` sendiri (jarang digunakan).
2. **Menggunakan package `context` dari standard library** (umum digunakan).

### Beberapa fungsi penting dari package `context`

- `context.Background()`
  Mengembalikan context kosong yang `tidak memiliki cancel, timeout dan value`. Biasanya digunakan sebagai root context.
- `context.TODO()`
  Mengembalikan context kosong. Digunakan saat belum jelas.

## Parent-Child Relationship

- Satu context bisa memiliki banyak child.
- Tapi, setiap context hanya bisa memiliki **satu parent**.
- Pembatalan context parent (cancel) akan membatalkan juga child dan grand-child (atas kebawah)
- Penyisipan value ke parent bisa diakses di child dan grand-child (atas ke bawah)

### Immutable

Context bersifat **immutable** (tidak bisa mengubah data context yang sudah ada). Aksi seperti mengubah value/timeout akan `membuat context baru` (child context).

### Operasi Dalam Context

#### Value

```go
contextA = context.Background()
contextB = context.withValue(contextA, "b", "B") // Menambahkan value, akan membuat context baru (child dari contextA)
fmt.Println(contextA) // Bisa diprint

fmt.println(contextB.Value("a")) //Mendapatkan nilai by key. Jika tidak ditemukan, bernilai nil
```

#### Cancel

Biasanya diterapkan dalam go routine (ada go routine terpisah yang mengirim sinyal cancel, dan lainnya mengecek sinyal)

Contoh kegunaan:

- menghentikan proses query ke database

```go
contextA = context.Background()
contextB, cancelB = context.withCancel(contextA) // Menambahkan signal cancel, akan membuat context baru (child dari contextA)
fmt.Println(contextA) // Bisa diprint
```

```go
func CreateCounter(ctx context.Context) chan int {
 destination := make(chan int)

  //  anonim func langsung panggil
 go func() {
  defer close(destination)
  counter := 1

  for {
   select {
   case <-ctx.Done():
    return
   default:
    destination <- counter // kirim ke channel
    counter++
    time.Sleep(1 * time.Second) // simulasi slow
   }
  }

 }()

 return destination
}

func main() {
 parent := context.Background()
 ctx, cancel := context.WithCancel(parent)
//  ctx, cancel := context.WithTimeout(parent, 5*time.Second)
//  ctx, cancel := context.WithDeadline(parent, time.Now().Add(5*time.Second))

 destination := CreateCounter(ctx)

 fmt.Println("Total Goroutine", runtime.NumGoroutine()) //10

 for n := range destination {
  fmt.Println("Counter", n)
  if n == 10 {
   break
  }
 }

 cancel() // mengirim sinyal cancel ke context sehingga <-ctx.Done()

 time.Sleep(2 * time.Second)

 fmt.Println("Total Goroutine", runtime.NumGoroutine())
}
```
