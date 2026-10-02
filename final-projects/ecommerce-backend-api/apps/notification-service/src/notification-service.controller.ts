import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { NotificationService } from './notifications/notification.service';

@Controller()
export class NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern('user_registered')
  async handleUserRegistered(
    @Payload()
    data: {
      userId: string;
      email: string;
      name: string;
    },
  ) {
    await this.notificationService.sendWelcomeEmail(
      data.userId,
      data.email,
      data.name,
    );
  }

  @EventPattern('order_created')
  async handleOrderCreated(
    @Payload()
    data: {
      userId: string;
      email: string;
      name: string;
      orderId: string;
      amount: number;
    },
  ) {
    await this.notificationService.sendOrderCreatedEmail(
      data.userId,
      data.email,
      data.name,
      data.orderId,
      data.amount,
    );
  }

  @EventPattern('payment_success')
  async handlePaymentSuccess(
    @Payload()
    data: {
      userId: string;
      email: string;
      name: string;
      paymentId: string;
      amount: number;
    },
  ) {
    await this.notificationService.sendPaymentSuccessEmail(
      data.userId,
      data.email,
      data.name,
      data.paymentId,
      data.amount,
    );
  }
}
