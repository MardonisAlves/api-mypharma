import { NestFactory } from '@nestjs/core';
import { ProductModule } from './productmodule/product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  await app.listen(3000);
}
bootstrap();
