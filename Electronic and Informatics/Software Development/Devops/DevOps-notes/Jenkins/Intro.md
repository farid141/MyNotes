# Jenkins

Merupakan bagian dari CICD yang berjalan di server CI dengan mekanisme `fetch-build-test-notify`. Didalamnya terdapat plugin yang dapat digunakan untuk keperluan: build, testing, cloud (DB dimana kalau testing).

jadi jenkins itu sebuah aplikasi CICD berbasis java?

didalamnya kita dapat membuat langkah2, seperti build, akses local terminal maupun external etc, melalui library maven?

bisa install2 maven

## Requirement

any OS, bisa build di container atau build di OS CI Server 2GB ram. Pastikan untuk buat cloud instance yang mengeluarkan `port 22` dan `port app jenkins`, agar bisa SSH untuk mengakses terminal untuk buat dan setting.

## Instalasi

pastikan menginstall jdk sebelum jenkins karena jika tidak jenkins akan menginstall jdk versi lain

/var/lib/jenkins

1. install
2. masuk ke port 8080 dan unlock password
3. install plugins
4. create first admin user
5. set domain name (terserah ga harus resolve)

## Tools

Merupakan sesuatu yang dapat digunakan untuk build seperti nodejs, maven, dll. Ada 2 cara memasang tools di jenkins:

1. mention path instalasi, biasanya untuk linux ada di /usr/lib
2. install tools via jenkins

default version mean using tools inthe  system

## Plugins

plugins masuk ke menu manage jenkins, bisa install dari available plugins atau custom (bikin sendiri)

## Jobs

jobs in jenkins:

- freestyle jobs (graphical), untuk explorasi dan belajar saja (sama aja bisa input build step)
- pipleline as a code dalam groovy

### Workspace

bagian workspace pada jobs akan muncul jika hanya dalam jobs ada aksi yang menambah file di path eksekusi, sebenarnya kita bisa menjalankan/start jobs lewat terminal

artifact adalah sebuah file yang disimpan setelah build, berbeda dengan workspace

### Build

Proses build dapat di lakukan di jenkins server (container based or not) atau server lain yang disebut agents

#### Versioning

pada script build kita bisa menambahkan versioning untuk artifact atau hasil build. Terdapat beberapa cara untuk mengisi versioning:

- environment variable BUILD_ID
- paramtererized (input versi ketika build) centang "this project is parameterized" pada build config
- build timestamp plugin (format bisa setting di manage jenkins->system)
