# Nginx

Berfungsi sebagai `proxy` atau gerbang sebelum request memasuki server. Nginx akan memetakan request ini harus ke port internal mana. Bisa juga seabagai `load balancer`

## Config

Nginx memiliki file configurasi yang terletak pada `/etc/nginx/nginx.conf` selain itu terdapat beberapa file lainnya:

- `nginx.conf`: The primary configuration file that NGINX reads first.
- `conf.d/`: Used for modular configuration files. `Any file here ending in .conf` is usually automatically included in the main config.
- `sites-available/`: (Mainly on Debian/Ubuntu) Stores individual `server block` files for different websites.
- `sites-enabled/`: (Mainly on Debian/Ubuntu) Contains symbolic links to files in `sites-available`. Only sites linked here are actually active.

```conf
server {
  server_name a.com;
  listen 80;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php$ {
    fastcgi_pass 127.0.0.1:9001;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
  }
}
```

### Listen

By default, pendefinisian obj server akan listen ke `80`, oleh karena itu contoh diatas hanya mendefinisikan dns saja.

### Server Name

```conf
server_name app.com www.app.com; bisa multiple
server_name *.app.com; bisa juga wildcard 
```

### Root

Direktori aktif nginx.

```conf
root /var/www/app/public;
```

### Try Files

nginx mengecek filesystem yang ada di folder yang ditentukan oleh root, ini digunakan untuk webserver yang menyajikan foto dari filesystem, biasanya diletakkan pada folder `public`.

### Protokol

Tergantung pada web server

- `fastcgi_pass` Dipakai untuk komunikasi pakai protokol FastCGI:
  - Node.js app
  - Express.js
  - Laravel Octane
  - Gunicorn
  - frontend dev server
- `proxy_pass` Dipakai kalau backend kamu adalah HTTP server, biasanya `php-fpm`

Kalau kita bicara server yang menjalankan beberapa project Laravel/PHP, biasanya ada 3 pola utama seperti yang kamu sebut.

## Arsitektur dan Konfigurasi Projek

### 1. Satu Nginx di host (sering paling practical)

Arsitektur:

```text
Host Nginx
   ├── project-a php-fpm container
   ├── project-b php-fpm container
   └── project-c php-fpm container
```

Nginx host jadi reverse proxy.

Contoh:

```nginx
server {
    server_name a.com;

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9001;
    }
}

server {
    server_name b.com;

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9002;
    }
}
```

Kamu SSH, buka:

```bash
/etc/nginx/sites-enabled
```

#### Kelebihan

- Operationally simpel.
- SSL, logging, rate limiting, redirect, compression semua terpusat.
- Kalau pakai Certbot juga gampang.
- Satu tempat untuk:

  - TLS
  - domain routing
  - security headers

Kalau cuma 3–10 project di satu VPS, ini sering paling waras.

#### Kekurangan

- Coupling.
- Kalau ubah config nginx host: bisa impact semua project.
- Deploy config harus hati-hati, server config jadi shared concern.

## 2. Nginx hostless (proxy container global)

Ini favorit banyak setup modern.

Arsitektur:

```text
Traefik / Nginx Proxy container
   ↓
project containers
```

Semua nginx juga containerized.

Misalnya pakai:

- Traefik
- Nginx Proxy Manager

Setiap project expose metadata via labels.

Contoh:

```yaml
labels:
  - "traefik.http.routers.app.rule=Host(`app.com`)"
```

Proxy auto route.

Ini enak kalau:

- banyak project
- sering deploy
- full Docker workflow

## test

langsung jelas.

Buat solo dev ini underrated.

## Kalau banyak project / CI-CD / infra lebih serius

Saya pilih:

global reverse proxy container

- per-project app stack

Biasanya pakai Traefik.

Lebih scalable.
