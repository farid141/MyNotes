Pertanyaan Anda sangat bagus, dan ini adalah salah satu hal yang sering membingungkan ketika memulai dengan **mocking** dalam testing. Mari kita bahas secara rinci bagaimana cara membuat mock server dalam testing, serta bagaimana hubungannya dengan kode asli yang menggunakan `fetch`.

---

### **1. Apa itu Mocking?**

Mocking adalah teknik untuk mensimulasikan perilaku dari suatu fungsi, modul, atau API agar tidak bergantung pada implementasi aslinya selama pengujian. Dalam konteks testing frontend, mocking biasanya digunakan untuk:

- Menghindari ketergantungan pada API eksternal.
- Mempercepat proses testing (karena tidak perlu menunggu respons dari server).
- Mengontrol respons yang diterima untuk menguji berbagai skenario (misalnya: respons sukses, gagal, timeout, dll).

---

### **2. Cara Membuat Mock Server**

Ada beberapa cara untuk membuat mock server dalam testing React, tergantung pada kebutuhan proyek Anda. Berikut adalah dua pendekatan umum:

#### **A. Mock Global Fetch**

Jika komponen Anda menggunakan `fetch` untuk mengambil data dari server, Anda dapat "menimpa" (`override`) fungsi `fetch` global dengan mock.

**Contoh:**

```javascript
// Komponen yang menggunakan fetch
function AsyncData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1') // Fetch ke server asli
      .then((response) => response.json())
      .then((result) => setData(result.title));
  }, []);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}
```

**Mocking `fetch` di Test:**

```javascript
import { render, screen } from '@testing-library/react';
import AsyncData from './AsyncData';

test('displays mocked data', async () => {
  // Mock global fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ title: 'Mocked Title' }), // Respons mock
    })
  );

  // Render komponen
  render(<AsyncData />);

  // Pastikan teks "Loading..." muncul saat data belum dimuat
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Tunggu hingga teks dari mock fetch muncul
  const title = await screen.findByText(/mocked title/i);
  expect(title).toBeInTheDocument();
});
```

**Penjelasan:**

1. Kode asli komponen tetap menggunakan `fetch` ke server asli.
2. Saat menjalankan test, `global.fetch` ditimpa dengan implementasi mock menggunakan Jest.
3. Selama pengujian, komponen akan menggunakan mock `fetch` alih-alih melakukan permintaan ke server asli.

---

#### **B. Mock Modul Eksternal**

Jika Anda menggunakan library seperti `axios` atau modul API khusus, Anda dapat mem-mock modul tersebut menggunakan fitur `jest.mock`.

**Contoh:**
Misalkan Anda memiliki file `api.js` yang berisi fungsi untuk mengambil data dari server:

```javascript
// api.js
export async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  return response.json();
}
```

Komponen Anda menggunakan fungsi `fetchData` dari `api.js`:

```javascript
import { fetchData } from './api';

function AsyncData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((result) => setData(result.title));
  }, []);

  return <div>{data ? <p>{data}</p> : <p>Loading...</p>}</div>;
}
```

**Mocking Modul di Test:**

```javascript
import { render, screen } from '@testing-library/react';
import AsyncData from './AsyncData';
import { fetchData } from './api';

// Mock modul api.js
jest.mock('./api', () => ({
  fetchData: jest.fn(),
}));

test('displays mocked data', async () => {
  // Atur mock implementasi untuk fetchData
  fetchData.mockResolvedValue({ title: 'Mocked Title' });

  // Render komponen
  render(<AsyncData />);

  // Pastikan teks "Loading..." muncul saat data belum dimuat
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Tunggu hingga teks dari mock fetchData muncul
  const title = await screen.findByText(/mocked title/i);
  expect(title).toBeInTheDocument();
});
```

**Penjelasan:**

1. File `api.js` di-mock menggunakan `jest.mock`.
2. Fungsi `fetchData` di-replace dengan implementasi mock yang mengembalikan nilai statis.
3. Komponen tetap menggunakan `fetchData`, tetapi selama pengujian, ia menggunakan versi mock.

---

### **3. Apakah Kita Tetap Menulis `fetch` ke Server Asli?**

Ya, **kode asli tetap menggunakan `fetch` ke server asli**, tetapi selama pengujian:

- Anda menimpa (`override`) fungsi `fetch` atau modul API dengan mock.
- Ini memastikan bahwa selama pengujian, komponen tidak benar-benar melakukan permintaan ke server asli, melainkan menggunakan respons yang telah Anda definisikan dalam mock.

**Keuntungan:**

- Kode produksi tetap bersih dan tidak perlu diubah hanya untuk kebutuhan testing.
- Anda dapat menguji berbagai skenario (sukses, gagal, dll.) tanpa bergantung pada server asli.

---

### **4. Contoh Lengkap dengan Berbagai Skenario**

Berikut adalah contoh lengkap yang mencakup beberapa skenario mock:

```javascript
import { render, screen } from '@testing-library/react';
import AsyncData from './AsyncData';

// Mock global fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

test('displays mocked success data', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ title: 'Success Title' }),
    })
  );

  render(<AsyncData />);
  const title = await screen.findByText(/success title/i);
  expect(title).toBeInTheDocument();
});

test('displays error message on failed fetch', async () => {
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Fetch failed'))
  );

  render(<AsyncData />);
  const errorMessage = await screen.findByText(/error loading data/i);
  expect(errorMessage).toBeInTheDocument();
});
```

---

### **5. Kesimpulan**

- **Mocking** memungkinkan Anda mensimulasikan respons dari server tanpa benar-benar mengirimkan permintaan ke server asli.
- Kode asli tetap menggunakan `fetch` atau modul API yang sesungguhnya, tetapi selama pengujian, Anda menimpa fungsi tersebut dengan mock.
- Dengan mocking, Anda dapat menguji berbagai skenario (sukses, gagal, dll.) dengan cepat dan efisien.

Jika Anda memiliki pertanyaan lebih lanjut tentang mocking atau ingin contoh spesifik, silakan tanyakan! 😊
