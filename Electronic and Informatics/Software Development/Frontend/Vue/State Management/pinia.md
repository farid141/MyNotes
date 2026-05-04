# Penjelasan

Pinia adalah library tambahan yang digunakan untuk mengelola global state dalam vue.

## Pinia vs Vuex

Mulai dari Vue 3, Pinia jadi official recommendation dari tim Vue, menggantikan Vuex. Bahkan, dokumentasi terbaru Vue tidak menyarankan Vuex lagi. Kenapa?

🔎 Kelemahan Vuex:
Verbose (nulis store-nya panjang dan banyak boilerplate):

- Harus pakai mutations + actions → terpisah, agak ribet
- Tidak punya TypeScript support bawaan
- Kurang intuitif (terutama buat pemula)

## 📦 Instalasi dan Setup Pinia

```bash
npm install pinia
```

### 🔧 Setup di `main.js`

```js
// ./src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
```

---

## 🧠 Membuat Store dengan Composition API

```js
// ./src/store.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounter = defineStore("counter", () => {
  // State
  const counter = ref(0);

  // Action
  function increment() {
    counter.value++;
  }

  return {
    counter,
    increment,
  };
});
```

```ts
// stores/counter.ts (versi typescript)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state
  const count = ref(0)
  const name = ref('Default')

  // getter
  const doubleCount = computed(() => count.value * 2)

  // action
  function increment() {
    count.value++
  }

  function setName(newName: string) {
    name.value = newName
  }

  return {
    count,
    name,
    doubleCount,
    increment,
    setName
  }
})

```

---

## 🧩 Menggunakan Store di Komponen

```js
// ./src/components/YourComponent.vue (atau .js)
import { useCounter } from "../store.js";

const counter = useCounter();

// Akses state dan method
console.log(counter.counter);      // ➜ akses nilai state
counter.increment();               // ➜ panggil method

// Reset counter menggunakan $patch
function handleReset() {
  counter.$patch({
    counter: 0,
  });
}
```

---

## 🔁 Reaktivitas dan Lifecycle

### 🔔 $subscribe()

Digunakan untuk memantau perubahan state (hanya jika menggunakan `$patch()`):

```js
counter.$subscribe((mutation, state) => {
  console.log("State berubah:", state.counter);
});
```

### ⚡ $onAction()

Digunakan untuk memantau saat action dipanggil:

```js
counter.$onAction(({ name, store, args, after, onError }) => {
  console.log(`Action dipanggil: ${name}`);

  after((result) => {
    console.log("Sukses:", result);
  });

  onError((error) => {
    console.error("Terjadi error:", error);
  });
});
```

---

## 🧮 Getters (Computed Properties)

Getter bisa ditambahkan langsung di dalam store:

```js
// Tambah ke dalam return
const doubled = computed(() => counter.value * 2);

return {
  counter,
  increment,
  doubled,
};
```

Penggunaan:

```js
console.log(counter.doubled); // Output: nilai counter * 2
```

---

## 🌐 Menggunakan API Call dalam Store

Langsung buat fungsi `async` dalam store:

```js
// Dalam store.js
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);

  async function fetchUsers() {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      users.value = res.data;
    } catch (error) {
      alert("Gagal memuat data");
      console.error(error);
    }
  }

  return {
    users,
    fetchUsers,
  };
});
```
