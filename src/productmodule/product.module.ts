import {  Module } from '@nestjs/common';
import { ProductController } from './produc.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prismamodule/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AwsModule } from 'src/awsmodule/aws.module';


@Module({
  imports: [
      PrismaModule,
      ConfigModule.forRoot({isGlobal:true}),
      AwsModule],
  controllers: [ProductController],
  providers: [ProductService],
})


export class ProductModule {}