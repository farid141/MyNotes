# Penjelasan

`docker compose` adalah orchestration tool untuk mendefinisikan dan menjalankan **multi-container application** menggunakan file deklaratif `compose.yaml`.

Compose bekerja sebagai **client-side orchestrator** yang:

* Membaca file YAML
* Membuat resource Docker yang dibutuhkan
* Mengelola lifecycle service

Dalam file `compose.yaml`, terdapat beberapa object utama:

| Object     | Direalisasikan menjadi | Scope       |
| ---------- | ---------------------- | ----------- |
| `services` | Container              | Per project |
| `networks` | Docker network         | Per project |
| `volumes`  | Docker volume          | Per project |
| `configs`  | Config object          | Swarm-only  |
| `secrets`  | Secret object          | Swarm-only  |

Untuk penggunaan standar (non-swarm), yang dominan adalah:

* **services**
* **networks**
* **volumes**

## Perilaku `docker compose up`

Berikut penjelasan **perilaku `docker compose` dan objek-objek di dalamnya saat dioperasikan**, dari perspektif arsitektur dan lifecycle container.

Dengan flag:

```bash
--build # Build image, jika di service terdapat "build: " di compose
--force-recreate
-d
```

Selain itu, kita bisa menjalankan `service tertentu`, instead of menjalankan semua sekaligus dalam 1 command. Tambahkan `nama service` tersebut diakhir command.

### Perilaku Saat `docker compose up`

Misal menjalankan:

```bash
docker compose up
```

Berikut urutan perilakunya:

#### (1) Parsing & Validasi

Compose:

* Membaca `compose.yaml`
* Resolve variable environment
* Validasi schema
* Menentukan project name (default: nama folder)

Project name penting karena menjadi `prefix` sebelum `resource/object`:

```bash
[myapp]_web_1
[myapp]_db_1
[myapp]_default
```

#### (2) Network Creation

Jika tidak didefinisikan, Compose otomatis membuat:

```bash
<project>_default
```

Semua service dalam compose `otomatis` join ke network ini.

Perilaku penting:

* Network dibuat sekali
* Service bisa resolve nama service lain sebagai DNS hostname

  * `web` bisa akses `db:5432`, karena nama service database adalah `db`

#### (3) Volume Creation

Untuk volume yang dideklarasikan:

```yaml
volumes:
  db_data:
```

Compose akan:

* Membuat named volume `<project>_db_data`
* Volume persisten walau container dihapus

Perilaku:

* Tidak dihapus saat `down` (kecuali pakai `-v`)
* Lifecycle independen dari container

#### (4) Container Creation (Per Service)

Untuk setiap service:

```yaml
services:
  web:
    image: nginx
```

Compose akan:

1. Pull image (jika belum ada)
2. Create container
3. Attach ke network
4. Attach volume
5. Inject environment variable
6. Apply resource limit (jika ada)
7. Start container

Nama container:

```bash
<project>_<service>_<replica_index>

Contoh:
myapp_web_1
```

##### Depends On

* Hanya mengatur urutan start
* Tidak menunggu service readiness, perlu `healthcheck`

```yml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    # Define how to check the database health
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  web:
    image: my-web-app:latest
    ports:
      - "8080:8080"
    # Delay startup until db reports a healthy status
    depends_on:
      db:
        condition: service_healthy
```

Secara default, healtchcheck hanya dapat di satu compose, tapi jika ingin berdasarkan service lain, dapat menjalankan custom script pada container

```yaml
entrypoint: >
     sh -c "
     until curl -s http://api-compose-a:8080/health; do
     echo 'Menunggu API Compose-A siap...';
     sleep 3;
     done;
     exec npm start"
```

## `docker compose stop`

* Stop container
* Network & volume tetap ada

## `docker compose down`

* Stop container
* Remove container
* Remove network
* Volume tetap ada (kecuali `-v`)

## `docker compose down -v`

* Hapus container
* Hapus network
* Hapus named volume

## `docker compose restart`

* Restart container tanpa recreate

## Recreate Behavior (Penting)

Container akan `otomatis` direcreate jika:

* Image berubah
* Build context berubah
* Environment berubah
* Volume mount berubah
* Network config berubah

Compose menghitung **config hash** untuk menentukan perlu recreate atau tidak.

## Scaling Behavior

```bash
docker compose up --scale web=3
```

Perilaku:

* Membuat multiple container:

```bash
myapp_web_1
myapp_web_2
myapp_web_3
```

* Semua join network yang sama
* DNS internal melakukan round-robin

## Network Behavior Internally & Ports

Compose menggunakan **bridge driver** (default).

Karakteristik:

* Isolated antar project
* Internal DNS resolver
* Container bisa komunikasi pakai nama service
* Tidak expose ke host kecuali pakai `ports`

```yml
ports:
     - "41521:1521"
```

## Dependency Graph Execution

Compose membangun dependency graph berdasarkan:

* depends_on
* network
* volume dependency

Eksekusi:

1. Buat network
2. Buat volume
3. Start service tanpa dependency
4. Start service dengan dependency

## Compose sebagai Project Boundary

Semua resource:

* container
* network
* volume

Dikelompokkan berdasarkan **project name**.

Ini memungkinkan:

* Multi environment (dev, staging, prod)
* Isolasi resource
* Tidak konflik antar project

## Apa yang TIDAK Dilakukan Docker Compose

Compose bukan:

* Distributed orchestrator
* Auto-healing system
* Production-grade scheduler seperti Kubernetes
* Tidak ada cluster state management

Compose hanya mengontrol Docker Engine lokal.

## Ringkasan Arsitektural

Saat `docker compose up` dijalankan:

```bash
compose.yaml
     ↓
Parse & Resolve
     ↓
Create Network
     ↓
Create Volume
     ↓
Build Image (optional)
     ↓
Create Container
     ↓
Attach Network & Volume
     ↓
Start Container
```
