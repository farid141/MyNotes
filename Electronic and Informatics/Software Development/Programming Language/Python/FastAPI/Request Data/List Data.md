# Penjelasan

Dalam sebuah query params, kita dapat menerima data list

```python
@app.get("/items/")
async def read_items(q: Annotated[list[str], Query()] = ["foo", "bar"]):
    # Request yang masuk: http://localhost:8000/items/?q=foo&q=bar
    # q = ["foo", "bar"]
