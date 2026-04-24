# JSON

sudah disediakan package built-in Golang/JSON

## Penulisan Struct dengan Tag JSON (tidak wajib)

Untuk menghubungkan field di `struct` dengan field dalam JSON, gunakan tag `json:"fieldname"` setelah nama field untuk disesuaikan dengan field.

Berlaku 2 arah (decode dan encode) dan tidak case sensitive untuk capslock.

```go
type Person struct {
  Name      string `json:"name"`              // Wajib ada
  Age       int    `json:"age,omitempty"`     // Dihilangkan jika nilai nol
  IsMarried bool   `json:"isMarried,omitempty"`
}
```

**Catatan penting:**

* Gunakan tanda backtick (`` ` ``) untuk menuliskan tag.
* Tambahkan `omitempty` untuk menghilangkan field dari hasil JSON jika nilainya kosong atau default (0, "", false).

## Decode JSON (Unmarshal)

JSON ke variable Go, mengembalikan satu data err. Caranya sama saja walaupun tipe datanya kompleks, asalkan kita mendefinisikan tipe dengan benar.

### Struktur data diketahui

```go
var people []Person
err := json.Unmarshal([]byte(myJson), &people)
if err != nil {
    log.Fatal(err)
}
```

### Struktur data dinamis (tidak diketahui)

konversi ke map dengan value `any`.

```go
// berupa obj campuran
var data map[string]interface{}
err := json.Unmarshal([]byte(myJson), &data)
if err != nil {
    log.Fatal(err)
}

// Atau jika data berupa array campuran:
var arr []interface{}
json.Unmarshal([]byte(myJson), &arr)
```

---

## Encode JSON (Marshal)

Mengubah data Go menjadi JSON string. Mengembalikan 2 data, json dan error. `Caranya lebih mudah daripada decode`, karena tidak perlu menentukan tipe data

```go
person := Person{Name: "Alice", Age: 25}

func logJSON(data interface{}){
    jsonData, err := json.Marshal(person)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(jsonData)
}
logJson(person)
```

## Stream Data

Gunakan `json.Decoder` jika membaca dari `io.Reader` (misalnya file atau HTTP response). String JSON tidak perlu diload pada program, langsung dapat hasil decodenya.

```go
// Decode (tidak perlu load JSON dalam program)
reader, _ := os.Open("sample.json")
decoder := JSON.NewDecoder(reader)

customer := Customer{}
decoder.Decode(&customer)

// Encode (langsung tulis JSON di file)
writer, _ := os.Create("asd.json")
encoder := JSON.NewEncoder(writer)

encoder.Encode(customer)
```
