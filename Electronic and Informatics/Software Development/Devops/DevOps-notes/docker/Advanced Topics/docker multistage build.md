# Penjelasan

Penggunaan multi-stage builds dalam Docker dapat mengoptimalkan penggunaan cache dan ukuran image dengan cara memisahkan tahap build dan environment runtime. Mari kita bahas lebih detail:

1. **Pemanfaatan Cache dengan Layer yang Optimal**:
   - Dalam multi-stage builds, tahap pertama (builder stage) digunakan untuk menjalankan semua proses build, termasuk instalasi dependencies dengan Composer.
   - Docker memanfaatkan cache untuk setiap layer. Jika Dockerfile diatur dengan baik, layer yang tidak berubah dapat digunakan ulang, sehingga tidak perlu di-build ulang setiap kali.

2. **Ukuran Image yang Lebih Kecil**:
   - Tahap builder mencakup semua dependencies dan file build yang diperlukan untuk membangun aplikasi.
   - Setelah proses build selesai, hanya file yang benar-benar dibutuhkan untuk runtime yang akan disalin ke tahap akhir (runtime stage).
   - Ini berarti file dan dependencies yang hanya diperlukan untuk build tidak disertakan dalam image akhir, yang mengurangi ukuran image.

3. **Pemisahan Lingkungan Build dan Runtime**:
   - Pada builder stage, Anda menggunakan image yang memiliki semua alat build yang diperlukan (misalnya, Composer, npm, build-essential).
   - Pada tahap runtime, Anda menggunakan image yang ringan (misalnya, PHP-FPM atau Nginx) tanpa alat build seperti Composer, yang mengurangi kompleksitas dan ukuran image.

Berikut contoh Dockerfile untuk proyek Laravel yang menggunakan multi-stage builds:

```dockerfile
# Stage 1: Build environment
FROM composer:latest AS builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --prefer-dist

# Copy entire project for building
COPY . .

# Run any build scripts if necessary (for example, to build assets)
RUN php artisan config:cache
RUN php artisan route:cache

# Stage 2: Production environment
FROM php:8.0-fpm
WORKDIR /var/www
COPY --from=builder /app /var/www
COPY . .
RUN chown -R www-data:www-data /var/www

# Set the entry point for the Docker container
CMD ["php-fpm"]
```

Pada Dockerfile di atas:

- **Builder Stage**: Menggunakan image `composer:latest` untuk menginstal semua dependencies Laravel. Semua proses build, seperti caching konfigurasi dan routing Laravel, dilakukan di sini.
- **Production Stage**: Menggunakan image yang lebih ringan `php:8.0-fpm`. Hanya file yang dibutuhkan untuk menjalankan aplikasi disalin dari builder stage ke sini. Composer tidak lagi diperlukan di environment runtime, sehingga image lebih ringan dan lebih cepat.

Dengan pendekatan ini, Anda mendapatkan image yang lebih kecil dan penggunaan cache yang lebih efektif, yang mengoptimalkan waktu build dan penggunaan storage. 📦🚀

## Manafaat Deployment

Dengan ini, space yang digunakan pada VPS kita akan kecil. Karena tidak menyimpan `node`. Melainkan langsung pull hasil `image` dari dockerfile tersebut di `registry`.
