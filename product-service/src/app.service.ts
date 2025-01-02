import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products: any[];

  constructor() {
    // Load products from the environment variable
    const productsJson = process.env.PRODUCTS_JSON;
    // TODO: It always return empty - FIX NEEDED
    this.products = productsJson ? JSON.parse(productsJson) : [];
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
