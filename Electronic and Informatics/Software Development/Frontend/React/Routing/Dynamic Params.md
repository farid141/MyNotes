# Dynamic Params

Pada halaman seperti edit dll, kita menginginkan untuk mengakses id. Dalam hal ini id adalah dynamic params.

## Route Definition

```jsx
<Route
  path="/c/:categoryId/p/:productId"
  element={<Product />}
/>

// Akses di page
import { useParams } from "react-router";

export default function Team() {
  let { categoryId, productId } = useParams();
  // ...
}
```

## Kita juga bisa mengatur parameter opsional/tidak

```jsx
<Route path=":lang?/categories" element={<Categories />} />
```

## Opsional static segment, bisa membuat satu halaman create/edit

```jsx
<Route path="users/:userId/edit?" component={<User />} />
```
