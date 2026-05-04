Digunakan untuk menampilkan data list dan obj

```html
<li v-for="(item, index) in items">{{ item.message }}</li>
```

Bisa juga digunakan untuk destructure array of obj

```html
<!-- with index alias -->
<li v-for="({ message }, index) in items">{{ message }} {{ index }}</li>
```

atau mengakses semua field obj

```html
<div v-for="item of items"></div>
```

atau dengan range

```html
<span v-for="n in 10">{{ n }}</span>
```

syntax:

- v-for="(value, key) in items"
- v-for="item in items"

membutuhkan atribut :key="". Dikarenakan redering perulangan menggunakan "in-place patch" untuk meningkatkan performa yang mengakibatkan hal yang tidak diinginkan ketika menambah/hapus element ketika re-render
