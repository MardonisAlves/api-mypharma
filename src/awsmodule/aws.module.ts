import { Module } from '@nestjs/common';
import { PrismaModule } from '../prismamodule/prisma.module';
import { AwsService } from './aws.service';

@Module({
    imports:[PrismaModule],
    providers:[AwsService],
    exports:[AwsService]
})
export class AwsModule {}
