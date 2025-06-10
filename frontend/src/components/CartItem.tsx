import { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  removeFromCart: (productId: number) => void;
}

export default function CartItem({ item, removeFromCart }: CartItemProps) {
  return (
    <div className="cart-item">
      <p>{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => removeFromCart(item.productId)}>Remove</button>
    </div>
  );
}