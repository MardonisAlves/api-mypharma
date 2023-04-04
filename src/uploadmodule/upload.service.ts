import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prismamodule/prismaService";
import {Location } from './../uploadmodule/location.interface'
let ImageKit = require("imagekit");


@Injectable()

export class UploadService {


  constructor(private readonly prisma: PrismaService) { }

  async recordUpload(file: Express.Multer.File, id: string) {
    try {
      const upload = await this.uploadImage(file)
      if(upload.url){
        await this.prisma.upload.create({
          data: {
            location: upload.url,
            prodId: id,
            fileid: upload.fileId
          }
        });

      }
    } catch (error) {
      return error
    }
  }

  async uploadImage(file: Express.Multer.File) {
      let imagekit = new ImageKit({
        privateKey: `${process.env.PRIVATE_KEY}`,
        publicKey: `${process.env.PUBLIC_KEY}`,
        urlEndpoint: `${process.env.URL_END_POINT}`,
      })

     const upload:Location  = await imagekit.upload({
        file: file.buffer,
        fileName: file.originalname,   
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95
          }
        ]
      }).then((response:Location) => {
        return response
      }).catch((error:any) => {       
        return error
      });

      return upload
  }


  async deleteUploadImage(fileId: string) {
      let imagekit = new ImageKit({
        privateKey: `${process.env.PRIVATE_KEY}`,
        publicKey: `${process.env.PUBLIC_KEY}`,
        urlEndpoint: `${process.env.URL_END_POINT}`,
      })
      
   return await  imagekit.deleteFile(fileId).then(response => {
        return response
    }).catch(error => {
        console.log(error);
        return error
    });
  }

}