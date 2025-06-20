import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.CART_SERVICE_URL}/cart`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    const cart = await response.json();
    return NextResponse.json(cart);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(message, { status: 500 });
  }
}