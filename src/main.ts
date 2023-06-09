import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './productmodule/product.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({origin:'*'})
  const config = new DocumentBuilder()
    .setTitle('API MYPHARMA')
    .setDescription('api list products v1')
    .setVersion('v1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/doc', app, document);


  await app.listen(process.env.PORT);

}
bootstrap();
