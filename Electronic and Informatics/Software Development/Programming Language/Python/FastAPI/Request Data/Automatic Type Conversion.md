# Penjelasan

Dalam mengambil request data, kita mendefinisikan beberapa parameter (beserta tipe data) pada fungsi route tersebut.
Dalam FastAPI, data tersebut akan secara otomatis dikonversi ke tipe yang didefinisikan.

Selain itu, ini dapat menjadi validator karena ketika tipe data tidak dapat dikonversi, maka akan ada response cantik dari **HTTPError**:

```json
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": [
        "path",
        "item_id"
      ],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "foo",
      "url": "https://errors.pydantic.dev/2.1/v/int_parsing"
    }
  ]
}
```
