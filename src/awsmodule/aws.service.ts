import { HttpStatus, Injectable } from "@nestjs/common";
import { S3 } from 'aws-sdk';
import { PrismaService } from "../prismamodule/prismaService";
import { v4 as uuidv4 } from 'uuid';
import { Location } from "./location.interface";

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


  async createUploadAws(file: Express.Multer.File, Id: string) {
    try {

      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME_TEST,
        Body: file.buffer,
        Key: `${uuidv4()}-${file.originalname}`,
      }

      const upload:Location = await this.s3.upload(params).promise();
      if (upload.Location) {
        await this.recordUpload(upload, Id)
      }

    } catch (error) {
      return {
        ...error,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error interno'
      }

    }
  }

  async recordUpload(upload:Location, id:string){
    try {
     await this.prisma.upload.create({
        data:{
          bucket:upload.Bucket,
          key:upload.Key,
          location:upload.Location,
          prodId:id,

        }
      });
    } catch (error) {
      return error
    }
  }


  async deleteUploadAws(key:string){
    try {
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME_TEST,
        Key: key
      }
     return await this.s3.deleteObject(params).promise()
  
    } catch (error) {
      return error
    }
  }

}