import { HttpStatus, Injectable } from "@nestjs/common";
import { S3 } from 'aws-sdk';
import { PrismaService } from "src/prismamodule/prismaService";
import { v4 as uuidv4 } from 'uuid';

@Injectable()

export class AwsService {

  private s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
    ,
    region: process.env.AWS_REGION
  })

  constructor(private readonly prisma: PrismaService) { }


  async createUploadAws(file: Express.Multer.File, Id: number) {
    try {

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME_TEST,
        Body: file.buffer,
        Key: `${uuidv4()}-${file.originalname}`,
      }

      const upload = await this.s3.upload(params).promise();
      if (upload.Location) {
        //return await this.registerUrlAws(upload, Id);
        return upload
      }

    } catch (error) {
      return {
        ...error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno'
      }

    }
  }
}