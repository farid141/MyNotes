# Best Practice Async FastAPI

1. Gunakan Asynchronous Programming untuk librarynya

   ```python
   from fastapi import FastAPI
   import httpx

   app = FastAPI()

   @app.get("/fetch-data")
   async def fetch_data():
       async with httpx.AsyncClient() as client:
           response = await client.get("https://jsonplaceholder.typicode.com/posts/1")
           return response.json()
   ```

2. Gunakan async pada Depend() (WAJIB)

   ```python
   from fastapi import Depends, FastAPI
   import httpx

   app = FastAPI()

   async def get_async_dependency():
       async with httpx.AsyncClient() as client:
           response = await client.get("<https://jsonplaceholder.typicode.com/posts/1>")
           return response.json()

   @app.get("/async")
   async def read_data(dependency: dict = Depends(get_async_dependency)):
       return dependency
   ```

3. **Gunakan await pada fungsi async**

   Jika fungsi internal melibatkan operasi asynchronous, maka fungsi utama harus dideklarasikan sebagai async agar dapat menggunakan await.

   ```python
   from fastapi import FastAPI
   import httpx

   app = FastAPI()

   @app.get("/nested-async")
   async def nested_async():
       async def inner_function():
           async with httpx.AsyncClient() as client:
               response = await client.get("<https://jsonplaceholder.typicode.com/posts/1>")
               return response.json()

       result = await inner_function()
       return result
   ```

4. Kombinasikan async-await

    ```python
    from fastapi import FastAPI
    import httpx

    app = FastAPI()

    @app.get("/mixed")
    async def mixed_operations():
    def sync_operation():
    return {"message": "This is a synchronous operation"}

        async def async_operation():
            async with httpx.AsyncClient() as client:
                response = await client.get("https://jsonplaceholder.typicode.com/posts/1")
                return response.json()

        sync_result = sync_operation()
        async_result = await async_operation()
        return {"sync": sync_result, "async": async_result}
    ```
