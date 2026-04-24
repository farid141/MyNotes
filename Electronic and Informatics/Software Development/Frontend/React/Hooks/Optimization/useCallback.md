# UseCallback

Untuk Memoize (menyimpan) `definisi fungsi` agar tidak berubah setiap render.

Biasanya dipakai untuk mencegah re-render anak atau menghindari pembuatan fungsi baru tiap kali render.

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []); // fungsi hanya dibuat sekali

  return <Child onIncrement={increment} />;
};

```

Tanpa useCallback, setiap render Parent akan membuat fungsi increment baru, dan Child bisa ikut re-render kalau pakai React.memo.
Jadi useCallback menjaga stabilitas referensi fungsi antar render.
