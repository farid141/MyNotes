# Penjelasan

Windows adalah OS berbasis GUI yang pada umumnya digunakan pada PC dengan GUI, kita dimudahkan dengan simbol yang membuat pengoperasian lebih nyaman. Pada OS linux biasanya dioperasikan dengan terminal yang memiliiki banyak command yang berguna untuk:

- melakukan suatu hal dengan cepat.
- menghemat `RAM dan meningkatkan performa server`.
- memberikan `kontrol yang lebih advance dan luas` lagi untuk meningkatkan efisiensi kita.

## Contoh script untuk time-consuming Task

- ```for i in {1..50}; do touch "index$i.html"; done;```
- selector file dengan regex/pattern name

## Bash Scripting

Merupakan scripting OS secara langsung, dimana perintah pada terminal bash dapat digunakan dalam script.

## Available Command

Ketika kita mengeksekusi perintah, maka akan merujuk pada folder di `/bin/...`
pada direktori tersebut berisi folder yang merupakan perintah dapat kita jalankan.

## Command Permission

Kita dapat menentukan permission sebuah file (user atau aksi user dalam mengoperasikan file):

```bash
$ ls -l /bin/gzip
-rwxr-xr-x 1 root root 98240 oct 27  2014 /bin/gzip
```
