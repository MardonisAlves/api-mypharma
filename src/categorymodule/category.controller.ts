import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import CategoryDto from "./categorydto/category.dto";


@ApiTags('Category')
@Controller('api/v1/')
export class CategoryController {

  constructor(private readonly categoryService: CategoryService) { }


  @ApiOperation({summary: 'create category'})
  @Post('create/category')
  async createCategory(@Body() category:CategoryDto){
    try {
      return await this.categoryService.createCategory(category)
    } catch (error) {
      return error
    }
  }


  @ApiOperation({ summary: 'list caytegory' })
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

  @ApiOperation({ summary: 'list product by category' })
  @Get('list/category/:catId')
  async listCategoryById(@Param('catId') catId:string){
    try {
      return await this.categoryService.listCategoryByCategoryId(catId)
    } catch (error) {
      return error
    }
  }
}