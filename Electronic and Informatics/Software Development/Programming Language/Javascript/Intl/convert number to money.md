# string to money

Menerima input number dan konversi ke string/readable currency

```js
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formattedPrice = formatter.format(2500);
console.log(formattedPrice); // Outputs: $2,500.00
```
