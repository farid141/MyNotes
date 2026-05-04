# Penjelasan

FastAPI didasarkan pada ASGI (Asynchronous Server Gateway Interface) , yang memungkinkan aplikasi untuk menangani permintaan secara asynchronous menggunakan event loop. Dengan model ini, FastAPI dapat menangani ribuan koneksi secara bersamaan dalam satu proses tanpa perlu membuat thread baru untuk setiap permintaan.

concurrency melalui coroutine (fungsi async)

Performa konkurensi FastAPI sangat bergantung pada server ASGI yang digunakan untuk menjalankannya.

1. Uvicorn adalah server ASGI yang paling sering digunakan dengan FastAPI. Secara default, Uvicorn menjalankan aplikasi dalam satu proses dan satu thread

Untuk operasi CPU-bound, gunakan threading atau multiprocessing agar tidak memblokir event loop.
