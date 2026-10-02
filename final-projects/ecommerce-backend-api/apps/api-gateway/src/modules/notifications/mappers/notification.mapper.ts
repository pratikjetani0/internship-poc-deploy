import { NotificationDomain } from '../domain/notification.domain';
import { NotificationResponseDto } from '../dto/notification-response.dto';
import { NotificationEntity } from '../infrastructure/entities/notification.entity';

export class NotificationMapper {
  static toDomain(entity: NotificationEntity): NotificationDomain {
    return new NotificationDomain({
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      message: entity.message,
      type: entity.type,
      isRead: entity.isRead,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  static toResponse(domain: NotificationDomain): NotificationResponseDto {
    return {
      id: domain.id ?? '',
      userId: domain.userId,
      type: domain.type,
      title: domain.title,
      message: domain.message,
      isRead: domain.isRead,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
