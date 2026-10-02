import { Injectable } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { welcomeTemplate } from '../mail/templates/welcome.template';
import { orderCreatedTemplate } from '../mail/templates/order-created.template';
import { paymentSuccessTemplate } from '../mail/templates/payment-success.template';
import { NotificationType } from '@app/common';
import { NotificationRepository } from './repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async sendWelcomeEmail(userId: string, email: string, name: string) {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.USER_REGISTERED,
      title: 'Welcome',
      message: `Hello ${name}, Welcome to E-Commerce Platform`,
    });

    await this.mailService.sendMail(email, 'Welcome', welcomeTemplate(name));
  }

  async sendOrderCreatedEmail(
    userId: string,
    email: string,
    name: string,
    orderId: string,
    amount: number,
  ) {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.ORDER_CREATED,
      title: 'Order Created',
      message: `Hello ${name}, your order ${orderId} was created successfully`,
    });

    await this.mailService.sendMail(
      email,
      'Order Created',
      orderCreatedTemplate(name, orderId, amount),
    );
  }

  async sendPaymentSuccessEmail(
    userId: string,
    email: string,
    name: string,
    paymentId: string,
    amount: number,
  ) {
    await this.notificationRepository.create({
      userId,
      type: NotificationType.PAYMENT_SUCCESS,
      title: 'Payment Successful',
      message: `Hello ${name}, your payment ${paymentId} was successful`,
    });

    const html = paymentSuccessTemplate(name, paymentId, amount);

    await this.mailService.sendMail(email, 'Payment Successful', html);
  }
}
