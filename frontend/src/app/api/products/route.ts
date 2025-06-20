import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return NextResponse.json(products);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(message, { status: 500 });
  }
}