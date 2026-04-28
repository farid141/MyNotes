# Pendahuluan

Sebelumnya kita sudah mengetahui tentang automatic validation berdasarkan tipe fungsi di parameter. Selain itu, kita juga bisa melakukan validasi yang lebih kompleks seperti:

- jumlah karakter
- nilai max/min
- regex pattern

Hal ini dapat dilakukan menggunakan 2 modul: `Annotated dan metadata`.

```python
@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(max_length=50)] = None):
```

## Deeper validation

Kita bisa menambahkan custom validasi jika tidak disediakan dalam metadata tersebut. Dengan menggunakan metadata (AfterValidator)

```python
def check_valid_id(id: str):
    if not id.startswith(("isbn-", "imdb-")):
        raise ValueError('Invalid ID format, it must start with "isbn-" or "imdb-"')
    return id


@app.get("/items/")
async def read_items(
    id: Annotated[str | None, AfterValidator(check_valid_id)] = None,
):
```

## Beberapa metadata lain

| Metadata | Kegunaan | Contoh |
|----------|----------|--------|
| `Query(...)` | Menyatakan parameter berasal dari query string, bisa dikombinasikan dengan validasi seperti `min_length`, `regex`, dll. | `Query(min_length=3)` |
| `Path(...)` | Menyatakan parameter berasal dari path URL, dengan validasi juga. | `Path(gt=0)` |
| `Header(...)` | Menyatakan parameter berasal dari HTTP header. | `Header(convert_underscores=False)` |
| `Cookie(...)` | Mengambil parameter dari cookie. | `Cookie()` |
| `Body(...)` | Untuk parameter dari body request (biasanya JSON). | `Body(embed=True)` |
| `Depends(...)` | Untuk *dependency injection*, menyisipkan logika tambahan. | `Depends(get_current_user)` |
| `AfterValidator(...)` | Validasi kustom **setelah** parsing dilakukan. | `AfterValidator(check_valid)` |
| `BeforeValidator(...)` | Validasi kustom **sebelum** parsing dilakukan. | `BeforeValidator(strip_whitespace)` |
| `Field(...)` | **Untuk parameter dalam class model Pydantic** (misalnya dalam request body), bukan langsung di endpoint. | `Field(..., description="Nama lengkap")` |
| `File(...)`, `Form(...)` | Untuk meng-handle upload file atau form-data (biasanya `multipart/form-data`). | `File(...)`, `Form(...)` |
