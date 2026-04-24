# Object

Merupakan tipe data berbentuk `key-value` dalam js. Object dapat memiliki member berupa `variabel` atau `fungsi/method`.

## Mengakses Obj by Key

field dari object (baik `var/method`) dapat diakses dengan `bracket/dot notation`. Selain itu, key bisa berupa string (dengan spasi).

```js
obj.['no urut'] // bracket
obj.data // dot
```

Selain itu, bracket notation sangat berguna apabila kita ingin mengakses `member/field` dengan sebuah variabel js

## Mengakses Obj dengan Loop

Terdapat beberapa cara untuk mengakses semua field (key & value) dalam obj

```js
const obj = { a: 1, b: 2, c: 3 };

// 1. for-in loop (menghasilkan key)
for (let key in obj) {
  if (obj.hasOwnProperty(key)) { // To avoid inherited properties
    console.log(`${key}: ${obj[key]}`);
  }
};

// 2. Object.keys (menghasilkan key)
Object.keys(obj).forEach(key => {
  console.log(`${key}: ${obj[key]}`);
});

// 3. Object.entries menghasilkan list dengan tiap index berisi array [key, value]
[
  ["a", 1],
  ["b", 2],
  ["c", 3]
] 
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

## Menghapus field

untuk menghapus field(prop/method) dari object ada beberapa cara

```js
const obj = { name: "Alice", age: 25, city: "Miami" };

// 1. Dengan fromEntries dari hasil filter array hasil entries
const newObj = Object.fromEntries(
  Object.entries(obj).filter(([key]) => key !== "age")
);

// 2. Delete Operator
delete obj.age;

// 3. Object Destructuring
const { age, ...newObj } = obj;

console.log(newObj); // Output: { name: "Alice", city: "Miami" }
```
