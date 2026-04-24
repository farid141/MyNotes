
# 🗝 Handling Keys Dynamically

## 🧵 Kasus Umum

Biasanya kita render list seperti ini:

```jsx
data.map(item => <Item key={item.id} {...item} />)
```

Tapi gimana kalau `data` isinya cuma array of string?

```js
const fruits = ['apple', 'banana', 'orange'];
```

Tidak ada `id` untuk dijadikan `key`. Maka kita perlu:

## 🔧 Solusi: Function Props untuk Key

Kita bisa membuat props seperti ini:

```jsx
<List items={fruits} getKey={(item) => item}>
  {(item) => <div>{item}</div>}
</List>
```

## 💡 Di dalam komponen

```jsx
function List({ items, getKey, children }) {
  return (
    <>
      {items.map(item => (
        <div key={getKey(item)}>
          {children(item)}
        </div>
      ))}
    </>
  );
}
```

Dengan cara ini, kita tidak perlu `id`, cukup beri tahu bagaimana cara menghasilkan key yang unik dari data yang ada (misalnya pakai string itu sendiri).

---
