Ketika menjalankan proyek Poetry, **interpreter Python yang digunakan adalah interpreter yang ada di dalam virtual environment Poetry**, bukan interpreter global sistem — *kecuali Anda memaksa menggunakan yang lain*.

Berikut penjelasannya secara jelas dan sistematis.

---

# 1. Poetry Selalu Membuat Virtual Environment Sendiri

Saat Anda menjalankan:

```
poetry install
```

Poetry akan:

1. memilih interpreter Python yang Anda tentukan (atau otomatis mengambil default Python yang tersedia),
2. membuat virtual environment (venv),
3. menyimpan venv tersebut untuk proyek itu.

Lokasi venv bisa dicek dengan:

```
poetry env info
```

---

# 2. Bagaimana Poetry memilih interpreter?

Poetry memilih interpreter berdasarkan prioritas berikut:

### **(A) Interpreter yang Anda tentukan manual**

Jika Anda melakukan:

```
poetry env use C:\path\to\python.exe
```

Maka interpreter itu akan disimpan sebagai default interpreter proyek tersebut.

Ini adalah cara paling kontrolable.

---

### **(B) Interpreter global default sistem**

Jika Anda tidak menentukan apa pun, Poetry akan memakai:

* python3.10, lalu python3.11, lalu python3.12, dst.
* mana yang ditemukan pertama dalam PATH.

Urutannya:
Poetry akan mencari interpreter paling mendekati versi yang tercantum (jika ada) di `pyproject.toml`.

Contoh:

```toml
[tool.poetry.dependencies]
python = "^3.10"
```

Berarti:

* Poetry akan cari Python 3.10
* Jika tidak ada → 3.11
* Jika tidak ada → 3.12
* Jika tidak ada → gagal membuat venv

---

# 3. Bagaimana memilih interpreter/env ketika run proyek?

### **Run menggunakan Poetry**

```
poetry run python main.py
```

Maka:

* interpreter yang dipakai = interpreter dari venv Poetry
* environment = venv pada proyek itu

### **Run menggunakan VSCode**

VSCode sering menampilkan banyak interpreter.
Agar VSCode memakai env Poetry:

1. Jalankan:

   ```
   poetry env info --path
   ```

   contoh output:

   ```
   C:\Users\farid\AppData\Local\pypoetry\Cache\virtualenvs\myproj-3je4
   ```

2. Di VSCode → Command Palette →
   “Python: Select Interpreter” → pilih path tersebut.

Jika tidak, VSCode mungkin memakai interpreter sistem, bukan env Poetry.

---

# 4. Apakah kita bisa ganti interpreter Python setelah proyek dibuat?

Ya.

```
poetry env remove python
poetry env use C:\path\to\python3.12.exe
poetry install
```

Poetry akan membuat ulang virtual environment dengan interpreter baru.

---

# 5. Ringkasannya

| Ketika menjalankan proyek                   | Interpreter yang dipakai  |
| ------------------------------------------- | ------------------------- |
| `poetry run ...`                            | Interpreter venv Poetry   |
| VSCode + Poetry venv dipilih                | Interpreter venv Poetry   |
| Menjalankan python biasa (`python main.py`) | Interpreter global sistem |

---

Jika Anda ingin, saya bisa:

* mengecek interpreter yang aktif di proyek Anda sekarang
* mengatur Python version yang benar untuk proyek Anda
* membuat VSCode otomatis memakai poetry environment

Cukup beri output `poetry env info`.
Secara prinsip, **ya** — untuk membuat sebuah proyek Python berbasis Poetry, file **minimum** yang wajib ada hanyalah:

### **`pyproject.toml`**

Karena:

1. `pyproject.toml` adalah tempat Poetry menyimpan seluruh metadata proyek.
2. File ini menentukan dependencies, konfigurasi build, dan informasi project.
3. Poetry akan otomatis membuat folder, mengelola virtualenv, dan menginstal dependencies berdasarkan file ini.

Dengan kata lain:
Tanpa `pyproject.toml`, Poetry **tidak dianggap** bahwa Anda sedang berada dalam sebuah proyek.

---

## Apa saja yang otomatis dibuat *seandainya* cuma bikin `pyproject.toml`?

Jika Anda menjalankan:

```
poetry new myproject
```

Poetry otomatis membuat:

* `pyproject.toml` (wajib)
* `README.md` (opsional)
* package folder (`myproject/`)
* file tests

Tetapi yang benar-benar **esensial** adalah cuma `pyproject.toml`.

---

## Yang optional (tapi sangat umum ada)

File berikut **bukan syarat wajib**, tetapi lazim ada dalam proyek profesional:

* `.gitignore`
* `poetry.lock` (otomatis dibuat setelah `poetry install`)
* `.env` / `.env.example`
* `README.md`
* CI/CD config
* pre-commit hook config

Anda bisa membangun dan menjalankan proyek Poetry **tanpa** semua itu.

---

## Ringkasan

| File             | Wajib?                            | Penjelasan                           |
| ---------------- | --------------------------------- | ------------------------------------ |
| `pyproject.toml` | **Wajib**                         | Identitas dan konfigurasi proyek.    |
| `poetry.lock`    | Tidak wajib, tapi dibuat otomatis | Menjamin versi dependency konsisten. |
| File lain        | Tidak wajib                       | Hanya menunjang workflow.            |

---

Jika Anda mau, saya bisa buatkan contoh **pyproject.toml minimal** untuk proyek Anda, misalnya untuk FastAPI, Flask, Django, atau script Python biasa.
