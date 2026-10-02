import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../infrastructure/repositories/notification.repository';
import { NotificationMapper } from '../mappers/notification.mapper';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { Role } from '@app/common';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  //GET NOTIFICATIONS
  async getNotifications(user: JwtPayload) {
    const notifications =
      user.role === Role.ADMIN
        ? await this.notificationRepository.findAll()
        : await this.notificationRepository.findByUserId(user.sub);

    return notifications.map((notification) =>
      NotificationMapper.toResponse(notification),
    );
  }

  //GET NOTIFICATION BY ID
  async getNotificationById(user: JwtPayload, notificationId: string) {
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (user.role !== Role.ADMIN && notification.userId !== user.sub) {
      throw new NotFoundException('Notification not found');
    }

    return NotificationMapper.toResponse(notification);
  }

  //MARK AS READ
  async markAsRead(user: JwtPayload, notificationId: string) {
    const notification =
      await this.notificationRepository.findById(notificationId);

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (user.role !== Role.ADMIN && notification.userId !== user.sub) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationRepository.markAsRead(notificationId);

    return {
      message: 'Notification marked as read',
    };
  }

  // MARK ALL AS READ
  async markAllAsRead(user: JwtPayload) {
    if (user.role === Role.ADMIN) {
      await this.notificationRepository.markAll();
    } else {
      await this.notificationRepository.markAllAsRead(user.sub);
    }

    return {
      message: 'All notifications marked as read',
    };
  }
}
