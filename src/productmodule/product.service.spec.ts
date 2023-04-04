import { Test, TestingModule } from '@nestjs/testing';
import { UploadModule } from '../uploadmodule/upload.module';
import { Readable } from 'stream';
import { PrismaModule } from '../prismamodule/prisma.module';
import { ProductController } from './produc.controller';
import { ProductService } from './product.service';
import ProductDto from './productdto/product.dto';


describe('ProductService', () => {
  jest.setTimeout(30000)

  let productService: ProductService

 

  const img = Buffer.from('./client/iogute.png');
  const FileBuffer: Express.Multer.File = {
    fieldname: "",
    originalname: "iogute.png",
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
      imports: [PrismaModule, UploadModule],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });


  describe('unit test product', () => {
    const category:any = [ { id: '642c1e5eb40173132476ad0f', category: 'Laticinios' } ]

    let catId:any=''
    it('create category', async () => {
      await productService.createCategory('Laticinios')
      .then((res:any) => {
        if(res.status === 200){
          catId= res.catId
          expect(res.message).toEqual('Categoria ja existe!')
          expect(res.status).toBe(200)
        }else{
          catId = res.catId
          expect(res.message).toEqual('categoria criada com sucesso!')
          expect(res.status).toBe(201)
        }
      })
    })

    it('deve retornar um array categoria', async() => {
      await productService.listAllCategory()
      .then((res) => {
        expect(res).toMatchObject(category)
      })
    })

    let createproduct: any = ''
    it('deve criar um object!', async () => {
      const create: ProductDto = {
        name: 'iogute',
        price: '2.99',
        description: 'iogute morango sem adocante',
        stock: "20",
        file: undefined,
        catId: catId
      }
      await productService.createProduct(create, FileBuffer)
        .then((res => {
          if (res.status === 200) {
            createproduct = res
            expect(res.message).toEqual('Este produto ja esta cadastrado')
            expect(res.status).toBe(200)
          } else {
            createproduct = res
            expect(res.message).toEqual('produto criado com sucesso!')
            expect(res.status).toBe(201)
          }
        }))
    });


    let list:any = ''
    it('deve retonar array de object!', async () => {
      await productService.listAll()
        .then((res => {
          list = res
          expect(res[0]?.name).toContain(createproduct?.products.name)
        }))
    });


    it('deve retornat um object byId', async () => {
      await productService.listProductById(list[0]?.id)
        .then((res => {
          expect(res).toMatchObject(list[0])
        }))
    });


    it('deve deletar product!', async () => {
      await productService.deleteUpload(list[0]?.upload?.fileid, list[0]?.id)
        .then((res => {
          expect(res.message).toEqual('deletado com sucesso!')
          expect(res.status).toBe(200)
        }))
    });
  });

});
