Great banget kamu masuk ke hal ini—ini memang sering kejadian di FE, apalagi kalau kamu butuh field tambahan buat kebutuhan UI, tapi **nggak boleh ikut ke server** (kayak field internal, lokal, atau virtual).

---

## 🧠 Contoh Kasus

Misalnya kamu punya data dari server:
```json
{
  "loan_number": "LN123456",
  "amount": 5000000
}
```

Tapi di frontend kamu nambah field buat kebutuhan UI, seperti:
```ts
type LoanUI = {
  loanNumber: string;
  amount: number;
  isSelected: boolean; // ← tidak ada di server
}
```

> Lalu kamu perlu mengirim balik ke server hanya field `loanNumber` dan `amount`.

---

## ✅ **Solusi Best Practice**

### 🔹 1. Gunakan TypeScript dengan pemisahan tipe
Pisahkan antara tipe **data server** dan **data UI**:

```ts
type LoanFromServer = {
  loan_number: string;
  amount: number;
};

type LoanUI = {
  loanNumber: string;
  amount: number;
  isSelected: boolean;
};
```

Atau:
```ts
type LoanToServer = Pick<LoanUI, 'loanNumber' | 'amount'>;
```

---

### 🔹 2. Gunakan mapping function sebelum kirim
```ts
import snakecaseKeys from 'snakecase-keys';

function mapLoanToServer(data: LoanUI) {
  const { loanNumber, amount } = data;
  return snakecaseKeys({ loanNumber, amount }, { deep: true });
}
```

Lalu:
```ts
const payload = mapLoanToServer(loanUIData);
await fetch('/api/loan', {
  method: 'POST',
  body: JSON.stringify(payload),
});
```

---

## 🧼 Bonus: Bisa juga buat helper cleanData
Kalau field tambahan kadang fleksibel, kamu bisa bikin helper:
```ts
function cleanUIFields<T extends object>(data: T, fieldsToKeep: (keyof T)[]): Partial<T> {
  return fieldsToKeep.reduce((obj, key) => {
    obj[key] = data[key];
    return obj;
  }, {} as Partial<T>);
}

// Contoh:
const minimalData = cleanUIFields(loanUIData, ['loanNumber', 'amount']);
const payload = snakecaseKeys(minimalData, { deep: true });
```

---

## 🎯 Kesimpulan:

| Hal | Solusi |
|-----|--------|
| Tambah field di FE | Bebas, aman di UI |
| Hanya kirim field yang diperlukan ke server | Pakai mapping & snakecaseKeys |
| Hindari kirim field UI ke server | Gunakan tipe yang terpisah atau filter field |


import camelcaseKeys from 'camelcase-keys';

const raw = await fetch('/api/loan').then(res => res.json());
const camelData = camelcaseKeys(raw, { deep: true });