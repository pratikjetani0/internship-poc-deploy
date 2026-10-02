import { baseTemplate } from './base.template';

export function orderCreatedTemplate(
  name: string,
  orderId: string,
  amount: number,
) {
  return baseTemplate(
    '🛒 Order Created',

    `
      <p>Hello <strong>${name}</strong>,</p>

      <p>
        Your order has been placed successfully.
      </p>

      <div
        style="
          background:#f9fafb;
          border:1px solid #e5e7eb;
          border-radius:8px;
          padding:20px;
          margin:20px 0;
        "
      >
        <p>
          <strong>Order ID</strong>
        </p>

        <p>
          ${orderId}
        </p>

        <p>
          <strong>Total Amount</strong>
        </p>

        <p>
          ₹${amount.toLocaleString('en-IN')}
        </p>
      </div>

      <p>
        We are preparing your order and will notify you once it ships.
      </p>
    `,
  );
}
