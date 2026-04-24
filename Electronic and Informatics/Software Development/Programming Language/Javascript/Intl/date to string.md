# Date to String

Menerima input instance Date dan konversi ke string readable date

```js
// Specify date and time format using "style" options (i.e. full, long, medium, short)
  new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Australia/Sydney',
  }).format(date)
```
