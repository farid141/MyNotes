# Pendahuluan

Pada sebuah request yang masuk, kita dapat mengambil data dari beberapa tempat:

- dynamic path parameter
- query params
- body
- header

Pada prakteknya, sebuah fungsi router parameter yang `bukan annotate` akan dianggap dengan urutan

1. path (jika param cocok dengan path, maka path)
2. query (jika singular, maka query)
3. body (jika PyDantic Model, maka mody)

```python
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, q: str | None = None):
    result = {"item_id": item_id, **item.dict()}
    if q:
        result.update({"q": q})
    return result
```

Pada contoh di atas:

- item_id: path
- item: body (Item merupakan pydantic model)
- q: query params
