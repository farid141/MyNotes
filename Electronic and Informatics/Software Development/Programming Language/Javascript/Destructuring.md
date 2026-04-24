# Destructuring

Menyalin dan membuat `array/obj` baru, bisa untuk `field/element` tertentu

## Array

```js
const name = ["farid", "nubaili", "alkatiri"]
const [firstName, lastName, ...others] = name
// others = ["alkatiri"]
```

## Objek

(nama key harus sesuai)

```js
const person = {
 firstName: "farid", 
 lastName: "nubaili", 
 age: 23
}
const [firstName, lastName, ...others] = person

// others = {age: 23}

//  nested
// mengambil field name dan country dari address
{
 name, 
 address:{name, country}, 
 contact
}
```

### Custom Variable Name

Dengan array, kita bisa melakukannya secara default, berbeda dengan obj.

```js
const person = {
  name: 'John Doe',
  age: 30,
  occupation: 'Software Engineer'
};

// Destructuring and renaming 'name' to 'fullName', and 'occupation' to 'jobTitle'
const { name: fullName, age, occupation: jobTitle } = person;
```

Dari code diatas, bagian sebelah kanan `:` adalah variable custom.
