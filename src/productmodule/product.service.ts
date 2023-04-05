import {  HttpStatus, Injectable } from '@nestjs/common';
import ProductDto from './productdto/product.dto';
import { PrismaService } from '../prismamodule/prismaService';
import { UploadService } from '../uploadmodule/upload.service';


@Injectable()
export class ProductService {

  constructor(
    private prisma:PrismaService,
    private uploadservice:UploadService){}

 

  async createProduct(createProduct:ProductDto, file:Express.Multer.File) {

    try {
     const checkproduct = await this.checkProductExists(createProduct.name);
      if(checkproduct){
        return{
          product:checkproduct,
          message:'Este produto ja esta cadastrado',
          status:HttpStatus.OK
        }
      }

      const create = await this.prisma.product.create({
        data:createProduct
      })
      
      if(create.id){
       await this.uploadservice.recordUpload(file, create.id)
          return {
            products:create,
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
        upload:true,
        category:true
      }
     }) 
    } catch (error) {
      return error
    }
   }

   

   async listProductById(prodId:string){
    try {
     return await this.prisma.product.findUnique({
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


 

   async deleteUpload(fileId:string, prodId:string){
    try {
      const deleteaws = await this.uploadservice.deleteUploadImage(fileId)
      if(deleteaws){
        await this.delereRecordUpload(prodId)
        return{
          status:HttpStatus.OK,
          message: 'deletado com sucesso!'
        }
      }
    } catch (error) {
      return error
    }
   }

   async delereRecordUpload(prodId:string){
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