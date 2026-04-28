# Datatable

Ya—dan sebenarnya **harus** dibuat reusable kalau kamu mau scalable. Versi sekarang masih “hardcoded” (`columns` & `data` tied ke Users), jadi cepat mentok begitu tabelnya beda shape.

Kita ubah jadi generic component dengan **TypeScript generics + passing columns + data**.

---

## ✅ 1. Reusable DataTable (Generic)

```tsx
"use client"

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"

// Generic type TData
interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  loading?: boolean
}

export function DataTable<TData>({
  columns,
  data,
  loading,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : (header.column.columnDef.header as string)}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length}>
              Loading...
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {cell.getValue() as string}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length}>
              No data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
```

---

## ✅ 2. Cara Pakai (Typed per Entity)

Misalnya untuk User:

```tsx
type User = {
  id: number
  name: string
  email: string
}

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
```

```tsx
<DataTable<User>
  columns={userColumns}
  data={data}
/>
```

---

## 🔥 3. Kenapa Ini Powerful

Dengan pattern ini:

* 1 komponen bisa dipakai untuk:

  * Users
  * Products
  * Orders
* Type-safe (auto detect field)
* Flexible (custom cell render)

---

## ⚠️ 4. Upgrade Penting (Sering Dilupakan)

Kalau kamu serius pakai server-side, tambahin ini:

### a. Pagination State dari luar

```ts
manualPagination: true,
pageCount: Math.ceil(total / pageSize),
```

### b. Sorting server-side

```ts
manualSorting: true,
```

### c. Jangan pakai `getValue()` doang

Lebih proper:

```tsx
import { flexRender } from "@tanstack/react-table"

flexRender(
  cell.column.columnDef.cell,
  cell.getContext()
)
```

Kalau tidak, custom cell (button, badge, dll) bakal nggak jalan.

---

## 💡 5. Versi “Senior Level” (Biasanya di Production)

Biasanya komponen dibagi:

* `DataTable` → UI rendering
* `useDataTable` → state (pagination, sorting)
* `columns.ts` → definisi kolom per module

---

## 🚀 Kesimpulan

Ya, bukan cuma bisa—**ini memang best practice**:

* pass `columns`
* pass `data`
* pakai generic `<TData>`
* pisahkan logic & UI

---

Kalau mau, gue bisa bantu:

* bikin versi **full server-side (pagination + sorting + search)**
* atau bikin **DataTable reusable + toolbar + filter + debounce + URL sync**

Karena di situ biasanya mulai banyak jebakan 😄
