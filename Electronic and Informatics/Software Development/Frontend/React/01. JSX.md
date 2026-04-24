# 📝 Catatan Penting Seputar JSX Attribute

1. ## **Kenapa Tidak Sama Seperti HTML Biasa?**

   - JSX ditulis **dalam JavaScript**, jadi kalau kita pakai atribut seperti `class` atau `for`, itu bisa **bentrok** dengan keyword JavaScript (`class` adalah keyword untuk class declaration).
   - Maka dari itu, React mengganti:
     - `class` → `className`
     - `for` → `htmlFor` (biasanya dipakai di `<label>`)

2. ## **CamelCase untuk Event dan Boolean**

   - React menggunakan konvensi **camelCase** untuk event handler dan atribut:
     - `onclick` → `onClick`
     - `onchange` → `onChange`
   - Termasuk atribut boolean seperti:
     - `readonly` → `readOnly`
     - `checked` → tetap `checked`, tapi nilainya ditulis sebagai `{true}` atau `{false}`

3. ## **Properti DOM, Bukan Atribut HTML**

   - JSX sebenarnya lebih dekat ke **DOM properties**, bukan atribut HTML mentah.
   - Jadi, React menyarankan kita berpikir dalam konteks JavaScript object, bukan sekadar tag HTML.

4. ## **Case Sensitive**

   - Atribut di JSX **bersifat case-sensitive**, beda dengan HTML biasa yang lebih longgar.
   - Misalnya, `tabIndex` harus ditulis dengan “I” besar, bukan `tabindex`.

5. ## **Hanya menampung satu element**

   - Element terluar hanya ada satu saja
   - Bisa gunakan fragment sebagai pembungkus agar tidak error `<> </>`
