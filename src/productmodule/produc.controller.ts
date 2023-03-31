import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/hello')
  getHello(): string {
    return this.productService.getHello();
  }
}
