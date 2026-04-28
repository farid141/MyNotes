# Penjelasan

PyDantic menyediakan tipe data tambahan yang digunakan untuk melakukan validasi yang lebih kompleks

- `HttpUrl`
- `UUID` str
- `datetime.datetime` str in ISO 8601 format, like: 2008-09-15T15:53:00+05:00.
- `datetime.date` str in ISO 8601 format, like: 2008-09-15.
- `datetime.time` str in ISO 8601 format, like: 14:23:55.003.
- `datetime.timedelta` float of total seconds.
- `bytes` str with binary "format".
- `Decimal` float

Lebih lengkapnya bisa cek dokumentasi:
> <https://docs.pydantic.dev/latest/concepts/types/>
