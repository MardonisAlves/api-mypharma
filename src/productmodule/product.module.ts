import {  Module } from '@nestjs/common';
import { ProductController } from './produc.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prismamodule/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from 'src/uploadmodule/upload.module';
import { ModuleCategory } from 'src/categorymodule/category.module';
import { CategoryController } from 'src/categorymodule/category.controller';
import { CategoryService } from 'src/categorymodule/category.service';



@Module({
  imports: [
    ModuleCategory,
      PrismaModule,
      ConfigModule.forRoot({isGlobal:true}),
      UploadModule
    ],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, CategoryService],
})


export class ProductModule {}