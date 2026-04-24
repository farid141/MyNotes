# Git Flow

Aturan alur kerja Git dengan tim besar.

## Branch Utama

- MASTER `production, diimplement ke end user langsung`
- STAGING `testing, ke QA dan tim internal` (Opsional)
- DEVELOP `gabungan fitur baru` (ditest QA)

`STAGING` dan `DEVELOP` akan dideploy di server staging dengan db tersendiri.

## ada fitur baru

1. buat commit di branch `DEVELOP`
2. push origin sesuai nama branch tersebut
3. maintainer/senior akan merge ke `DEVELOP`
