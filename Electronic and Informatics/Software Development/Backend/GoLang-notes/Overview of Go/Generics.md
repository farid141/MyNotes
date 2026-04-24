# Generics

Digunakan agar tipe data yang digunakan sebuah fungsi flexible.

```go
func Test[T interface{}]()

func Print[T interface{}](val T) T {
    fmt.Println(val)
    return val
}

// memanggil fungsi dengan generics
Test[string]("farid")
```

## Inheritance

Sebuah fungsi dapat memiliki generic interface (kontrak fungsi yang harus diimplmentasi). Kita bisa memanggil semua struct/instance yang mengimplmentasikan kontrak tersebut.

Dalam contoh di bawah, fungsi `GetName` merupakan contoh `Generic Inheritance` dimana generic bertipe interface, sehingga `semua struct yang implementasi dari Employee` bisa digunakan.

```go
type Employee interface {
    GetName() string
}

func GetName[T Employee](parameter T) string{
    return parameter.GetName()
}

type Manager interface{
    GetName() string
    GetManagerName() string
}

type MyManager struct{
    Name string
}

func (m *MyManager) GetName() string{
    return m.Name
}

func (m *MyManager) GetManagerName() string{
    return m.Name
}
```
