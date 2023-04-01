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
     const checkproduct = await this.checkProductExists(createProduct.name);
      if(checkproduct){
        return{
          message:'Este produto ja esta cadastrado',
          status:HttpStatus.OK
        }
      }

      const create = await this.prisma.product.create({
        data:createProduct
      })
      
      if(create.id){
       await this.awsservice.createUploadAws(file , create.id)
          return {
            message:'produto criado com sucesso!',
            status:HttpStatus.CREATED
          }
      }
    } catch (error) {
      return error;
    }
    
   }

   async listAll(){
    try {
     return await this.prisma.product.findMany({
      include:{
        upload:true
      }
     }) 
    } catch (error) {
      return error
    }
   }

   async checkProductExists(name:string){
    try {
     return await this.prisma.product.findFirst({
        where:{
          name:name
        }
      })
    } catch (error) {
      return error
    }
   }

   async deleteUploadAws(key:string, prodId:string){
    try {
      const deleteaws = await this.awsservice.deleteUploadAws(key)
      if(deleteaws){
        await this.delereRecordaws(prodId)
        return{
          status:HttpStatus.OK,
          message: 'deletado com sucesso!'
        }
      }
    } catch (error) {
      return error
    }
   }

   async delereRecordaws(prodId:string){
    try {
      return await this.prisma.product.delete({
        where:{
          id:prodId
        },
        include:{
          upload:true
        }
      })
    } catch (error) {
      return error
    }
  }

  }