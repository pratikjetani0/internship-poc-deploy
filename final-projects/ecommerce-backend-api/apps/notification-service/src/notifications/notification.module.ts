import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MailModule } from '../mail/mail.module';
import { NotificationRepository } from './repositories/notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), MailModule],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export class NotificationsModule {}
