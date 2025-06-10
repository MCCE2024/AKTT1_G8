import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: number }> }
) {
  try {
    const productId = (await params).productId;
    const response = await fetch(`${process.env.CART_SERVICE_URL}/cart/${productId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove product from cart');
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(message, { status: 500 });
  }
}