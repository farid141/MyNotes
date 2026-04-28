# Git inside Git

Saya pernah ingin merapikan catatan saya yang disimpan dalam repository2 berbeda ke dalam 1 repo.

Ketika suatu folder tersebut dipindahkan dalam repo lain, ternyata git tidak mengindex file2 dalam folder tersebut dan menggunakan referensi. Dalam yang saya baca, ini disebut `ref link` atau `submodule`.

Karena sebelumnya sudah terlanjur bikin commit, maka saya melakukan penghapusan folder `.git` dalam tiap repo, agar file2 didalamnya terindex. Namun, harus melakukan `clear cache`. Ini dikarenakan, git menggunakan sistem cache untuk menandai file yang termodifikasi. Karena dari commit sebelumnya file2 tidak terindeks, maka kita harus membuat 1 commit yang menghapus folder `.git`, kemudian melanjutkan buat commit baru yang berisi file2 terindex.

`git rm --cached React`

## Submodule

Atau mungkin kita ingin pendekatan lainnya, yaitu membuat `submodule`. Untuk melakukan hal ini, kita harus menjalankan command

`git submodule add <url-repo> React`

Perintah tersebut akan membuat `Github` atau git provider lainnya memiliki link referensi sehingga bisa redirect ketika folder tersebut diklik.
