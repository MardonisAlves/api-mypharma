import {  HttpStatus, Injectable } from '@nestjs/common';
import ProductDto from './productdto/product.dto';
import { PrismaService } from '../prismamodule/prismaService';
import { AwsService } from '../awsmodule/aws.service';

@Injectable()
export class ProductService {

  constructor(
    private prisma:PrismaService,
    private awsservice:AwsService){}

  async createProduct(createProduct:ProductDto, file:Express.Multer.File) {

    try {
      const create = await this.prisma.product.create({
        data:createProduct
      })
      
      if(create.id){
       await this.awsservice.createUploadAws(file , create.id)
          return {
            create:create,
            status:HttpStatus.CREATED
          }
      }
    } catch (error) {
      return error;
    }
    
   }
  }