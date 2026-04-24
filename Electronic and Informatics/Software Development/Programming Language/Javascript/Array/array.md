# Penjelasan

array adalah object, mutable
In JavaScript, arrays use numbered indexes.
In JavaScript, objects use named indexes.

> jangan gunakan new Array(), lebih baik let var = []

## Identifikasi array

Penggunaan `typeof` pada array akan menghasilkan object.

```js
Array.isArray(var)
var instanceof Array
```

## Cek panjang array

arr.length

## Konversi ke string

- `arr.toString()` separator otomatis koma `array baru`
- `arr.join('*')` separator custom `array baru`

## Modifikasi array

- `arr.push('asd')` => modifikasi tambahkan data ke posisi akhir
- `arr.unshift('asd')` => modifikasi tambahkan data ke posisi awal
- `arr.pop()` => modifikasi hapus data terakhir dan kembalikan data tersebut
- `arr.shift()` => modifikasi hapus data pertama dan kembalikan data tsb
- `arr.concat(array2, array3)` => buat array baru, uraikan array argument 1 level dan gabung
- `arr.slice(start, end)` => buat baru, mengambil array dari index start sampai sebelum end
- `arr.splice(i_start, i_remove, add...)` => modifikasi, hapus element setelah start dan menambahkan element lain (params 3, 4, ...)
- `arr.toSpliced(i_start, i_remove, add...)` => buat baru, hapus element setelah start dan menambahkan element lain (params 3, 4, ...)
- `arr.includes(search_item)` => return boolean, `true` jika salah satu element sama dengan item

### find element

- `arr.find(callback)` kembalikan nilai pertama yang menghasilkan callback true (index awal ke akhir)
- `arr.findLast(callback)` kembalikan nilai pertama yang menghasilkan callback true (index akhir ke awal)
- `arr.findIndex(callback)` kembalikan index pertama yang menghasilkan callback true (index awal ke akhir)
- `arr.findLastIndex(callback)` kembalikan index pertama yang menghasilkan callback true (index akhir ke awal)

## Sort

### sort array of string

```js
arr.sort(); // mutate
arr.toSort(); // no mutate

// kombinasikan dengan reverse untuk descendant
arr.reverse(); // mutate
arr.toReverse(); // no mutate
```

### sort array of number

```js
const arr = [40, 100, 1, 5, 25, 10];
arr.sort(function(a, b){return a - b});
```

sort number tersebut dapat digunakan untuk menentukan min/max, dengan mengambil index akhir/awal. Nilai a dan b merupakan nilai dari member array yang diiterasi.

## Advance method (for senior)

- `arr.filter(callback)` return bentuk element yang sama yang hasil callback `true`
- `arr.reduce((acc, currVal)=>val, initAcc)` return total acc dari return iterasi semua nilai
- `arr.find(callback)` return element pertama yang hasil callback `true` / `undefined` jika tidak ada
- `arr.map(callback)` return array baru dengan element bernilai hasil callback
- `arr.flatMap(callback)` return array baru dengan element bernilai `flat 1 level` hasil callback
- `arr.some(callback)` return true/false apabila ada satu element yang memenuhi callback

## Grouping list of Obj

```js
const data = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'vegetable', name: 'broccoli' }
];

// 1. arr.Reduce Approach
const grouped = data.reduce((acc, item) => {
  const key = item.category;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});

// 2. Modern Approach (ECMA Script 2023)
const grouped = Object.groupBy(data, item => item.category);

// 3. manual with arr.forEach approach
const grouped = {};
data.forEach(item => {
  const key = item.category;
  if (!grouped[key]) {
    grouped[key] = [];
  }
  grouped[key].push(item);
});

```