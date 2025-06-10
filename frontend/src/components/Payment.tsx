import { PaymentResult } from '@/types';

interface PaymentProps {
  processPayment: () => void;
  paymentResult: PaymentResult | null;
}

export default function Payment({ processPayment, paymentResult }: PaymentProps) {
  return (
    <>
      <h2>Payment</h2>
      <button onClick={processPayment} className="btn-pay">Pay Now</button>
      {paymentResult && (
        <div>
          <p><strong>Payment Status:</strong> {paymentResult.status}</p>
          <p><strong>Payment ID:</strong> {paymentResult.paymentId}</p>
          <p><strong>Amount Paid:</strong> ${paymentResult.amount}</p>
        </div>
      )}
    </>
  );
}