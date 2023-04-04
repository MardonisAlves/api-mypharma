import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';
import { Response } from 'express';
import {ApiTags, ApiConsumes, ApiOperation, ApiResponse, ApiBody} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';
import CategoryDto from './productdto/category.dto';


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
    @UploadedFile() file:Express.Multer.File) {
    try {
     const create = await this.productService.createProduct(createProduct, file);
     return res.json(create)
    } catch (error) {
      return error
    }
  }

  @Post('create/category')
  async createCategory(@Body() category:CategoryDto){
    try {
      return await this.productService.createCategory(category)
    } catch (error) {
      
    }
  }


  @Get('list/products')
  @ApiOperation({ summary: 'Lista de produtos' })
  @ApiResponse({
    status:200,
    description:'retorna lista de produtos',
  })
  async listProducts(@Res() res:Response){
    try {
      const listall = await this.productService.listAll()
      return res.json(listall)
    } catch (error) {
      return error
    }
  }

  @ApiOperation({ summary: 'lista produdts byId' })
  @ApiResponse({
    status:200,
    description:'retorna um object',
  })
  @Get('list/product/:id')
  async listProductById(@Param('id') id:string){
    try {
     return await this.productService.listProductById(id)
    } catch (error) {
      return error
    }
  }

  @ApiOperation({summary: 'lista categorias'})
  @ApiResponse({
    status:200,
    description:'retorna um array de categorias'
  })
  @Get('list/category')
  async listCategory(){
    try {
      return await this.productService.listAllCategory();
    } catch (error) {
      return  error
    }
  }
}
