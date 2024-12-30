import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { CartService, CartItem } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(
    @Body('productId') productId: number,
    @Body('name') name: string,
    @Body('quantity') quantity: number,
    @Body('price') price: number,
  ): CartItem {
    return this.cartService.addToCart(productId, name, quantity, price);
  }

  @Get()
  getCart(): CartItem[] {
    return this.cartService.getCart();
  }

  @Delete(':productId')
  removeFromCart(@Param('productId') productId: number): CartItem[] {
    return this.cartService.removeFromCart(Number(productId));
  }

  @Delete()
  clearCart(): CartItem[] {
    return this.cartService.clearCart();
  }

  @Get('total')
  getTotalPrice(): { totalPrice: number } {
    const cartItems = this.cartService.getCart();

    console.log("Cart Items: ", cartItems)

    const totalPrice = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    console.log("Total Price: ", totalPrice)

    return { totalPrice };
  }
}
