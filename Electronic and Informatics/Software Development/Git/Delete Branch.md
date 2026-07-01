# Delete Branch

Deleting branch, penting untuk membuat branch konsisten, rapi dan terjaga. Biasa dilakukan apabila suatu `branch develop` sudah digabung dengan `branch utama`.

```bash
git branch --delete rc1/1.0.0 rc2/1.0.0 rc3/1.0.0
git push origin --delete rc1/1.0.0 rc2/1.0.0 rc3/1.0.0
```
