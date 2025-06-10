import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
};

type PaymentResult = {
  status: string;
  paymentId: string;
  amount: number;
};

const PRODUCT_SERVICE_URL = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || "http://product-service:3001";
const CART_SERVICE_URL = process.env.NEXT_PUBLIC_CART_SERVICE_URL || "http://cart-service:3002";
const PAYMENT_SERVICE_URL = process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL || "http://payment-service:3003";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    const res = await fetch(`${PRODUCT_SERVICE_URL}/products`);
    if (res.ok) {
      setProducts(await res.json());
    }
  }

  async function fetchCart() {
    const res = await fetch(`${CART_SERVICE_URL}/cart`);
    if (res.ok) {
      setCart(await res.json());
      fetchCartTotal();
    }
  }

  async function fetchCartTotal() {
    const res = await fetch(`${CART_SERVICE_URL}/cart/total`);
    if (res.ok) {
      const data = await res.json();
      setCartTotal(data.totalPrice);
    }
  }

  async function addToCart(product: Product) {
    await fetch(`${CART_SERVICE_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, name: product.name, quantity: 1, price: product.price }),
    });
    fetchCart();
  }

  async function removeFromCart(productId: number) {
    await fetch(`${CART_SERVICE_URL}/cart/${productId}`, { method: "DELETE" });
    fetchCart();
  }

  async function clearCart() {
    await fetch(`${CART_SERVICE_URL}/cart`, { method: "DELETE" });
    fetchCart();
  }

  async function processPayment() {
    const res = await fetch(`${PAYMENT_SERVICE_URL}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartID: Math.random().toString(8) }),
    });
    if (res.ok) {
      setPaymentResult(await res.json());
      clearCart();
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Product Store</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
        {products.map((product) => (
          <div key={product.id} style={{
            background: "#fff", border: "1px solid #ddd", borderRadius: 8, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center"
          }}>
            <img src={`https://via.placeholder.com/300x200?text=${product.name}`} alt="Product" style={{ width: "100%", height: 200, objectFit: "cover", borderBottom: "1px solid #ddd" }} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button style={{ background: "#007bff", color: "#fff", border: "none", padding: "12px 20px", borderRadius: 5, cursor: "pointer" }}
              onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ textAlign: "center", marginTop: 40 }}>Your Cart</h2>
      {cart.length > 0 ? (
        <div style={{ background: "#fff", padding: 20, borderRadius: 8, boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginTop: 20 }}>
          {cart.map((item) => (
            <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #ddd" }}>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <button style={{ background: "#dc3545", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 5, cursor: "pointer" }}
                onClick={() => removeFromCart(item.productId)}>
                Remove
              </button>
            </div>
          ))}
          <h3>Cart Total: ${cartTotal}</h3>
          <button onClick={clearCart} style={{ background: "#f44336", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 5, cursor: "pointer", marginRight: 10 }}>
            Clear Cart
          </button>
        </div>
      ) : (
        <div style={{ fontSize: "1.2rem", color: "#6c757d", textAlign: "center", marginTop: 20 }}>Your cart is empty.</div>
      )}

      <h2 style={{ textAlign: "center", marginTop: 40 }}>Payment</h2>
      <button onClick={processPayment} style={{ background: "#4caf50", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 5, cursor: "pointer" }}>
        Pay Now
      </button>
      {paymentResult && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Payment Status:</strong> {paymentResult.status}</p>
          <p><strong>Payment ID:</strong> {paymentResult.paymentId}</p>
          <p><strong>Amount Paid:</strong> ${paymentResult.amount}</p>
        </div>
      )}
    </div>
  );
}
