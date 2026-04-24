# Panic and Recover

Jangan jadikan panic sebagai cara biasa menangani error (pakai error biasa untuk itu). Gunakan panic hanya untuk kondisi luar biasa/fatal.

panic(str): benar2 menghentikan program (defer tetap dieksekusi)
recover(): setelah ada panic program dapat berjalan kembali (biasanya diletakkan di fungsi defer)

```go
func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recover:", r)
        }
    }()

    fmt.Println("A")
    panic("terjadi panic")
    fmt.Println("B") // BARIS INI TIDAK DIEKSEKUSI
}
```
