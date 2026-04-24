# Function

## Deklarasi wajib type-annotations

```go
func func_name (params1 params1_type) (ret_type1, ret_type2){
 return val1, val2
}

val1, val2, := func_name()
```

## Fungsi anonim (tanpa nama)

biasanya digunakan untuk variable/callback. Bisa dijalankan langsung

```go
func() {
 fmt.Println("Hello from an anonymous function!")
}() // jalankan langsung dengan ()

greet := func(name string) {
 fmt.Printf("Hello, %s!\n", name)
}
```

## Fungsi sebagai param

biasanya digunakan untuk variable/callback

```go
func foo(filter func(string) string){}
```

## Variadic Parameter

sebuah fungsi dapat menerima parameter sebanyak2nya dan akan dibaca sebagai slice dalam fungsi tersebut.

- Harus ditempatkan di parameter terakhir

```go
// definisi fungsi
func Command(name string, arg ...string) *Cmd

// memanggil fungsi
var mySlice = []string {"asd", "dsa", "sad"}
Command("call command", mySlice...)
```
