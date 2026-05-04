# Penjelasan

## 🔧 Provide & Inject di Vue

**`provide` dan `inject`** adalah fitur built-in Vue yang memungkinkan *dependency injection* antar komponen, biasanya antara komponen induk dan turunannya.

---

### 1. 🚀 Provide melalui `app` (Global)

```js
import { createApp } from 'vue'

const app = createApp({})

// Memberikan nilai global
app.provide('key', 'value')
```

---

### 2. 🧩 Provide di dalam Komponen

Misalnya kita ingin menyediakan lokasi yang bisa diubah:

```js
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

// Menyediakan data dan fungsi
provide('location', {
  location,
  updateLocation
})
```

---

### 3. 🧲 Inject (Mengakses Provide)

Untuk mengakses data yang disediakan sebelumnya:

```js
import { inject } from 'vue'

// inject dengan fallback default jika tidak ditemukan
const { location, updateLocation } = inject('location', {
  location: ref('Default Location'),
  updateLocation: () => {}
})
```

---

### 4. 🛡️ Hindari Key Bentrok: Gunakan Symbol

Untuk mencegah konflik `key`, gunakan `Symbol` sebagai key unik:

#### 📁 `keys.js`

```js
// Buat Symbol unik
export const myInjectionKey = Symbol('MyUniqueKey')
```

#### ✅ Provide dengan Symbol

```js
import { provide } from 'vue'
import { myInjectionKey } from './keys.js'

provide(myInjectionKey, {
  location,
  updateLocation
})
```

#### ✅ Inject dengan Symbol

```js
import { inject } from 'vue'
import { myInjectionKey } from './keys.js'

const injected = inject(myInjectionKey)
```

## Modifikasi state

Secara default, `provide` hanya mengirimkan referensi dari data, **bukan membuatnya read-only atau immutable**. Jadi:

- Kalau yang di-`provide` itu **`ref` atau `reactive`**, maka komponen turunan **bisa langsung mengubahnya**—selama dia punya akses.
- Tapi... cara yang **lebih rapi dan terkontrol** adalah dengan menyediakan **fungsi update** bareng datanya (kayak `action` di Pinia).

---

### ✅ Contoh Sederhana: Turunan Ubah Nilai

#### Komponen Induk

```js
// ParentComponent.vue
import { ref, provide } from 'vue'

const counter = ref(0)

function increment() {
  counter.value++
}

provide('counterStore', {
  counter,
  increment
})
```

#### Komponen Turunan

```js
// ChildComponent.vue
import { inject } from 'vue'

const counterStore = inject('counterStore')

counterStore.increment() // memanggil fungsi dari parent
```

---

### ✍️ Kalau Mau Langsung Ubah `ref`-nya?

Boleh juga, tapi pastikan kamu `provide` **referensi yang sama**, misalnya:

```js
// Parent
provide('count', count)

// Child
const count = inject('count')
count.value += 10
```

> 💡 **Tapi hati-hati ya**: ini bisa bikin logic agak susah dilacak kalau banyak komponen ikut ngubah. Makanya penggunaan fungsi (`action`) lebih disarankan.

---

### 🔒 Ingin Data Lebih Aman?

Kalau mau mirip Pinia, kamu bisa buat pattern seperti ini:

```js
// store.js
import { ref } from 'vue'

export function useCounterStore() {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return {
    count,
    increment
  }
}
```

Lalu:

- **Di parent**: `provide(counterKey, useCounterStore())`
- **Di child**: `inject(counterKey)`

### 📝 Catatan Tambahan

- `provide` hanya akan di-*propagate* ke komponen anak (turunan).
- Cocok untuk *state management sederhana* tanpa perlu Vuex atau Pinia.
- Gunakan `Symbol` terutama saat membuat library atau aplikasi berskala besar.
