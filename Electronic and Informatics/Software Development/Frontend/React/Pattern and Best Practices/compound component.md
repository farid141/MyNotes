# Compound component

Komponen yang selalu digunakan bersamaan dapat dibuat dengan prinsip ini. Agar user tau bahwa komponen tersebut harus digunakan bersamaan.

```javascript
const context = useContext(CounterContext);
if (!context) {
  throw new Error("useCounter must be used within a CounterProvider");
}
```

Dalam custom hooks compound component terdapat code berikut. Dimana jika CounterContext sudah dipanggil sebelumnya (sebelum komponen pemanggil custom hooks) baru akan bisa berjalan. Jika tidak maka kosong.

## Grouping compound component

Dengan satu object tersebut, dapat memastikan bahwa komponen childnya yang dibuat hanya **KHUSUS** didalam komponen obj tersebut saja

```javascript
import React, { createContext, useContext, useState } from "react";

const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((prev) => !prev);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

Toggle.On = function On({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function Off({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = function Button() {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>{on ? "Turn Off" : "Turn On"}</button>;
};

export default Toggle;
```
