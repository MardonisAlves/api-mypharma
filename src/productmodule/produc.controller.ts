import { Body, Controller, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';
import { Response } from 'express';
import {ApiTags, ApiConsumes, ApiOperation, ApiResponse} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Products')
@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/create/product')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload de arquivo' })
  @ApiResponse({ status: 201, description: 'Arquivo enviado com sucesso' })
  @ApiResponse({ status: 400, description: 'Requisição inválida' })
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() createProduct: ProductDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File) {
    try {
      
     const create = await this.productService.createProduct(createProduct, file);
     return res.json({ create })
    } catch (error) {
      return error
    }
  }
}
