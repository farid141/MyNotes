# Penjelasan

Penulisan body params dapat bervariasi, karena dia berupa json.

## Multiple Body Params

Kita dapat mendefinisikan multiple body params pada sebuah route.

```python
@app.put("/items/{item_id}")
async def update_item(
    item_id: int, item: Item, user: User, importance: Annotated[int, Body()]
):
    results = {"item_id": item_id, "item": item, "user": user, "importance": importance}
    return results
```

Pada code tersebut, struktur body yang diterima akan berupa

```json
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    }
}
```

## Singular Model with Field

```python
async def update_item(item_id: int, item: Annotated[Item, Body(embed=True)]):

# The expected body params will placed inside `item` fields
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    }
}
```

## Single Body params

Selain mendefinisikan body params dengan PyDantic Model, kita dapat menuliskannya dengan metadata `Body()`
