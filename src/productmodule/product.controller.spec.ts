import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../prismamodule/prisma.module';
import { ProductController } from './produc.controller';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';


describe('ProductService', () => {
  
  let productService: ProductService
  const create:ProductDto = {
    name:'iogute',
    price:'2.99',
    description:'iogute morango sem adocante',
    estoque:20,
    categoria:'laticinios',
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productService =  app.get<ProductService>(ProductService);
  });

  describe('create product', () => {
    it('deve retonar um object!', async() => {
     await productService.createProduct(create)
      .then((res => {
        expect(res.name).toEqual(create.name)
        expect(res.status).toBe(201)
      }))
    });

  });
});
