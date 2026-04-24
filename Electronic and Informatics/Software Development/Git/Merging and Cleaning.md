# Merging and Cleaning

Beberapa jenis merge dan merapikan branch

## Merging

### Merge Biasa

- Semua commit dari branch asal ikut dibawa ke branch target (develop atau main).
- Git menambahkan 1 commit baru bertipe merge commit.

```bash
*   [d5e6f7] Merge branch 'develop'
|\
| * [a1b2c3] add login page
| * [b2c3d4] add API call
| * [c3d4e5] fix validation bug
|/
* [previous commit in main]
```

### Squash

`git merge --squash feature/login-system`

- Semua perubahan dari feature branch digabung jadi satu commit baru saja.
- Commit individu di branch feature tidak muncul di branch target.

### Rebase Sebelum Merge

```bash
git checkout develop
git pull
git rebase main
git merge feature/login-system
```

- Branch main: A — B — C
- Feature branch: D — E — F (berdasarkan B)

Jika kamu rebase feature ke main (yang sudah maju ke C), hasilnya:
feature (setelah rebase): D' — E' — F' (commit baru dengan parent C)
Commit D', E', F' terlihat seperti dibuat langsung di atas C — riwayat jadi linear.

## Cleaning

cek apakah ada branch yang sudah dimerge `git branch --merged`. Hapus jika ada.
