'use client';

import { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Payment from '../components/Payment';
import { Product, CartItem as CartItemType, PaymentResult } from '@/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCart(data);
      // Assuming the cart total is calculated on the frontend for simplicity
      // or you can create another API endpoint for the total
      const total = data.reduce((acc: number, item: CartItemType) => acc + item.price * item.quantity, 0);
      setCartTotal(total);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (product: Product) => {
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      await fetch(`/api/cart/${productId}`, { method: 'DELETE' });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch('/api/cart/clear', { method: 'DELETE' });
      fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const processPayment = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartID: Math.random().toString(8) }),
      });
      const data = await response.json();
      setPaymentResult(data);
      if (response.ok) {
        clearCart();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="container">
      <h1>Product Store</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} cartTotal={cartTotal} removeFromCart={removeFromCart} clearCart={clearCart} />
      <Payment processPayment={processPayment} paymentResult={paymentResult} />
    </div>
  );
}