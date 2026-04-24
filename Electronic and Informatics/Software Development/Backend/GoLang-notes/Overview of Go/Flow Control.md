# Flow Control

## If-else

pada go, sintax if-else sama dengan c/c++/php, tidak menggunakan tanda kurung untuk expression-nya

## Switch-case

```go
switch var_name{
 case "cat":
  //do something
 case "dog":
  //do something
 default:
  //do something
}
```

## For

### looping basic

perhatikan bahwa sintaks seperti C, tapi tidak menggunakan ()

```go
for i:=0; i<10; i++{
}

for{} // invinite loop
```

### For-range

Digunakan untuk looping ke array/slice, maps dan string

```go
animals := []string{"dog", "fish", "cat"}
for _, animal := range animals{
 // akses var_ atau animal
}
```

>pada code diatas, "_" berisi index boleh tidak digunakan
>jika string maka akan direpresentasikan dalam decimal value
