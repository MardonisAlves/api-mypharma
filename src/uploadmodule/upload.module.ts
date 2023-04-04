import { Module } from '@nestjs/common';
import { PrismaModule } from '../prismamodule/prisma.module';
import { UploadService } from './upload.service';

@Module({
    imports:[PrismaModule],
    providers:[UploadService],
    exports:[UploadService]
})
export class UploadModule {}
