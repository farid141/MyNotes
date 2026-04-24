# Optimization

Rendering optimization di React berfokus pada **mengurangi render yang tidak perlu**, **mempercepat diffing**, dan **mengontrol expensive computation** agar UI tetap responsif walaupun state sering berubah.

Berikut ringkasan **strategi inti** yang umum dipakai di production-scale React apps.

---

## 1. Pahami Kapan React Melakukan Render

React akan re-render ketika:

1. **State berubah** (`useState`, `useReducer`)
2. **Props berubah**
3. **Context berubah**
4. **Parent re-render** → child ikut render (default behavior)

Masalah umum:

> Parent render → semua child render walaupun datanya tidak berubah.

---

## 2. Memoization (Prevent unnecessary re-render)

### React.memo

Mencegah re-render jika props tidak berubah (shallow comparison). Dalam contoh dibawah, component `UserCard` hanya akan re-render jika props user berubah.

```tsx
const UserCard = React.memo(({ user }) => {
  console.log("render user card");
  return <div>{user.name}</div>;
});
```

Gunakan ketika:

* component cukup berat
* props jarang berubah
* component sering dipanggil

---

### useMemo

Cache hasil perhitungan mahal (expensive computation).

```tsx
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
```

Gunakan ketika:

* sorting
* filtering
* mapping besar
* transform data kompleks

---

### useCallback

Mencegah function reference berubah setiap render.

```tsx
const handleClick = useCallback(() => {
  console.log("clicked");
}, []);
```

Penting jika function dikirim ke child memoized component.

Contoh problem:

```tsx
<MyButton onClick={() => doSomething()} />
```

Pada code diatas, anonim function baru dibuat setiap render → child ikut render.

Solusi:

```tsx
const handleClick = useCallback(() => {
  doSomething();
}, []);

<MyButton onClick={handleClick} />
```

---

## 3. Split Component (Component Granularity)

Pisahkan component besar menjadi kecil agar perubahan state tidak memicu render seluruh tree.

❌ Tidak optimal

```tsx
<Page>
  <Header />
  <Sidebar />
  <BigTable />
</Page>
```

Jika state table berubah → semua ikut render.

✔ Optimal

```tsx
const BigTable = React.memo(...)
```

atau

pisahkan state:

```tsx
<TableContainer>
  <BigTable />
</TableContainer>
```

---

## 4. Key yang stabil pada list

React menggunakan `key` untuk diffing.

❌ buruk

```tsx
items.map((item, index) =>
  <Row key={index} />
)
```

✔ benar

```tsx
items.map(item =>
  <Row key={item.id} />
)
```

index menyebabkan re-render tidak optimal saat insert/delete.

---

## 5. Avoid Inline Object & Array

Object baru dibuat setiap render → referensi berubah.

❌

```tsx
<Component style={{ marginTop: 10 }} />
```

✔

```tsx
const style = { marginTop: 10 };
<Component style={style} />
```

atau

```tsx
const style = useMemo(() => ({ marginTop: 10 }), []);
```

---

## 6. Context Optimization

Context update → semua consumer re-render.

Solusi:

* split context
* selector pattern
* use context only for global state

Contoh split:

```tsx
<UserContext.Provider value={user}>
<ThemeContext.Provider value={theme}>
```

bukan:

```tsx
<AppContext.Provider value={{ user, theme }}>
```

---

## 7. Virtualization untuk Large List

Untuk data besar (1000+ rows), gunakan virtualization.

Library populer:

* react-window
* react-virtualized
* antd Table virtualization

```tsx
import { FixedSizeList } from "react-window";
```

Hanya item visible yang dirender.

---

## 8. React Query / SWR untuk server state

Menghindari render berulang karena manual state handling.

Keuntungan:

* caching
* dedup request
* background refetch

Sesuai dengan use case kamu sebelumnya saat memakai **React Query** di dashboard CRUD.

---

## 9. Batasi State Scope

State terlalu global → banyak render.

❌

```tsx
const [form, setForm] = useState({
  name: "",
  email: "",
  phone: ""
});
```

✔
pisahkan:

```tsx
const [name, setName] = useState("");
```

atau gunakan form library.

---

## 10. Profiler untuk Analisis

Gunakan React DevTools Profiler untuk melihat:

* component mana sering render
* render duration
* wasted render

Workflow:

1. buka React DevTools
2. tab Profiler
3. record interaction
4. cek flamegraph

---

## Checklist cepat (rule of thumb)

Gunakan optimization jika:

* list besar
* table berat (antd table)
* dashboard banyak filter
* complex state
* frequent re-render
* expensive calculation
* realtime UI (IoT dashboard cocok)

---

Jika mau, saya bisa jelaskan lebih spesifik:

* optimization khusus **Ant Design Table**
* optimization untuk **React Query**
* optimization untuk **form besar**
* optimization untuk **dashboard realtime IoT**
* contoh **bad vs good pattern** di codebase production
