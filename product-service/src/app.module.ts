import { Module } from '@nestjs/common';
import { ProductService } from './app.service';
import { ProductController } from './app.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
