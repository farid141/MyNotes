# Error

Method dalam Golang umumnya mengembalikan variabel `err` yang mengimplementasikan interface `error`.

```go
type error interface{
    Error() string
}
```

Untuk memenuhinya bisa buat interface/type yang memiliki method `Error()` dan var `Message`. Atau gunakan std package errors (Lihat di bagian std package)

## Membuat error

Sudah disediakan package `errors` untuk membuat nilai bertipe `error`. Didalamnya ada fungsi `New()` yang mengembalikan `address ke instance struct` yang dibuat.

```go
error err = errors.New("message")
```

## Custom error

1. buat type struct yang mengimplementasikan Error() dan Message

    Definisi

    ```go
    type validationError struct {
        Message string
    }
    
    func (v *validationError) Error() string{
        return v.Message 
    }
    ```

    Penggunaan

    ```go
    err := &validationError{Message: "asdasd"}

    // cek error (dengan type assertion)
    validationErr, ok := err.(*validationErr)
    ```
