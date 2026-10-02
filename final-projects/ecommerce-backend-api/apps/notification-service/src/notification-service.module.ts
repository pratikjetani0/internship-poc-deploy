import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotificationServiceController } from './notification-service.controller';
import { NotificationsModule } from './notifications/notification.module';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    NotificationsModule,
  ],

  controllers: [NotificationServiceController],
})
export class NotificationServiceModule {}
