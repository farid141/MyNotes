# n8n

kalau pakai API chatGPT berbayar. Apakah ada solusi lain? mungkin install LLM locally?

satu projek bisa banyak workflow

satu workflow diawali dengan trigger

## Block

Dasar sebuah satuan proses, tiap block memiliki tampilan berupa 3 bagian:

- kiri: input
- tengah: konfigurasi
- kanan: output

### Form

Untuk menguji form submit, agar tidak perlu submit manually, kita dapat menggunakan pin data

Setup GoogleSheet for N8N:

- Credential, bisa login Oauth, (bagaimana dengan local?)
- N8N otomatis menampilkan dropdown file mana yang mau diakses
- Field bisa berupa fixed(hard code) atau expression(by dynamic input ex. input/current date)
text dalam double curly braces dianggap sebagai javascript expression
{{}}

Gmail juga ternyata tidak perlu API, hanya login Oauth
