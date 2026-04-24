# Stash

Usefull to store modification when you need to:

- change branch
- pull from origin

because, such actions will perform merging and if it contains a file that is being modificate, it will cause a conflict.

Some actions related to stashing:

- `git stash list`, list available stash information
- `git stash pop stash@{index}`, pop (apply and remove from stash list) specified index, pop first index not provided
- `git stash drop stash@{index}`, remove specified stash index, drop all if index not provided
- `git stash`, perform stash to staged modifications
- `git stash apply stash@{index}`, apply specified stash, apply first index if not provided
