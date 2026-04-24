# **Catatan React Testing**

## **1. Setup Otomatis dengan Create React App**

Jika Anda membuat proyek menggunakan **Create React App**, beberapa package testing sudah terinstal secara otomatis:

- **Jest**: Framework testing JavaScript (Running dan Asserting).
- **React Testing Library**: Library khusus untuk menguji komponen React (Rendering).

Nama file test biasanya memiliki format `.test.js` atau `.spec.js`. File ini berisi fungsi-fungsi testing seperti:

- `test('deskripsi test', callback)`
- `describe('deskripsi grup test', () => { test(); test(); })`

---

## **2. Prinsip Testing Frontend (AAA)**

Testing frontend mengikuti prinsip **AAA**:

1. **Arrange**: Menyiapkan kondisi awal sebelum pengujian.
   - Misalnya: Rendering komponen atau mock data.
2. **Act**: Melakukan aksi pada elemen yang diuji.
   - Misalnya: Mengklik tombol, mengisi input, dll.
3. **Assert**: Memastikan hasil sesuai harapan.
   - Misalnya: Memeriksa apakah teks tertentu muncul di layar.

---

## **3. Fungsi-Fungsi Penting dalam Testing**

Berikut adalah beberapa fungsi utama yang sering digunakan dalam testing React:

### **a. Rendering Komponen**

```javascript
import { render } from '@testing-library/react';

render(<MyComponent />);
```

- Digunakan untuk "menampilkan" komponen React dalam lingkungan testing.

### **b. Querying Elements**

```javascript
import { screen } from '@testing-library/react';

// Mendapatkan elemen berdasarkan role, text, label, dll.
const button = screen.getByRole('button', { name: /submit/i });
const heading = screen.getByText(/welcome/i);
```

- `screen.getByRole()`: Mencari elemen berdasarkan atribut aksesibilitas.
- `screen.getByText()`: Mencari elemen berdasarkan teks.

### **c. Simulasi Aksi Pengguna**

```javascript
import userEvent from '@testing-library/user-event';

userEvent.click(button); // Mengklik tombol
userEvent.type(input, 'Hello World'); // Mengetik di input
```

- `userEvent`: Simulasi interaksi pengguna seperti klik, ketik, hover, dll.

### **d. Memeriksa Hasil**

```javascript
import { expect } from '@jest/globals';

expect(button).toBeInTheDocument(); // Memastikan elemen ada di DOM
expect(heading.textContent).toBe('Welcome'); // Memastikan teks benar
```

- `expect`: Memeriksa apakah hasil sesuai dengan harapan.

---

## **4. Contoh Skenario Testing**

### **Skenario 1: Menguji Tombol dan Teks**

Misalkan kita memiliki komponen sederhana seperti ini:

```javascript
function Greeting() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <button>Click Me</button>
    </div>
  );
}
```

**Test Case:**

1. Pastikan teks "Hello, World!" muncul di layar.
2. Pastikan tombol dapat diklik dan merubah teks.

**Kode Testing:**

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

test('renders greeting and button', () => {
  // Arrange
  render(<Greeting />);

  // Act & Assert
  const heading = screen.getByText(/hello, world/i);
  expect(heading).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

test('changes text when button is clicked', async () => {
  // Arrange
  render(<Greeting />);

  // Act
  const button = screen.getByRole('button', { name: /click me/i });
  await userEvent.click(button);

  // Assert
  const newHeading = screen.getByText(/you clicked the button/i);
  expect(newHeading).toBeInTheDocument();
});
```

---

### **Skenario 2: Menguji Data Async**

Misalkan kita memiliki komponen yang menampilkan data dari API:

```javascript
import { useEffect, useState } from 'react';

function AsyncData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((result) => setData(result.title));
  }, []);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}
```

**Test Case:**

1. Pastikan teks "Loading..." muncul saat data belum tersedia.
2. Pastikan teks dari API muncul setelah data dimuat.

**Kode Testing:**

```javascript
import { render, screen } from '@testing-library/react';
import AsyncData from './AsyncData';

test('displays loading state initially', () => {
  render(<AsyncData />);
  const loadingText = screen.getByText(/loading/i);
  expect(loadingText).toBeInTheDocument();
});

test('displays fetched data after loading', async () => {
  render(<AsyncData />);
  const title = await screen.findByText(/sunt aut facere/i, {}, { timeout: 3000 });
  expect(title).toBeInTheDocument();
});
```

---

## **5. Mock Server**

Untuk menghindari ketergantungan pada API eksternal selama testing, kita bisa menggunakan **mock server**. Jest menyediakan fitur mocking untuk simulasi respons API.

**Contoh Mock API:**

```javascript
import { render, screen } from '@testing-library/react';
import AsyncData from './AsyncData';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ title: 'Mocked Title' }),
  })
);

test('displays mocked data', async () => {
  render(<AsyncData />);
  const title = await screen.findByText(/mocked title/i);
  expect(title).toBeInTheDocument();
});
```

---

## **6. Tips Tambahan**

1. **Gunakan Role Aksesibilitas**: Gunakan `screen.getByRole()` untuk memastikan komponen Anda ramah terhadap aksesibilitas.
2. **Simulasikan Interaksi Nyata**: Gunakan `userEvent` untuk simulasi interaksi pengguna yang lebih realistis dibandingkan `fireEvent`.
3. **Tulis Test Case Secara Modular**: Pisahkan test case untuk setiap fungsionalitas agar lebih mudah dikelola.
4. **Lakukan Testing Berlapis**: Mulai dari unit testing hingga integration testing untuk memastikan semua bagian aplikasi bekerja dengan baik.

---

Dengan struktur dan contoh skenario di atas, Anda dapat memahami dan menerapkan testing React dengan lebih efektif. Jika ada pertanyaan lebih lanjut, silakan bertanya! 😊
