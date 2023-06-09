import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';
import { Response } from 'express';
import {ApiTags, ApiConsumes, ApiOperation, ApiResponse,} from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Products')
@Controller('api/v1')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('/create/product')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'create product and file upload' })
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

  @Get('list/products')
  @ApiOperation({ summary: 'List products' })
  @ApiResponse({
    status:200,
    description:'return list products',
  })
  async listProducts(@Res() res:Response){
    try {
      const listall = await this.productService.listAll()
      return res.json(listall)
    } catch (error) {
      return error
    }
  }

  @ApiOperation({ summary: 'list products by Id' })
  @ApiResponse({
    status:200,
    description:'return array object',
  })
  @Get('list/product/:id')
  async listProductById(@Param('id') id:string){
    try {
     return await this.productService.listProductById(id)
    } catch (error) {
      return error
    }
  }

  @ApiOperation({ summary: 'filter products by name' })
  @ApiResponse({
    status:200,
    description:'return array objet',
  })
  @Get('filter/product/:name')
  async filterproductsByName(@Param('name') name:string){
    try {
      return await this.productService.filterProductByName(name)
    } catch (error) {
      return error
    }
  }


  @ApiOperation({ summary: 'filter products by lowest price' })
  @ApiResponse({
    status:200,
    description:'return array object',
  })
  @Get('product/lowestprice')
  async filterproductsByLowestPrice(){
    try {
     return await this.productService.filterProductByLowestPrice()
    } catch (error) {
      return error
    }
  }

  @ApiOperation({ summary: 'filter products by bigges price' })
  @ApiResponse({
    status:200,
    description:'return array object',
  })
  @Get('products/biggesprice')
  async listProductsBiggesPrice(){
    try {
      return await this.productService.filterProductBiggesPrice()
    } catch (error) {
      return error
    }
  }
  
}
