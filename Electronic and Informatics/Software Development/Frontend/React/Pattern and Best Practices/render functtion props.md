# 🧩 Passing Function sebagai Children (Function as Children)

Kadang kita menggunakan pattern di React yang agak tidak biasa, yaitu:

```jsx
<MyComponent>
  {(data) => <div>{data}</div>}
</MyComponent>
```

> **Children-nya bukan elemen biasa, tapi sebuah *fungsi* yang mengembalikan JSX.**

## 🎯 Tujuan

Pattern ini dikenal sebagai **"Function as Children"** atau **Render Props**.

Digunakan saat:

- Ingin memberi kontrol penuh ke parent untuk menentukan UI.
- Perlu menampilkan sesuatu yang tergantung pada data internal si `MyComponent`.
