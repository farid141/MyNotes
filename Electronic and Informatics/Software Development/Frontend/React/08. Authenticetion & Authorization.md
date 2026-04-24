# Authentication & Authorization

Dalam pembahasan ini, implementasi akan dilakukan dengan menggunakan `react-router` dan `JWT`.

## Alur Umum

Berikut adalah alur yang digunakan.
`login → simpan token → validasi → ProtectedRoute → Unauthorized`

1. **User buka app** → `AuthProvider` cek token di `localStorage`.
2. Kalau ada → validasi ke API `/me`, set `user` ke Context.
3. Kalau tidak ada user → `ProtectedRoute` redirect ke `/unauthorized`.
4. Kalau login berhasil → token + user disimpan di `localStorage` + Context.
5. `Dashboard` hanya bisa diakses kalau user valid.

### 🏗 Struktur Sederhana

```bash
src/
 ├─ App.jsx
 ├─ context/AuthContext.jsx
 ├─ components/ProtectedRoute.jsx
 ├─ pages/
 │   ├─ Home.jsx
 │   ├─ Login.jsx
 │   ├─ Dashboard.jsx
 │   └─ Unauthorized.jsx
```

### 1. `AuthContext.jsx` → Provider untuk user & token

```jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);    // data user
  const [loading, setLoading] = useState(true); // supaya ada spinner saat cek token

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    // Simulasi cek ke backend (misalnya /api/me)
    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. `ProtectedRoute.jsx` → guard untuk route

```jsx
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
```

### 3. `App.jsx` → definisi routing

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

### 4. `Login.jsx` → simulasi login

```jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulasi dapat token + user
    const fakeToken = "123456";
    const fakeUser = { id: 1, name: "Budi", role: "admin" };

    login(fakeToken, fakeUser);
    navigate("/dashboard");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login as Budi</button>
    </div>
  );
}
```

### 5. `Unauthorized.jsx`

```jsx
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>⚠️ Unauthorized</h1>
      <p>Anda tidak punya akses ke halaman ini.</p>
      <Link to="/">
        <button>Back Home</button>
      </Link>
    </div>
  );
}
```

### 6. `Dashboard.jsx`

```jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dashboard</h1>
      <p>Selamat datang, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Interceptor

Gunakan interceptor dengan `meredirect` ke halaman login ketika token expired, ditandai dengan response server 403.

Atau untuk meningkatkan UX tambahkan `refresh token` dan pada interceptor tambahkan hit ke API `/token/refresh` ketika mendapati response 403.
