export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface PaymentResult {
  status: string;
  paymentId: string;
  amount: number;
}