import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import CategoryDto from "src/productmodule/productdto/category.dto";
import { CategoryService } from "./category.service";

@ApiTags('Category')
@Controller('api/v1/')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }



  @Post('create/category')
  async createCategory(@Body() category:CategoryDto){
    try {
      return await this.categoryService.createCategory(category)
    } catch (error) {
      
    }
  }


  @ApiOperation({ summary: 'lista categorias' })
  @ApiResponse({
    status: 200,
    description: 'retorna um array de categorias'
  })
  @Get('list/category')
  async listCategory() {
    try {
      return await this.categoryService.listAllCategory();
    } catch (error) {
      return error
    }
  }
}