# Generate Zip of Local Repo

Kita bisa membuat file zip dengan tidak menyertakan file yang ada di gitignore

```bash
git archive --format=zip -o ../myrepo-HEAD.zip HEAD
```

Atau agar semua branch ikut tercopy

```bash
git bundle create repo.bundle --all
git clone repo.bundle myrepo
```
