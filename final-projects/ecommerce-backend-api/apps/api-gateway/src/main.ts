import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './app.module';
import cookieParser from 'cookie-parser';
import { setupSwagger } from '@app/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
