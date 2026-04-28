# Penjelasan

Dalam sebuah url, biasanya kita dapat membuat query params dengan format kebab-case. Namun, format ini tidak dapat dijadikan sebagai variabel name pada fungsi python sehingga tidak bisa menjadikannya sebagai function params. Untuk itu, gunakan alias pada metadata yang ada

```python
@app.get("/items/")
async def read_items(q: Annotated[str | None, Query(alias="item-query")] = None):
