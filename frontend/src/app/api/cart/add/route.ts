import { NextResponse } from 'next/server';
import { Product } from '@/types';

export async function POST(request: Request) {
  try {
    const product: Product = await request.json();
    const response = await fetch(`${process.env.CART_SERVICE_URL}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, name: product.name, quantity: 1, price: product.price }),
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(message, { status: 500 });
  }
}