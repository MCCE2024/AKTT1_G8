import { Module } from '@nestjs/common';
import { ProductService } from './app.service';
import { ProductController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
