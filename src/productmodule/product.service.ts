import {  HttpStatus, Injectable } from '@nestjs/common';
import ProductDto from './productdto/product.dto';
import { PrismaService } from '../prismamodule/prismaService';


@Injectable()
export class ProductService {

  constructor(private prisma:PrismaService){}

  async createProduct(createProduct:ProductDto) {

    try {
      const create = await this.prisma.product.create({
        data:createProduct
      })
      // se for success upload aws da imagem
      return {
        create:create,
        status:HttpStatus.CREATED
      }
    } catch (error) {
      return error;
    }
    
   }
  }