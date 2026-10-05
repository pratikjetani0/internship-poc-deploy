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
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      // Dynamically reflect origin to support any Vercel domain and localhost
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With'],
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  const port = process.env.PORT || process.env.port || 3000;
  await app.listen(port);
}
bootstrap();

