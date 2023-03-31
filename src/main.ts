import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './productmodule/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);

  await app.listen(process.env.PORT);

}
bootstrap();
