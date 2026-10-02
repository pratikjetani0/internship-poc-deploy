import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './infrastructure/entities/notification.entity';
import { NotificationController } from './controllers/notification.controller';
import { NotificationRepository } from './infrastructure/repositories/notification.repository';
import { NotificationService } from './services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity])],
  controllers: [NotificationController],
  providers: [NotificationRepository, NotificationService],
})
export class NotificationsModule {}
