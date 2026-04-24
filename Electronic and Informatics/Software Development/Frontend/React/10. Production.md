# Production

File react akan dibuild menjadi file statis (index, style dan js) setelah dibuild.

## Menjalankan Hasil build

Untuk bisa menjalankan hasil build react, diperlukan HTTP server seperti NGINX, Traefik, dll.

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/react-app/dist;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
```

### Serve (js)

```bash
npm install -g serve  # installing tools
serve -s build_dir         # running http server
```

## Env

ENV apapun di FE akan 100% terekespose ke client dalam script JS. Agar env dapat digunakan di seluruh program, bikin dalam `non-primitive` type dan `salin ke const`.

Ada 2 cara dalam mendapatkan env

1. build time process.env akan mencari nilai
2. setelah build, melihat file js dan pastikan program utama import file ini.

### Load Runtime

ENV diload Pada `saat start container` (bukan saat build), Anda menghasilkan file `env.js` yang berisi konfigurasi dari environment variable container.

#### 1. Tambahkan script loader di `public/index.html`

```html
<script src="%PUBLIC_URL%/env.js"></script>
```

#### 2. Buat file template `env.js` (misalnya `public/env.template.js`)

```js
window._env_ = {
  REACT_APP_API_URL: "$REACT_APP_API_URL",
  REACT_APP_ENV: "$REACT_APP_ENV"
};
```

#### 3. Buat Dockerfile

Dalam dockerfile berikut, setiap saat container dijalankan, maka akan menjalankan script `docker-entrypoint.sh`

```dockerfile
# BUILDER CONTAINER
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# RUNTIME CONTAINER
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY env.template.js /usr/share/nginx/html/env.template.js
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

##### docker-entrypoint.sh

```sh
#!/bin/sh

echo "Generating env.js from environment variables..."
envsubst < /usr/share/nginx/html/env.template.js \
  > /usr/share/nginx/html/env.js

exec "$@"
```

`envsubst` adalah tool untuk melakukan **variable substitution** (penggantian string) berdasarkan environment variable yang aktif dalam shell.

### Penjelasan syntax

* `< /usr/share/nginx/html/env.template.js`
  Mengambil file input template.
  Template ini berisi placeholder seperti `$REACT_APP_API_URL`.

* `envsubst`
  Memproses placeholder dan menggantinya dengan nilai variabel environment yang ada.

* `> /usr/share/nginx/html/env.js`
  Output dari `envsubst` disimpan ke file baru:
  **env.js**, yang nantinya di-load browser sebelum React bundle dijalankan.

Perintah **exec** menggantikan proses shell dengan proses command yang diberikan di parameter container.

Biasanya `$@` diisi oleh CMD pada Dockerfile:

Mengapa menggunakan `exec "$@"`?

* Agar argument selanjutnya `setelah command script` dianggap `command`.
* Agar container PID 1 adalah Nginx, bukan ./.
* Nginx mendapatkan sinyal langsung (SIGTERM, SIGINT) untuk shutdown yang benar.
* Praktik terbaik dalam Docker.

### 4. Berikan ENV saat Start Container

```sh
docker run -e REACT_APP_API_URL=https://api.prod.com -p 80:80 app-react
```

* Dapat mengubah environment runtime tanpa rebuild.
* Cocok untuk Docker + Nginx.
