import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prismamodule/prisma.module';
import { AwsService } from './aws.service';

@Module({
    imports:[PrismaModule],
    providers:[AwsService]
})
export class AwsModule {}
