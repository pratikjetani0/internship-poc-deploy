import { baseTemplate } from './base.template';

export function paymentSuccessTemplate(
  name: string,
  paymentId: string,
  amount: number,
) {
  return baseTemplate(
    '💳 Payment Successful',

    `
      <p>Hello <strong>${name}</strong>,</p>

      <p>
        We have received your payment successfully.
      </p>

      <div
        style="
          background:#ecfdf5;
          border:1px solid #10b981;
          border-radius:8px;
          padding:20px;
          margin:20px 0;
        "
      >
        <p>
          <strong>Payment ID</strong>
        </p>

        <p>
          ${paymentId}
        </p>

        <p>
          <strong>Amount Paid</strong>
        </p>

        <p>
          ₹${amount.toLocaleString('en-IN')}
        </p>
      </div>

      <p>
        Thank you for your purchase.
      </p>
    `,
  );
}
