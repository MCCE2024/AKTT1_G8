import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class ProductService {
  private products: any[];

  constructor(private prisma: PrismaService) {

  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    return product;
  }
}
