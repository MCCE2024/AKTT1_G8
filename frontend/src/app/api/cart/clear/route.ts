import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const response = await fetch(`${process.env.CART_SERVICE_URL}/cart`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to clear cart');
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(message, { status: 500 });
  }
}