# Dependency Injection

Merupakan sebuah pola pemrograman dimana sebuah pembuatan objek membutuhkan objek lainnya sebagai parameter. Contoh yang sering ditemukan adalah `service-repository` pattern:

- ada satu obj utama yang tidak depend ke apapun (seperti `db`)
- dilanjut dengan objek `repo` yang butuh `db`
- dilanjut dengan `service` yang mungkin bisa membutuhkan beberapa `repo`
- dilanjut dengan `controller` yang membutuhkan beberapa `service`.

apa di satu repo kita bikin manual new db?

- masalahnya `repo sudah diinject db`, tidak memiliki `param db` karena diinject.
- mau kita bikin `1` transaksi `n` repo sendiri, tidak bisa diinject dan `db` yang digunakan tidak berupa transaksi.
- solusinya kita bikin `1` repo dengan `tx:= db.begin()` dan tuliskan semua SQL disitu.

## Google Wire(DI Library)

Google Wire merupakan salah satu library populer. Performa bagus karena akan menggenerate code (compile).

`github.com/google/wire`

Dibutuhkan module go dan CLI

## Provider

Merupakan pendefinisian fungsi constructor yang akan dipanggil pada Injector.Fokus ke bagian param

```go
package simple

type SimpleRepository struct{}

type SimpleService struct{
    *SimpleRepository
}

// Buat Simple Service (membutuhkan repository)
// 1. buat provider repo
func NewSimpleRepository()*SimpleRepository{
    return &SimpleRepotisory{}
}

// 2. buat provider service dengan param bertipe repo
func NewSimpleService(repository *SimpleRepository)*SimpleService{
    return &SimpleService{
        simpleRepository: repository
    }
}
```

## Injector

File berisi daftar `function constructor / provider`. Proses generate akan melihat provider2 otomatis dan melihat berdasarkan parameter provider untuk menentukan `mana butuh dependency mana`.

File harus diberi `penanda komentar` pada baris pertama.

```go
// go:build wireinject
// +build wireinject

func InitializedService()*simple.SimpleService{
    wire.Build(simple.NewSimpleRepository, simple.NewSimpleService) //google wire secara otomatis tahu func mana butuh func mana
    return nil
}
```

## Generate Dependency Injection

Dilakukan setelah injector dan provider sudah dibuat

`wire gen packagename`

Akan mencari file injector (dengan penanda comment) dan generate file bernama `wire_gen.go` berisi fungsi yang dibuat dari injector yang bisa kita panggil di program.

```go
func InitializedService(isError bool) (*simpleService){
    simpleRepository := simple.NewSimpleRepository()
    simpleService := simple.NewSimpleService(simpleRepository)
    return simpleService
}

// akses dari program utama
service, err := app.InitializedService(false)
if err!=nil{
    panic(err)
}

service.simpleRepository
```

### Memberikan params

Berikan param pada fungsi provider. Fungsi param dalam `wire.Build` akan otomatis mereferensi paramnya dengan tipe data yang sesuai dari argumen yang diberikan saat panggil `InitializedService`

ika ada Provider yang membutuhkan data dengan tipe parameter yang sama dengan injector

fungsi provider akan mendapatkan isError dari `initializedService()` berdasarkan tipe. Kalau tipe sama, **GUNAKAN ALIAS** agar tidak error.

```go
// provider
func NewRepository(isError boolean) *SimpleRepository{
    return &SimpleRepository{
        Error: isError
    }
}

// injector
func InitializedService(isError bool) (*simpleService, error){
    wire.Build(simple.NewRepository, simple.NewService)
    return nil, nil
}

// hasil generate
func InitializedService(isError bool) (*simple.SimpleService, error){
    simlpeReposittory := simple.NewSimpleRepostiroy(isError)
    simlpeService, err := simple.NewSimpleService(simpleRepository)

    if err != nil{
        return nil, err
    }
    return simpleService, nil
}
```

### Multiple Binding

Ada kasus dimana kita menggunakan parameter provider yang sama tapi data struct (dependent utama) berbeda.

Dalam kasus ini, **GUNAKAN ALIAS** agar golang dapat membedakan struct.

### Provider Set

Digunakan untuk mengelompokkan provider kedalam **SET**, agar code pada injector tidak terlalu banyak. Semisal `UserSet` berisi `UserRepo` dan `UserService`. Pada Injector kita hanya menulis `UserSet`.

```go
var UserSet = wire.NewSet(
    NewUserRepo,
    NewUserService,
)

var OrderSet = wire.NewSet(
    NewOrderRepo,
    NewOrderService,
)

func NewOrderService(orderRepo *OrderRepo, userRepo *UserRepo) *OrderService {
    return &OrderService{orderRepo, userRepo}
}

// injector
func InitApp() *App {
    wire.Build(UserSet, OrderSet, NewApp)
    return nil
}
```
