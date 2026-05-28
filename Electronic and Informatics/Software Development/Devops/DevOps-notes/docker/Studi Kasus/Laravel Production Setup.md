# Laravel Production Setup

Dalam production Laravel, umumnya menggunakan `php-fpm` sebagai php engine dan `NGINX` sebagai web service. Dimana `NGINX` berperan sebagai web server yang akan mengerahkan request dari luar ke `jaringan app`.

PHP-FPM digunakan daripada laravel built-in web server `php artisan serve` dikarenakan performa nya lebih baik.

- lifecycle request yang stabil
- process management (worker pool)
- concurrency lebih proper
- integrasi matang dengan web server
- observability / tuning
- battle-tested

## NGINX config

```conf
server {
    listen 80;
    index index.php index.html;
    server_name localhost;

    root /var/www/public;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.ht {
        deny all;
    }
}

```

## Docker Image

```Dockerimage
# Build stage
FROM composer:2 AS composer-build

WORKDIR /app
COPY composer.* ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

# Runtime
FROM php:8.3-fpm-alpine

WORKDIR /var/www

COPY --from=composer-build /app /var/www
```

### Kalau ada Vite

tambahkan stage Node buat:

```bash
npm ci
npm run build
```

lalu copy hasil public/build.

## Docker Compose

```yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: docker/php.Dockerfile
    container_name: laravel_app
    working_dir: /var/www
    volumes:
      - .:/var/www
    networks:
      - laravel

  web:
    image: nginx:stable
    container_name: nginx_web
    ports:
      - "8000:80"
    volumes:
      - .:/var/www
      - ./docker/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app
    networks:
      - laravel

networks:
  laravel:
    driver: bridge
```

| Komponen       | Peran                                                                |
| -------------- | -------------------------------------------------------------------- |
| `php:8.2-fpm`  | Menyediakan PHP-FPM listener di port `9000` (dalam container)        |
| `nginx`        | Web server yang mengarahkan request `.php` ke `app:9000`             |
| `fastcgi_pass` | Mengarahkan ke service Docker berdasarkan nama service (`app`)       |
| Host           | Hanya akses ke `localhost:8000` → di-mapping ke `nginx:80`           |
| Keamanan       | PHP-FPM **tidak diekspose ke host**, hanya ke Nginx via internal net |
