# Rollback

1. remove modifications in current changes: `git checkout filename`
2. remove modifications in staging area: `git restore --staged filename`
3. cancel commit and create new commit (previous commit still exist): `git revert HEAD|commitID`
4. delete until specified commit and keep commit modification: `git reset --soft HEAD~1`
5. remove modifications in commit (also clear history): `git reset --hard HEAD|commitID`

## usefull commands

- melihat semua perubahan code saat ini: git diff, tambahkan --cached untuk melihat perubahan di staged
- melihat list perubahan file: git status
- melihat log: git log --all --one-line --graph
- komparasi perubahan commit(sha1 vs sha2): git diff sha1..sha2

## Commit reference

| Istilah       | Arti                                                                  |
| ------------- | --------------------------------------------------------------------- |
| `HEAD`        | Commit aktif saat ini                                                 |
| `HEAD~1`      | Commit sebelum `HEAD` (bisa dikombinasikan lebih jauh: `HEAD~2`, dll) |
| `commitID`    | Hash unik dari commit tertentu                                        |
| `origin/main` | Referensi ke branch `main` di remote `origin`                         |

## Login ssh key

1. rm -rf .ssh/*
2. ssh-keygen.exe # akan terbuat folder .ssh/ berisi id_rsa(private) dan id_rsa.pub(public)
3. copy public key ke github->profile->ssh and gpg key-> new ssh key

## Cancel Merge Conflict

> git merge --abort
