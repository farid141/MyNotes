# Penjelasan

Dalam satu controller bisa terdapat beberpaa routing, ditulis menggunakan decorater @Controller

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get('all')
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

Code diatas, parameter dari @Controller() merupakan prefix dari route, kemudian decorator @Get() bisa saja menerima string. URL yang terbentuk adalah kombinasi dari param @Controller dan param @Method. Code di atas akan menghasilkan `GET cats/all`

## Membuat controller
Dapat dilakukan dengan nest CLI
```bash
nest g controller [name]

# Membuat controller CRUD dengan validasi dasar
nest g resource [name]
```