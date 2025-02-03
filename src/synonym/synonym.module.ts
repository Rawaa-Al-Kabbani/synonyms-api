import { Module } from '@nestjs/common';
import { SynonymService } from './synonym.service';
import { SynonymResolver } from './synonym.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [SynonymResolver, SynonymService, PrismaService],
})
export class SynonymModule {}
