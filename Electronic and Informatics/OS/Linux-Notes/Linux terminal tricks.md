# Linux terminal tricks

1. piping command |
output terminal dari command sebelumnya akan digunakan sebagai input pada command selanjutnya

    ```bash
    ls | grep "asd"
    cat asd.txt | sort | unique
    history | grep "nama command "
    ```

2. menjalankan beberapa comman dalam satu line

    > mkdir test && cd test

    - `;` kedua command dijalankan
    - `&&` command 1 berhasil, dilanjut command 2
    - `||` command 1 gagal, tidak dilanjut command 2

3. mencari file:

    > find -perm -name -type

4. command redirection, secara default output akan ditampilkan di screen, bisa kita arahkan ke sebuah file:

    - `>` overwrite redirection, jika tidak ada file dibuat,
    - `>>` append redirection, jika tidak ada file
    - `<` hasil dari command kanan akan menjadi input command kiri

5. pada file .bashrc di home dapat digunakan untuk menyimpan

    - alias dari sebuah command
    - alias newcommand='command'
    - alias sysboost='sudo apt update && sudo apt upgrade -y && sudo apt autoclean'

    beberapa saran alias:
    <https://www.redhat.com/sysadmin/how-create-alias-linux>

6. iterm2 dapat menjalankan sudo dengan fingerprint daripada menggunakan password

7. jika sebuah command gagal karena membutuhkan sudo privilege, dapat mengetikkan
    > sudo !!
