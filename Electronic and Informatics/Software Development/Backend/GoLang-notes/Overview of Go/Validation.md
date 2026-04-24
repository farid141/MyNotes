# Validation

Digunakan untuk mencari validasi data secepat mungkin sebelum data diproses. Biasanya menggunakan package (`go-playground/validator`) agar tidak perlu menulis `if-else` yang panjang. <https://pkg.go.dev/github.com/go-playground/validator/v10>

```go
var validate *validator.Validate = validator.New()
```

## Validator Tag

Melakukan validasi ke satu variabel. `validate.Var()`

```go
// validasi variable
var user string := ''
var userA string := ''

err := validate.Var(user, "required") // false, karena '' merupakan default value
err := validate.Var(userA, user, "required") // false, karena userA != user
```

- `required`: harus ada isi dan bukan default value
- `eqvalue`: variabel bernilai sama

## Validasi Struct

Melakukan validasi ke struct, `validate.Struct()`

```go
// validasi struct
type Test struct {
 Field `validate:"excludesall=|"`    // BAD! Do not include a pipe!
 Field `validate:"excludesall=0x7C"` // GOOD! Use the UTF-8 hex representation.
}

outer := &Outer{
 InnerStructField: inner,
 CreatedAt: now,
}

errs := validate.Struct(outer)
```

Dalam melakukan validasi struct, kita bisa pass by value. Tapi, pointer direkomendasikan, karena:

- Lebih efisien (tidak copy struct).
- Diperlukan jika validator ingin mengakses metode dengan receiver pointer `(func (u *User) SomeMethod())`.
- Diperlukan kalau struct bersarang (nested struct) dan kamu pakai tag validasi di dalamnya.

### Custom Structure

```go
// Validasi
if err := validate.Struct(req); err != nil {
    // Ubah pesan error menjadi bentuk yang mudah dibaca
    errors := make(map[string]string)
    for _, e := range err.(validator.ValidationErrors) {
        errors[e.Field()] = validationMessage(e)
    }

    return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
        "message": "Validation failed",
        "errors":  errors,
    })
}

func validationMessage(e validator.FieldError) string {
    switch e.Tag() {
    case "required":
        return e.Field() + " is required"
    case "min":
        return e.Field() + " must be at least " + e.Param() + " characters"
    case "max":
        return e.Field() + " must be at most " + e.Param() + " characters"
    case "email":
        return "Invalid email format"
    case "gte":
        return e.Field() + " must be greater than or equal to " + e.Param()
    case "lte":
        return e.Field() + " must be less than or equal to " + e.Param()
    default:
        return "Invalid value for " + e.Field()
    }
}
```
