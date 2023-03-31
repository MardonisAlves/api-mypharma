import { Inject, Module } from '@nestjs/common';
import { ProductController } from './produc.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prismamodule/prisma.module';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [ProductController],
  providers: [ProductService],
})


export class ProductModule {

  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  async onApplicationShutdown(signal: string) {
    await this.prisma.$disconnect();
}
 }