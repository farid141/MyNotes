# Function Param

Ketika sebuah fungsi memiliki `parameter yang sangat banyak`, sangat direkomendasikan menggunakan named param. Hal ini dikarenakan ada beberapa param yang biasanya punya default value. Pada js, named param dilakukan dengan cara `obj destructuring`.

```js
interface CreateUserOptions {
  name: string;
  age: number;
  email?: string;
  role?: string;
  phone?: string;
}

function createUser({
  name,
  age,
  email = "",
  role = "user",
  phone = "",
}: CreateUserOptions) {
  console.log(name, age, email, role, phone);
}

createUser({ name: "John Doe", age: 30, phone: "123-456-7890" });
```

dari cara panggilnya bisa kita lihat, menggunakan obj

## Kombinasi Keduanya

```js
function getUser(
  userId: string,
  options: {
    includePosts?: boolean;
    includeProfile?: boolean;
    cache?: boolean;
  } = {}
) {}

getUser("Farid", {includeProfile: true})
```
