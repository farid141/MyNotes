# Penjelasan

keuntungan tailwindcss vs inline-styling:
- tailwind bisa untuk pseudo classes, inline tidak, jika membuat class-selector styling tidak praktis
- tailwind bisa untuk media query, inline tidak, jika membuat class-selector styling tidak praktis
- lean and efficient (hanya membuat class selector yang digunakan pada halaman saja) dengan just-in-time compiler

## Prettier Formatter untuk TailwindCSS

1. Install prettier plugin as dev dependency
  ```
  npm install -D prettier prettier-plugin-tailwindcss
  ```
2. add the following line in prettier configuration
  ```js
  {
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```

## Kustomisasi CSS
### Modifikasi base style (tag element dasar)
  ```css
  @layer base {
    h1 {
      font-size: var(--text-2xl);
    }
    ...
  }
  ```


### Membuat utility class
  
  a. Dengan CSS atribut
  ```css
  @layer components {
    .card {
      background-color: var(--color-white);
      border-radius: var(--rounded-lg);
      padding: var(--spacing-6);
      box-shadow: var(--shadow-xl);
    }
  }
  ```

 b. Dengan utility-class TailwindCSS

  ```css
  @layer components{
    .select2-results__group{
      @apply text-lg font-bold text-gray-700	
    }
  }
  ```


### Memodifikasi utility TailwindCSS (padding, typography dll)
  ```css
  @layer utilities {
    .flex-center {
      @apply flex justify-center items-center;
    }

    .text-gradient {
      @apply bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500;
    }
  }
  ```

### Arbitrary value

```html
<div class="w-[732px] text-[min(10vw,70px)]"></div>
```

### breaking changes pada tailwind v4 berupa perubahan directive 
  ```css
  @theme{
    --new-color: #232332
  }
```

## Dark Mode
memodifikasi class root element dengan menambahkan prefix `dark:`

```js
// Pastikan Darkmode active
module.exports = {
  darkMode: 'class', // atau 'media'
}
```


## Mengubah aksen
Aksen adalah sebuah warna dari suatu element HTML, seperti checkbox, slider, select, dll. Kita dapat mengeditnya dengan utility class TailwindCSS
```
class= accent-color-xxx
```

# Fluid text 
ukuran text dinamis berdasarkan view port
```
text-[min(10vw, 70px)]
```

## Tips belajar tailwind css
- Gunakan fitur pencarian di https://tailwindcss.com/docs dengan mengetik nama properti CSS biasa (misal: padding, box-shadow, text-align).

- Gunakan plugin VSCode seperti:
  - Tailwind CSS IntelliSense

  - Headwind (untuk auto-sort class)

- Coba utility playground seperti https://play.tailwindcss.com