# Penjelasan

Dalam project Go, semua file yang berakhiran \_test.go dianggap sebagai file testing

1. Buat file testing `[file_name]_test.go`
2. Buat fungsi testing di dalamnya

  ```go
  func TestLoginHandler(t *testing.T) {
    form := strings.NewReader("username=budi")
    req := httptest.NewRequest("POST", "/login", form)
    req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

    rr := httptest.NewRecorder()

    Login(rr, req) // panggil fungsi asli

    if rr.Code != http.StatusOK {
      t.Errorf("Expected status 200, got %v", rr.Code)
    }

    expected := "Selamat datang, budi"
    if rr.Body.String() != expected {
      t.Errorf("Expected body '%s', got '%s'", expected, rr.Body.String())
    }
  }
  ```

3. Jalankan testing `go test -v`

## Menampilkan test pada file html

> go test -coverprofile=coverage.out && go tool cover -html=coverage.out

## Menjalankan fungsi test spesifik

> go test -v -run=FuncTest

## Package Testify

stretchr/testify

dapat digunakan untuk beberapa testing:

- http

## Struct Testing

Dalam package testing, disediakan beberapa struct:

- `testing.T` unit test
- `testing.M` mengatur lifecycle
- `testing.B` benchmarking

## Aturan

- nama file unit test `[file_to_be_tested]_test.go`
- nama function unit test `Test[func_to_be_tested]`, harus memiliki param `(t *testing.T)` dan  tidak mengembalikan apapun

## Menjalankan Testing

```bash
# jalankan semua fungsi
go test

# fungsi tertentu
go test -v -run TestNamaFunction
```

## Menggagalkan Testing

```go
t.Fail()
t.FailNow() // testing berhenti

// menambahkan error log
t.Error(msg) // disertai fail
t.Fatal(msg) // disertai failnow
```

## Assertion (assert & require)

Dapat menggunakan library `github.com/stretchr/testify`

- `assert.[Equal|NotEqual|Nil]()` memanggil `Fail()` kalau gagal
- `require.[Equal|NotEqual|Nil]()` memanggil `FailNow()` kalau gagal
