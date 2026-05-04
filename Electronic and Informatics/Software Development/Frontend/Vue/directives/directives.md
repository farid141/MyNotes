merupakan attribute HTML khusus pada vue.

# Sintaks

```
directive:argument.modifier=value
```

## Directive

`v-on, v-for, v-if` dll.

## Arguments

Beberapa directive dapat memiliki argument dapat berupa statis/dinamis, ditandai dengan tanda `:` setelah directive.

### Static

nama yang sudah ditetapkan

### Dynamic

menggunakan javascript expression yang terhubung dengan property komponen. Disertai kurung siku `:[argumentName]`

# Modifier

merupakan sebuah _postfix_ special dalam directive yang mengikuti aturan masing-masing directive

v-for="link in links" untuk looping komponen
links = [{link:'asd', name:'Asd'}]
untuk perulangan, tambahkan atribut :key="" nilainya unik, bisa index
sehingga <v-for="(link, index) in links" v-key="index">
