# Debugging

1. `Browser inspect element 'debugger'`, bisa di semua code js frontend:
    - dapat memberikan breakpoint
    - ketika sebuah variable dihover, bisa memperlihatkan nilainya
2. `Komponen wrapper StrictMode`, akan mengeksekusi komponen dua kali
3. `React devtools browser extension`, akan ditambahkan pada inspect element:
    - sama seperti vue, bisa melihat komponen, props, hooks dll
    - melihat urutan rendering dan penyebab rendering

## VScode

Kita bisa debugging di code editor

1. Jalankan development server
2. Pada bagian `run and debugg`, create a `launch.json` file
3. Jalankan debugger (F5)

<https://www.youtube.com/watch?v=FOXNlZFkbPk>

Beberapa fitur yang bisa dilakukan:

- Breakpoint (bisa disable sementara, bisa klik pensil untuk hanya dijalankan ketika kondisi memenuhi)
- Variables (bisa diedit)
- Watch (evaluasi nilai variable yang kita pilih, `bisa berupa expression juga`)
- Call Stack (stack2 pemanggil fungsi hingga sampai di titik sekarang)

### Ekstensi

Sangat disarankan agar kita bisa pake react-devtools juga untuk debugging statenya.

Tetapi ketika kita jalanin dengan mode launch, maka extensi akan disabled otomatis. Untuk itu, kita ganti mode

```json
{
    "type": "chrome",
    "request": "attach",
    "name": "Attach to Chrome",
    "port": 9222,
    "webRoot": "${workspaceFolder}",
    "url": "http://localhost:8000"
}
```

Jalankan mode debugging chrome

`"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="C:\temp\chrome-debug"`

Atau agar lebih mudah buat script bash untuk command tersebut
