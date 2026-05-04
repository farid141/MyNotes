# Penjelasan

Untuk membuat contoh response pada dokumentasi, dapat dilakukan denga dua cara:

- `return tipe` pada fungsi route
- `response_model` parameter decorator route
Keduanya juga akan melakukan validasi sebelum data dikembalikan ke client

## return type vs response_model

### Masalah Tipe Return

Jika kamu menuliskan return type secara eksplisit:

```python
def get_user() -> User:
    return {"id": 1, "name": "Alice"}  # sebenarnya dict, bukan User
```

Editor/IDE akan **menampilkan peringatan atau error** karena kamu mengatakan return type-nya `User`, tetapi kamu mengembalikan `dict`. Ini karena `dict` dan `User` adalah dua tipe berbeda.

---

### Solusi: Gunakan `response_model`

Daripada menyatakan return type di fungsi, FastAPI memberikan cara untuk menyatakan bentuk **output response** secara terpisah dengan parameter `response_model` di dekorator route:

```python
@app.get("/user", response_model=User)
def get_user():
    return {"id": 1, "name": "Alice"}  # boleh dict, akan dikonversi ke User
```

Dengan ini:

- FastAPI akan otomatis mengubah dict tersebut menjadi model `User`.
- FastAPI akan melakukan validasi dan dokumentasi berdasarkan `User`.
- Kamu tidak perlu khawatir tentang return type annotation yang salah.

## Matikan struktur response

Kita bisa mematikan contoh response pada API dengan mengatur `response_model=none`
