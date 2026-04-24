# Clean Code

Mengorganisir code menjadi lebih efisien, readable dan maintainable. Ada beberapa cara, baik itu dari sisi penulisan code atau cara menentukan struktur folder.

## Sturktur Folder dan Code

Hal paling basic dalam membangun sebuah codebase yang bersih.

### Layered

Cara penulisan code yang membedakan lapisan:

- `Presentation` Berisi Input Output penggunaan suatu entitas
- `Business Logic` Berisi flow tentang apa saja yang dilakukan secara abstrak
- `Data Access` Berisi low level tentang suatu hal yang dilakukan

Beberapa rekomendasi gaya penulisan:

- try catch hanya di layer service
- controller urus response
- db tidak perlu di layer controller

### Atomic Design

Berguna untuk FE dalam aplikasi besar dimana detail dan ketelitian menjadi penting. Pembuatan sebuah komponen UI dicustom lebih mendetail dalam beberapa lapisan:

- `Atoms` sebuah komponen terkecil, seperti button, input, table. Biasanya dibuat untuk Shadcn
- `Molecules` gabungan atoms, seperti search bar (gabungan input dan button)
- `Organisms` gabungan molecules, fitur navbar bisa ditentukan mau pakai notif atau tidak, dll.
- `Template` gabungan organisms, sebuah page template misal perilakunya hampir sama, dibedakan dengan URL saat ini.
