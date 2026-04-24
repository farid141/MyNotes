# Material UI

Melakukan instalasi `npm install @mui/material @emotion/react @emotion/styled`. MaterialUI menggunakan emotion sebagai default styling engine

```jsx
import { css } from '@emotion/css'

const color = 'white'

render(
  <div
    className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
  >
    Hover to change color.
  </div>
)
```

menggunakan css in JS untuk styling

Buat hook

```jsx
const useStyles=makeStyles((theme)=>({
 containerClass: {
  backgroundColor: theme.pallete
 }
}))
```

Panggil hook dalam komponen

```jsx
const classes = useStyles();

return <>
 <CSSBase />
 <div className={classes.containerClass}></>
</>
```

Kita dapat menggunakan value property dengan nilai yang sudah dimiliki Material UI melalui obj theme
