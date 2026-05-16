# Laravel

```Dockerimage
FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    unzip \
    curl \

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
```

Tambahkan nodejs dan npm kalo laravel ada pake npm untuk frontend (`Inertia, Livewire, dll`)

## BindMount

Tambahkan koneksi ke file host agar langsung diperbarui, (jika pake copy, pembaruan akan hilang jika container restart)
