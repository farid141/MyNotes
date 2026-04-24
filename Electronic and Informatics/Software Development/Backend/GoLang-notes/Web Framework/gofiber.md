# Gofiber

Merupakan framework web untuk membuat webserver

## Routing

### Context

Merupakan parameter handler dan representasi request dan response webserver
<https://docs.gofiber.io/api/ctx/>

```go
// Mengambil query param
c.Query("name")

// mengembalikan response
return c.SendString("Hello, World!")
```

#### Request Data

- Form data
- multipart
- body

### Handler

Merupakan fungsi callback router (param ke 2) yang menangani request dan mengembalikan response

```go
// Simple GET handler
app.Get("/api/list", func(c *fiber.Ctx) error {
  return c.SendString("I'm a GET request!")
})

// Simple POST handler
app.Post("/api/register", func(c *fiber.Ctx) error {
  return c.SendString("I'm a POST request!")
})
```

## Middleware

```go
app.Use(...interface)
```

jika param 1 langsung fungsi, jika param lebih dari 1, param 1 harus path (bisa string/list)

### Available Middleware

Bawaan <https://docs.gofiber.io/category/-middleware>
dengan third party <https://docs.gofiber.io/contrib/>

- JWT
- Cors

### Custom

Digunakan untuk menyaring request (dapat/tidak) diproses. Path yang cocok akan masuk ke callback `Use` sebelum ke route handler `return c.Next()`.

```go
// Match any request
app.Use(func(c *fiber.Ctx) error {
  // task before process
    err := c.Next()
  // task after process
  return err
})

// Match request starting with /api
app.Use("/api", func(c *fiber.Ctx) error {
    return c.Next()
})

// Match requests starting with /api or /home (multiple-prefix support)
app.Use([]string{"/api", "/home"}, func(c *fiber.Ctx) error {
    return c.Next()
})

// Attach multiple handlers 
app.Use("/api", func(c *fiber.Ctx) error {
  c.Set("X-Custom-Header", random.String(32))
    return c.Next()
}, func(c *fiber.Ctx) error {
    return c.Next()
})
```

## Validator

Berisi validasi ketika response masuk dan akan membuat response error ketika validasi gagal

## Prefork

Fitur yang menjalankan beberapa program `sejumlah cpu` kita dengan satu parent dan lainnya process. Bisa dicek dengan `fiber.IsChild()` `fiber.IsParent`.

## View Template

Sangat mudah mengintegrasikan templating engine dengan Fiber. Ada beberapa engine, paling sering digunakan `mustache`.

```go
var engine := mustache.New("./template", ".mustache")

app := fiber.New(fiber.Config{Views: engine})

app.Get("/", func(ctx *fiber.Ctx){
  return ctx.Render("index", fiber.Map{
    "data1": "test",
    "data2": "test",
  })
})
```
