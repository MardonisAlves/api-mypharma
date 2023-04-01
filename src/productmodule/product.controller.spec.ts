import { Test, TestingModule } from '@nestjs/testing';
import { AwsModule } from '../awsmodule/aws.module';
import { Readable } from 'stream';
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
    estoque:"20",
    categoria:'laticinios',
  }

  const img = Buffer.from('./client/iogute.png');
  const FileBuffer: Express.Multer.File = {
      fieldname: "",
      originalname: "pizza-calabresa2.jpeg",
      encoding: "",
      mimetype: "",
      size: 0,
      stream: new Readable,
      destination: "",
      filename: "",
      path: "",
      buffer: img
  }

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule, AwsModule],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productService =  app.get<ProductService>(ProductService);
  });

  describe('create product', () => {
    it('deve retonar um object!', async() => {
     await productService.createProduct(create, FileBuffer)
      .then((res => {
        expect(res.create.name).toEqual(create.name)
        expect(res.status).toBe(201)
      }))
    });

  });
});
