import { CartItem as CartItemType } from '@/types';
import CartItem from './CartItem';

interface CartProps {
  cart: CartItemType[];
  cartTotal: number;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export default function Cart({ cart, cartTotal, removeFromCart, clearCart }: CartProps) {
  return (
    <>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div className="cart">
          {cart.map(item => (
            <CartItem key={item.productId} item={item} removeFromCart={removeFromCart} />
          ))}
          <h3>Cart Total: ${cartTotal}</h3>
          <button onClick={clearCart} className="btn-clear">Clear Cart</button>
        </div>
      ) : (
        <div className="empty-cart">Your cart is empty.</div>
      )}
    </>
  );
}