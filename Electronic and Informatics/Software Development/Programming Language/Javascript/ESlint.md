# ESLint

kita bisa menggunakan eslint di projek npm untuk merapikan code

1. install untuk development:
npm install --save-dev eslint,
2. inisialisasi eslint,akan terbutat .exlint.extensi
./nodemodules/.bin/eslint --init
3. Menambahkan script eslint ketika build untuk memastikan semua file sudah sesuai dengan gaya penulisan

```json
"scripts":{
"lint":"eslint dir"
}
```

## Disable linter

//eslint-disable-next-line

## Auto-fix code untuk production

Also, ESLint can automatically fix a huge number of errors for '--fix' command. Example: npm run lint --fix. In this case, you do not need to change code by yourself.
