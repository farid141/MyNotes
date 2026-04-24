# Penjelasan
Dalam aplikasi nest JS secara otomatis tergenerate beberapa file dan folder

## Folder /src

Berisi beberapa file:

- app.controller.ts	A basic controller with a single route.
- app.controller.spec.ts	The unit tests for the controller.
- app.module.ts	The root module of the application.
- app.service.ts	A basic service with a single method.
- main.ts	The entry file of the application which uses the core function NestFactory to create a Nest application instance.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// tambahkan objek berikut agar aplikasi nest tidak exit ketika error
{ abortOnError: false }
```