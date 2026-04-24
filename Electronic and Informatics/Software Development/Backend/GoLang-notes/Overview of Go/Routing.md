# Routing

Dalam Go, sebenarnya kita sudah bisa melakukan routing dengan `ServeMux`, package bawaan dari Go. Tetapi jika membutuhkan fitur advance, kita bisa menggunakan beberapa pilihan lain:

- GorillaMux
- HTTP Router
- bisa dicek di julienschmidt/go-http-routing-benchmark

## HTTP Router

```go
router := httprouter.New()

router.GET("/products/:id/items/:itemId", func(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
  id := params.ByName("id") // akses single param
  itemId := params.ByName("itemId")
  text := "Product " + id + " Item " + itemId
  fmt.Fprint(writer, text)
})
```

### Fitur

- method HTTP langsung ditulis
- Menerima dynamic url params (parameter 3 dari anonym func)
  - single parameter: path ditulis dengan `:<name>` `params.ByName("str")`
  - catch all parameter: path ditulis dengan `*<name>` `params.ByName("str")`

### Instalasi

```bash
go get github.com/julienschmidt/httprouter
go get github.com/stretchr/testify # untuk testing http
```

### Serve Files

Download file dari sebuah endpoint dapat dilakukan dengan `golang/embed`.

```go
//go:embed folder
var resources embed.FS

router := httprouter.New()

directory, _ = fs.Sub(resources, "resources")
router.ServeFiles("url_path", http.FS(directory))
```

### Panic Handler

Digunakan untuk handling jika ada error dalam logic, buat satu berlaku di semua kasus

```go
router.PanicHandler = func(writer http.ResponseWriter, request *http.Request, error interface{}){
  text := "error: "+error
  fmt.Fprint(writer, text)
}
```

### Not Found Handler

Digunakan untuk handling jika tidak ada pattern route yang ditemukan

```go
router.NotFound = func(writer http.ResponseWriter, request *http.Request){
  fmt.Fprint(writer, "gk ketemu")
}
```

### Not Allowed Handler

Digunakan untuk handling jika method HTTP ke route tidak sesuai.

```go
router.MethodNotAllowed = func(writer http.ResponseWriter, request *http.Request){
  fmt.Fprint(writer, "gk boleh")
}
```

### Middleware

Sebenarnya HTTP Router tidak mendukung middleware, karena hanya berfungsi sebagai routing saja.

```go
type LogMiddleware{
  http.Handler
}

func (middleware *LogMiddleware) ServeHTTP(writer http.ResponseWriter, request *http.Request){
  middleware.Handler.ServeHTTP(writer, request)
}

router := httprouter.New()

router.NotFound = func(writer http.ResponseWriter, request *http.Request){
  fmt.Fprint(writer, "gk ketemu")
}

middleware := LogMiddleware{Handler: router}

middleware.ServeHTTP()
```
