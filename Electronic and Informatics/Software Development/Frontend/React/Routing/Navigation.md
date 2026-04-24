# Navigation

Untuk melakukan navigasi (pindah2 halaman) dalam page.

## Navlink dan Link

Navlink berguna untuk memudahkan styling pada link yang aktif. Sementara Link digunakan untuk link biasa.

```jsx
<NavLink
  to="/"
  className={({ isActive }) =>
    isActive ? "active" : ""
  }
>
  Home
</NavLink>

<Link to="/concerts/salt-lake-city">Concerts</Link>
```

## useNavigate

berguna untuk mengarahkan lewat script, seperti quiz habis waktu, form berhasil

```jsx
import { useNavigate } from "react-router";

export function LoginPage() {
  let navigate = useNavigate();

  return (
    <>
      <MyHeader />
      <MyLoginForm
        onSuccess={() => {
          navigate("/dashboard");
        }}
      />
      <MyFooter />
    </>
  );
}
```
