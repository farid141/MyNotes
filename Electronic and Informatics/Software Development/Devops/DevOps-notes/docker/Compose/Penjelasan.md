# Penjelasan

docker compose digunakan untuk mengatur beberapa service (container), network, volumes, dll. yang ditulis dalam script `compose.yml`.

## Networks

Dalam satu file compose, jika tidak didefinisikan networks, maka secara default semua service akan berada dalam satu networks bernama [project]_default.

## Perilaku `docker compose up`

Berikut penjelasan **perilaku `docker compose` dan objek-objek di dalamnya saat dioperasikan**, dari perspektif arsitektur dan lifecycle container.

---

# 1️⃣ Apa itu Docker Compose?

`docker compose` adalah orchestration tool untuk mendefinisikan dan menjalankan **multi-container application** menggunakan file deklaratif `compose.yaml`.

Compose bekerja sebagai **client-side orchestrator** yang:

* Membaca file YAML
* Membuat resource Docker yang dibutuhkan
* Mengelola lifecycle service

---

# 2️⃣ Objek Utama dalam Docker Compose

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

---

# 3️⃣ Perilaku Saat `docker compose up`

Misal menjalankan:

```bash
docker compose up
```

Berikut urutan perilakunya:

## (1) Parsing & Validasi

Compose:

* Membaca `compose.yaml`
* Resolve variable environment
* Validasi schema
* Menentukan project name (default: nama folder)

Project name penting karena menjadi prefix resource:

```
myapp_web_1
myapp_db_1
myapp_default
```

---

## (2) Network Creation

Jika tidak didefinisikan, Compose otomatis membuat:

```
<project>_default
```

Semua service otomatis join ke network ini.

Perilaku penting:

* Network dibuat sekali
* Service bisa resolve nama service lain sebagai DNS hostname

  * `web` bisa akses `db:5432`

---

## (3) Volume Creation

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

---

## (4) Container Creation (Per Service)

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

```
<project>_<service>_<replica_index>
```

Contoh:

```
myapp_web_1
```

---

# 4️⃣ Perilaku Service

Service adalah blueprint container.

Jika didefinisikan:

```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - db
```

Perilakunya:

### 🔹 build

* Build image sebelum container dibuat

### 🔹 ports

* Host port bind ke container port
* Menggunakan iptables NAT

### 🔹 depends_on

* Hanya mengatur urutan start
* Tidak menunggu service ready
* Untuk readiness perlu healthcheck

---

# 5️⃣ Lifecycle Commands dan Dampaknya

## 🔹 `docker compose up`

* Membuat resource jika belum ada
* Recreate container jika config berubah
* Tidak recreate jika tidak ada perubahan

Dengan flag:

```
--build
--force-recreate
-d
```

---

## 🔹 `docker compose stop`

* Stop container
* Network & volume tetap ada

---

## 🔹 `docker compose down`

* Stop container
* Remove container
* Remove network
* Volume tetap ada (kecuali `-v`)

---

## 🔹 `docker compose down -v`

* Hapus container
* Hapus network
* Hapus named volume

---

## 🔹 `docker compose restart`

* Restart container tanpa recreate

---

# 6️⃣ Recreate Behavior (Penting)

Container akan direcreate jika:

* Image berubah
* Build context berubah
* Environment berubah
* Volume mount berubah
* Network config berubah

Compose menghitung **config hash** untuk menentukan perlu recreate atau tidak.

---

# 7️⃣ Scaling Behavior

```bash
docker compose up --scale web=3
```

Perilaku:

* Membuat multiple container:

```
myapp_web_1
myapp_web_2
myapp_web_3
```

* Semua join network yang sama
* DNS internal melakukan round-robin

---

# 8️⃣ Network Behavior Internally

Compose menggunakan **bridge driver** (default).

Karakteristik:

* Isolated antar project
* Internal DNS resolver
* Container bisa komunikasi pakai nama service
* Tidak expose ke host kecuali pakai `ports`

---

# 9️⃣ Volume Behavior Internally

Ada 3 jenis mount:

### 1️⃣ Named volume

Persistent dan managed Docker.

### 2️⃣ Bind mount

Mount folder host ke container.

### 3️⃣ Anonymous volume

Auto-generated volume tanpa nama.

Perilaku penting:

* Named volume survive container deletion
* Bind mount bergantung pada filesystem host

---

# 🔟 Dependency Graph Execution

Compose membangun dependency graph berdasarkan:

* depends_on
* network
* volume dependency

Eksekusi:

1. Buat network
2. Buat volume
3. Start service tanpa dependency
4. Start service dengan dependency

---

# 1️⃣1️⃣ Compose sebagai Project Boundary

Semua resource:

* container
* network
* volume

Dikelompokkan berdasarkan **project name**.

Ini memungkinkan:

* Multi environment (dev, staging, prod)
* Isolasi resource
* Tidak konflik antar project

---

# 1️⃣2️⃣ Apa yang TIDAK Dilakukan Docker Compose

Compose bukan:

* Distributed orchestrator
* Auto-healing system
* Production-grade scheduler seperti Kubernetes
* Tidak ada cluster state management

Compose hanya mengontrol Docker Engine lokal.

---

# 1️⃣3️⃣ Ringkasan Arsitektural

Saat `docker compose up` dijalankan:

```
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

Semua resource:

* Scoped by project
* Idempotent
* Declarative-driven

---

Jika kamu mau, saya bisa lanjutkan dengan:

* 🔬 Penjelasan internal networking (iptables & bridge)
* 🧠 Bagaimana Compose menghitung config diff
* ⚙️ Best practice production usage
* 📦 Pola arsitektur microservices dengan Compose

Tentukan area mana yang ingin kamu dalami.
