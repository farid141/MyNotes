# React Native

Memiliki konsep development yang hampir mirip dengan react:

- file based routing
- component driven architecture
- API routes
- react server components
- styling tailwind <https://www.nativewind.dev/> atau prop style berisi obj

## Rilis Versi Baru

react native support OTA update, sehingga tidak perlu upload playstore untuk rilis aplikasi

## Component

komponen yang ada:

- `View` untuk bikin layout (flexbox default, bisa pakai style flexbox)
- `Touchable` / `TouchableWithoutFeedback` button uda ada style ketika click
- `ActivityIndicator` loading
- `FlatList` untuk list panjang scrollable
- `ScrollView` untuk bungkus komponen ke container scrollable
- `SafeView` agar kontainer tidak memotong notch dan navigation pada HP

appwrite for backend?

## Intro Environment

- `app.json` konfigurasi aplikasi
- `scripts/reset.js` menghapus template example awal `npm run reset-project`
- `app` folder `file-based routing`

## Trik

`rnfes` generate base code untuk file baru

## Routing

Pakai komponen `Link`, bisa kasih parameter (sama seperti web react) `useLocalSearchParams`
pelajari groups route `(groupname)`

debugging:

1. bisa lihat di terminal yang menjalankan server. Namun hanya ada stack trace dan nama komponen tanpa informasi lebih detail (baris, kolom dll)
2. masuk ke "menu" klik "m" akan muncul menu pada aplikasi, dan pilih "debug remote js" akan terbuka chrome dan buka open chrome dev tools
3. install locally "npm install -g react-devtools", jalankan "react-devtools" dan buka debug remote js seperti cara 2