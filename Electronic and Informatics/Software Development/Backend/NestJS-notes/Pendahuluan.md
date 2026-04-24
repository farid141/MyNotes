# Penjelasan

NestJS adalah framework yang menggunakan NoodeJS sebagai server-side application. Memiliki dukungan TS (tetapi bisa juga JS).

Di balik layar, Nest JS menggunakan HTTP server framework Express (default) dan bisa dikonfigurasi menggunakan fastify.

## Instalasi

Dapat dilakukan dengan menggunakan: 
- Nest CLI
    ```bash
    $ npm i -g @nestjs/cli
    $ nest new project-name
    <!-- untuk versi yang lebih strict tambahkan flag --strict -->
    ```
- clone starter project
    ```bash
    <!-- TS version -->
    $ git clone https://github.com/nestjs/typescript-starter.git project
    <!-- atau js -->
    $ git clone https://github.com/nestjs/typescript-starter.git project
    $ cd project
    $ npm install
    $ npm run start
    ```
- from scratch
    https://dev.to/micalevisk/5-steps-to-create-a-bare-minimum-nestjs-app-from-scratch-5c3b

