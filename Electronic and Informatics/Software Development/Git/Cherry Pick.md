# Cherry Pick

Merupakan sebuah cara untuk mengambil beberapa commit dari `branch A` ke `branch B` tanpa merge secara langsung.

Gunakan git cherry-pick untuk mengambil 3 commit spesifik dari branch A ke B tanpa membawa commit lain. Cara ini memungkinkan Anda memilih commit secara individual atau rentang (range) commit tertentu dan menerapkannya di branch B.
Berikut adalah langkah-langkahnya:

1. Temukan Hash Commit: Buka branch A dan cari SHA-1 hash dari 3 commit yang diinginkan menggunakan git log.
2. Pindah ke Branch B: git checkout branch-B.
3. Cherry-pick Commit:

    ```bash
    # Jika berurutan (misal: commit1, commit2, commit3):
    git cherry-pick <hash-commit-terlama>..<hash-commit-terbaru>
    # Jika tidak berurutan:
    git cherry-pick <hash1> <hash2> <hash3>
    ```

4. Selesaikan Konflik (Jika Ada): Jika terjadi konflik, selesaikan, lalu  jalankan git cherry-pick --continue.

## Alternatif

Jika ingin menggabungkan 3 commit tersebut menjadi 1 commit baru di branch B, gunakan:

```bash
git checkout branch-B
git merge --squash branch-A
# (Lalu pilih 3 commit tersebut saat disuruh/dilakukan rebase interaktif).
```
