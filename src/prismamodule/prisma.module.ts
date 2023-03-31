

import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class PrismaModule {}
