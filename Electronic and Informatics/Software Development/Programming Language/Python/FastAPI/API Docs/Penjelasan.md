# Penjelasan

Secara otomatis code yang dituliskan dapat menggenerate API docs dengan penulisan code yang sesuai:

- Membuat opsi dropdown

```python
from enum import Enum

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    # Cek member
    model_name is ModelName.alexnet:

    # get value
    model_name.value
```
