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
    name: 'iogute',
    price: '2.99',
    description: 'iogute morango sem adocante',
    stock: "20",
    category: 'laticinios',
    file: undefined
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
    it('deve criar um object!', async() => {
     await productService.createProduct(create, FileBuffer)
      .then((res => {
        if(res.status === 200){
          expect(res.message).toEqual('Este produto ja esta cadastrado')
          expect(res.status).toBe(200)
        }else{
          expect(res.message).toEqual('produto criado com sucesso!')
          expect(res.status).toBe(201)
        }
      }))
    });
  });
  

  let deleteupload:any =''

  describe('list produtcs', () => {
    it('deve retonar lista de object!', async() => {
      await productService.listAll()
       .then((res => {  
        deleteupload = {
          prodid: res[0]?.id,
          key: res[0]?.upload?.key
        }            
         expect(res[0]?.category).toContain(create.category)
       }))
     });
    
  })


  describe('delete produtc', () => {
    it('deve deletar product!', async() => {
      await productService.deleteUploadAws(deleteupload.key, deleteupload.prodid)
       .then((res => {   
        expect(res.message).toEqual('deletado com sucesso!')
        expect(res.status).toBe(200)
       }))
     });
    
  })
});
