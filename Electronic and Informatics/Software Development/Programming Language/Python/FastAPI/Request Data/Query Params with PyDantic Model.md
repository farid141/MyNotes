# Penjelasan

Selain menggunakan singular parameter pada fungsi, sebuah query params dapat didefinisikan dengan model pydantic. Hal ini bertujuan untuk menggunakan banyak field sekaligus yang dapat reusable di endpoint lain.

```python
class FilterParams(BaseModel):
    limit: int = Field(100, gt=0, le=100)
    offset: int = Field(0, ge=0)
    order_by: Literal["created_at", "updated_at"] = "created_at"
    tags: list[str] = []

@app.get("/items/")
async def read_items(filter_query: Annotated[FilterParams, Query()]):
    return filter_query
