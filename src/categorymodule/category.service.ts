import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prismamodule/prismaService";
import CategoryDto from "../productmodule/productdto/category.dto";

@Injectable()
export class CategoryService{

    constructor(private readonly prisma:PrismaService){}

    async createCategory(category:CategoryDto){
      try {
        const createCategory = await this.checkCategoryExistes(category);
        if(createCategory?.id){
          return{
            catId:createCategory.id,
            status:HttpStatus.OK,
            message:'Categoria ja existe!'
          }
        }
       const create = await this.prisma.category.create({
          data:{
            category:category.category
          }
        })
        return {
          catId:create.id,
          status:HttpStatus.CREATED,
          message: 'categoria criada com sucesso!'
        }
      } catch (error) {
        return error
      }
    }

    async checkCategoryExistes(category:CategoryDto){
      try {
        return await this.prisma.category.findFirst({
          where:{
            category:category.category
          }
        })
      } catch (error) {
        return error
      }
     }

   async listAllCategory(){
    try {
      return await this.prisma.category.findMany({})
    } catch (error) {
      return error
    }
   }
}

