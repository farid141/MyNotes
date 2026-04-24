Populer Backend Protocols

Application layer protocols:
- HTTP/HTTPS
- Websockets
sebuah protokol yang diawali dengan handshake kemudian komunikasi terjadi hanya saat ada perubahan.
lebih efisien daripada HTTP-Polling dimana setiap proses tidak ada handshake dan hanya terjadi ketika ada update data
- gRPC: high performance RPC invented by google, client/server haru support http v2, biasanya antar server dalam microservices
- AMQP: bukannya riskan karena tidak menggunakan code, melainkan aplikasi langsung sehingga tidak ada proses staging dll

informasi HTTP:
content-type
cache-control