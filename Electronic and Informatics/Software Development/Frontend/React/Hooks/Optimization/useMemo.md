# UseMemo

optimasi `hasil komputasi` agar hanya dilakukan ketika terdapat perubahan state tertentu saja.

```jsx
import React, { useState, useMemo } from "react";

function ExpensiveComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Expensive calculation
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    return num * 2;
  };

  // Memoize the result of the expensive calculation
  const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Memoized Value: {memoizedValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}

export default ExpensiveComponent;
```
