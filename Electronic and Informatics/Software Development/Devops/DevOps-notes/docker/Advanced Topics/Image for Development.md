# Image for Development

Kita bisa menggunakan container untuk development, karena memiliki beberapa manfaat:

- Isolasi dari OS
- Menjalankan beberapa container secara bersamaan
- Versioning tools mudah
- Environment sama dengan production

## Reusable Image

Untuk mengimplementasikannya, ada beberapa tips agar image dapat digunakan dan tentunya tetap menghemat ruang yang ada:

- Gunakan custom base image yang memuat tools2 yang digunakan beberapa projek

    ```dockerfile
    # php-base.Dockerfile
    FROM php:8.2-fpm

    RUN apt-get update && apt-get install -y \
        libpng-dev libjpeg-dev libonig-dev libxml2-dev zip unzip curl git libzip-dev libpq-dev \
        && docker-php-ext-install pdo_mysql mbstring zip exif pcntl bcmath gd \
        && rm -rf /var/lib/apt/lists/*

    COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

    WORKDIR /var/www
    RUN chown -R www-data:www-data /var/www

    CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
    ```

- Jangan gunakan `copy . .` dalam custom image tersebut, gunakan bind-mount ke projek kita
- Gunakan shared container untuk service database
