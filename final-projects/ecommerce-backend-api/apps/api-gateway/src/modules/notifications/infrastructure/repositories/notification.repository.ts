import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from '../entities/notification.entity';
import { Repository } from 'typeorm';
import { NotificationDomain } from '../../domain/notification.domain';
import { NotificationMapper } from '../../mappers/notification.mapper';

@Injectable()
export class NotificationRepository {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly repository: Repository<NotificationEntity>,
  ) {}

  //FIND BY USER ID
  async findByUserId(userId: string): Promise<NotificationDomain[]> {
    const notifications = await this.repository.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return notifications.map((notification) =>
      NotificationMapper.toDomain(notification),
    );
  }

  //FIND BY ID
  async findById(id: string): Promise<NotificationDomain | null> {
    const notification = await this.repository.findOne({
      where: { id },
    });

    return notification ? NotificationMapper.toDomain(notification) : null;
  }

  //MARK AS READ
  async markAsRead(id: string): Promise<void> {
    await this.repository.update(id, {
      isRead: true,
    });
  }

  //MARK AS ALL READ
  async markAllAsRead(userId: string): Promise<void> {
    await this.repository.update(
      {
        userId,
      },
      {
        isRead: true,
      },
    );
  }

  // GET ALL NOTIFICATIONS
  async findAll(): Promise<NotificationDomain[]> {
    const notifications = await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return notifications.map((notification) =>
      NotificationMapper.toDomain(notification),
    );
  }

  // MARK ALL AS READ (ADMIN)
  async markAll(): Promise<void> {
    await this.repository.update(
      {
        isRead: false,
      },
      {
        isRead: true,
      },
    );
  }
}
