# Rendering Source

Dalam FE rendering dapat dilakukan dengan 2 cara berdasarkan tempat rendernya. Masing-masing memiliki kelemahan dan kelebihan:

## Client-Side-Rendering (CSR)

Kelebihan

- sangat cepat (meningkatkan UI/UX), karena pengambilan asset static dari server hanya sekali.
- Untuk deployment, server hanya membutuhkan NGINX untuk serve static file

Kekurangan

- Kurang aman karena komunikasi server/client bisa dilihat di browser inspect element

## Server-Side-Rendering (SSR)

Kekurangan

- Lebih lambat karena pemrosesan dilakukan di server dan tiap request mengembalikan full page response.
- Berat di server karena membutuhkan NodeJS/PHP untuk rendering.

Kelebihan

- Lebih aman, user tidak bisa melihat komunikasi server-client

## Hybrid Source rendering

Kita bisa menerapkan keduanya dalam implementasi atau yang disebut hybrid rendering. Dengan NGINX, akan memeriksa source request:

- user asli: CSR
- search engine crawling: SSR
