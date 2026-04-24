# Rename Branch

Mengganti nama branch.

## Rename Branch Lokal (belum di-push ke remote)

Jika kamu **belum push** branch tersebut, cukup lakukan:

```bash
git branch -m nama_lama nama_baru
```

## Rename Branch yang Sudah di-Push ke Remote

```bash
git branch -m nama_lama nama_baru # ganti nama local
git push origin --delete nama_lama # Hapus branch di remote
git push origin nama_baru # push branch hasil rename ke remote
git push --set-upstream/-u origin nama_baru # set upstream


git fetch --purne # tim lain akan delete local branch lama yang terhapus di remote
```
