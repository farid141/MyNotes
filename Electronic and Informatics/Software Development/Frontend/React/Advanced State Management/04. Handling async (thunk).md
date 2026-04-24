# ⚠️ Aturan Penting

1. **Reducer harus pure & synchronous**  
   Tidak boleh ada side-effect seperti `fetch`, `setTimeout`, atau `console.log` untuk debug.
2. **Async logic tidak boleh di dalam reducer**  
   Karena akan membuat state tidak konsisten dan susah di-debug.

---

## 🧩 **Masalah yang Terjadi**

Bayangkan kamu punya fetch data user dari server. Kalau kamu taruh `fetch()` di dalam komponen (`useEffect`), lalu komponen lain juga butuh data itu, kamu harus:

- Duplikasi logic di banyak komponen
- Debug lebih susah
- Susah dipelihara

---

## ✅ **Solusi dengan Redux Toolkit**

Redux Toolkit menyediakan `createAsyncThunk` untuk **memindahkan async logic dari komponen ke store**.

---

## 📁 Struktur Folder

```bash
src/
│
├── app/
│   └── store.js              # Konfigurasi store Redux
│
├── features/
│   └── users/
│       ├── usersSlice.js     # Reducer dan actions
│       └── usersAPI.js       # API call function (opsional)
│
├── App.js                    # Komponen utama
└── index.js
```

---

## 🧱 `store.js`

```js
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});
```

---

## 📦 `usersSlice.js`

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk: fetch data user
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return await res.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
```

---

## 🚀 `App.js`

```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  const status = useSelector(state => state.users.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers()); // panggil async thunk di awal
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1>Users List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error fetching data</p>}
      {status === 'succeeded' &&
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      }
    </div>
  );
};

export default App;
```

---

## ✅ Kelebihan Thunk (Redux Toolkit)

- Logic async bisa dipakai ulang oleh banyak komponen.
- State tetap pure dan predictable.
- Bisa test thunk function secara terpisah.
- Lebih rapi, terstruktur, dan scalable.
