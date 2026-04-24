# Multi-Tenant

Sebuah aplikasi yang memungkinkan untuk membuat `tenant` baru. Dimana semuanya memiliki proses bisnis yang sama, tetapi lingkungan yang berbeda.

Dalam kasus tersebut terdapat beberapa strategi pendekatan yang dapat dilakukan:

- `shared table`
    Data masing-masing tenant disimpan dalam satu table dengan kolom pembeda `tenant_id`, memiliki kekurangan dimana semua data terkumpul pada satu table sehingga membuat operasi ke table tersebut lemot. Tetapi sangat simple dalam proses development dan cocok untuk skala kecil.
- `multi-schema`
    Masing-masing tenant memiliki schema database sendiri. Dapat mengatasi masalah pada shared table, tetapi proses development lebih kompleks.
- `multi-database`
    Masing-masing tenant memiliki database instance yang harus diinstall pada server.
