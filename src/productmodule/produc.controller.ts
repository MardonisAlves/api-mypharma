import { Body, Controller, Post, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';
import { Response } from 'express';


@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create/product')
 async createProduct(@Body() createProduct:ProductDto, @Res() res:Response) {
    try {
      const create = await this.productService.createProduct(createProduct);
      console.log(create);
      
      return res.json({create})
    } catch (error) {
      return error
    }
  }
}
