# Pointer

konsep pointer pada Go mirip dengan c++, kita mempassing address dengan &var_name, dan dapat memodifikasi nilainya dalam fugsi dengan pass by reference

```go
func func_name(s *string){
    *s = "Red"
}
```

## mendapat alamat dari variabel

```go
&variable
atau menginisialisasi sekaligus
address2 := &Address{"asd1", "asd2"}
```

## de-reference pointer

mengakses variabel dari pointer

```go
var addr1 Address := Address{"asd1", "asd2"}
var addr2 *Address := &addr1

addr1.Name = "edited"
```

## Khusus untuk struct

Go memiliki syntactic sugar khusus untuk struct pointers, untuk mengedit field kita tidak memerlukan `*`

```go
s := &a
s.Field = 34  // sama dengan (*s).Field = 34

```

## mengubah data lama dapat juga menggunakan

*addr2 = Address{"dsa1", "dsa2"}

## operator New

digunakan untuk mereferensikan se sebuah tipe data (variabel kosong)

```go
var alamat1 *Address = &Address{} // tanpa New
var alamat1 *Address = New(Address) // Dengan New
```

## Benefit

### Memory Efficiency

When you pass a large data structure (like a slice or struct) by value, a copy of the entire data structure is created in memory. This can consume a significant amount of memory, especially if the structure is large. By passing a pointer (reference) to the data instead, only the memory address is passed, which is significantly smaller.

## Processing Speed

Passing by reference can also improve processing time. Copying large amounts of data can be time-consuming, whereas passing a pointer involves simply copying an address. This can lead to faster function calls and less overhead, particularly in scenarios where the function modifies the data.
