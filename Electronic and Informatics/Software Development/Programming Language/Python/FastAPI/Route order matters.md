# path operations are evaluated in order

penulisan urutan baris path berikut tidak boleh
@app.get("/users/{user_id}")
@app.get("/users/me")

Tuliskan path yang lebih spesifik dahulu
