## 1. Mendaftarkan komponen secara global

```javascript
// app.js
import { createApp } from "vue";
import App from "./App.vue";
import HelloWorld from "./components/HelloWorld.vue";

const app = createApp(App);
app.component("hello-world", HelloWorld);
app.mount("#app");
```

## 2. Mendaftarkan komponen secara Local

```html
<script setup>
  import ComponentA from "./ComponentA.vue";
</script>

<template>
  <ComponentA />
</template>
```

kita juga bisa import untuk fungsi helper dari sebuah module pada file ini, agar bisa digunakan di seluruh komponen
