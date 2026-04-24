# Penjelasan

Memungkinkan jika ada skenario sebuah komponen punya child, dan di kedua komponen tersebut memiliki useEffect. Lantas callback mana yang akan dieksekusi dahulu?

## Rendering concept

React melakukan rendering seperti pohon dari atas ke bawah (parent-child). Sehingga `callback` dilakukan ketika masing-masing komponen telah di-mount.

Eksekusi rendering dilakukan dari parent ke child, sehingga yang terjadi akan seperti ini ketika child punya `useEffect`:

1. Parent render
2. Child render
3. Child effect
4. Parent effect

Hal ini dikarenakan parent render akan sepenuhnya selesai ketika childnya dirender terlebih dahulu.
