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

  const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, 'http://localhost:5173']
    : true;

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  const port = process.env.PORT || process.env.port || 3000;
  await app.listen(port);
}
bootstrap();
