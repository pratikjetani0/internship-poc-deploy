# Ecommerce Backend API

REST API for the ecommerce platform built with NestJS.

## Tech Stack

- **NestJS 11** with TypeScript
- **TypeORM + PostgreSQL**
- **JWT** authentication (access + refresh tokens, bcrypt hashing)
- **Swagger** for API docs
- **RabbitMQ** for async event handling
- **Nodemailer** for email notifications

## Structure

- `apps/api-gateway` - main REST API (port `3000`)
- `apps/notification-service` - handles RabbitMQ events and sends emails (port `3001`)
- `libs/common` - shared enums, DTOs and filters
- `libs/database` - shared TypeORM setup and base entities

## Modules

Auth, User, Products, Cart, Orders, Payments, Notifications, Admin Dashboard.

## Setup

```bash
npm install
```

Create a `.env` file (see `.env` for reference):

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=your_db_name

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

RABBITMQ_URL=amqp://guest:guest@localhost:5672
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
SMTP_FROM=Ecommerce <your_email>
```

Start RabbitMQ and PostgreSQL locally, then run:

```bash
npm run start:all
```

Swagger docs are available at `http://localhost:3000/docs`.

## Scripts

- `npm run start` - run in production mode
- `npm run start:all` - run api-gateway + notification-service (watch mode)
- `npm run build` - compile the project
- `npm run lint` - lint and auto-fix
- `npm run test` - run unit tests
