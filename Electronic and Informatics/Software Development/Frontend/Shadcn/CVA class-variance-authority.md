# CVA (class-variance-authority)

Ketika UI sudah jadi, biasanya kita hanya menggunakan beberapa warna saja untuk style komponen. Biasanya komponen menerima higher level setting dari prop, seperti "danger", dll.

CVA dapat mempermudah itu:

- mengatur apa saja class yang akan diterapkan berdasarkan props
- merangkum class default yang akan diterapkan ke semua varian sehingga class yang akan diterapkan untuk variant khusus semakin sedikit

## Bantuan Typescript

membuat komponen dengan typescript dapat memberikan saran prop yang tersedia untuk element tersebut pada IDE.

```js
function Button({custField1, custField2, custField3, ...props}: ButtonProps)
```

<https://github.com/brookslybrand/cva-component-demo>

## 🎯 What CVA Is Used For

- Build **base components** with reusable class logic.
- Define **variants** (like size, color, intent, etc.) for those components.
- Avoid messy `clsx`/`classnames` logic scattered everywhere.
- Write **clean, scalable** component styles—especially in design systems.
- Works beautifully with **TypeScript** to give you typed variants and autocomplete.

---

## 🧱 Example: Basic Button with Variants

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const button = cva("inline-flex items-center justify-center font-semibold", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-black",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

// Then in your component:
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

const Button = ({ intent, size, className, ...props }: ButtonProps) => {
  return (
    <button className={button({ intent, size, className })} {...props} />
  );
};
```

This way you can use:

```tsx
<Button intent="secondary" size="sm">Click Me</Button>
```

Tailwind classes are applied **based on your props**, keeping your JSX and styles clean.

---

### ✅ Why Use CVA?

- DRY up your Tailwind styles.
- Avoid duplication across your components.
- Centralize your design tokens (like sizes, intents, etc.)
- Fully typed with TypeScript.
- Makes components super maintainable.