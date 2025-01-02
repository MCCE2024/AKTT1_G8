import { Injectable } from '@nestjs/common';

// Export the CartItem interface so it can be used in other files
export interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

@Injectable()
export class CartService {
  private cart: CartItem[] = [];

  addToCart(productId: number, name: string, quantity: number = 1, price: number): CartItem {
    const existingItem = this.cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ productId, name, quantity, price });
    }

    return this.cart.find(item => item.productId === productId)!;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  removeFromCart(productId: number): CartItem[] {
    this.cart = this.cart.filter(item => item.productId !== productId);
    return this.cart;
  }

  clearCart(): CartItem[] {
    this.cart = [];
    return this.cart;
  }
}
