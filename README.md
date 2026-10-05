# Full Stack Internship Training

### Pratik Jetani · Blobstation · 2026

### Department : Full Stack Developer

### Mentor Name : Abhishek Prajapati

### Internship Duration : 6 Months

---

## Project Phases Overview

### Phase_01 : Git & OOP Fundamentals

Understand version control concepts and build strong programming foundations through Object-Oriented Programming.

**Topics Covered:**

- Git basics : init, clone, add, commit, push, pull, branch, merge
- GitHub workflow
- Pull Requests
- OOP Concepts
  - Abstraction
  - Encapsulation
  - Inheritance
  - Polymorphism
- Practical coding examples for each OOP pillar

---

### Phase_02 : JavaScript Fundamentals & POCs

Build strong fundamentals through practical implementation.

**Topics Covered:**

- HTML fundamentals : Semantic tags, Forms, Accessibility basics
- CSS fundamentals: Selectors, Box model, Flexbox, Grid, Responsive design
- JavaScript fundamentals : Variables, Data types, Functions, Arrays & Objects, Loops, DOM manipulation, Events, Local Storage, Promise, Async await, ES6+ concepts

**Mini Projects:**

- Todo App
- Image Carousel

**POCs:**

- **Student Result Processor**
  - _Description:_ Interactive academic grading system calculating marks, percentages, grade allocations, and statistical rankings.
- **User Feedback Management**
  - _Description:_ Dynamic form processing application capturing user reviews, ratings, and persisting responses via local storage.
- **Product Listing & Cart System**
  - _Description:_ Vanilla JavaScript product catalog with dynamic DOM rendering, cart additions, quantity toggling, and total calculations.

---

### Phase_03 : TypeScript Development

Learn TypeScript and apply strong type-safe practices across scalable frontend logic.

**Topics Covered:**

- Type annotations, Interfaces, Type aliases
- Enums, Generics, Utility types
- Type challenges, Type inference, Conditional types
- Type-safe DOM handling & API data modeling

**Mini Projects:**

- Task Manager / Kanban Board

**POCs:**

- **Product Listing & Cart System (Using API)**
  - 🔗 **Live Demo:** [https://pratik-ts-cart-system.vercel.app/](https://pratik-ts-cart-system.vercel.app/)
  - 📝 **Description:** Type-safe dynamic e-commerce catalog and cart with API data fetching, category filtering, and local storage state persistence.

---

### Phase_04 : React Fundamentals & POCs

Learn modern frontend development using React.js and build scalable UI applications.

**Topics Covered:**

- React fundamentals & JSX
- Components and Props
- State and Event Handling
- Hooks : `useState`, `useEffect`, `useRef`, `useContext`, custom hooks
- Conditional Rendering & Form Handling
- React Router (client-side routing)
- API Integration
- Context API (global state management)
- Redux Fundamentals & Redux Toolkit (RTK)
- Component Architecture & UI Design Systems

**Mini Projects:**

- **Chat bot application**
  - 🔗 **Live Demo:** [https://pratik-ai-chatbot.vercel.app/](https://pratik-ai-chatbot.vercel.app/)
  - 📝 **Description:** Modern, responsive conversational AI chat interface with interactive message handling and smooth UI animations.
- **Todo App using Redux Toolkit**
  - 📝 **Description:** Scalable task management application featuring centralized Redux Toolkit state slices, actions, and reducers.

**POCs:**

- **Product Listing & Cart System Application using API**
  - 🔗 **Live Demo:** [https://pratik-react-cart.vercel.app/](https://pratik-react-cart.vercel.app/)
  - 📝 **Description:** Modular React e-commerce storefront featuring dynamic product catalog, category filters, and live cart state management.
- **Enhanced Todo & Productivity Tracker (Theme Switcher Context API App)**
  - 🔗 **Live Demo:** [https://pratik-productivity-todo.vercel.app/](https://pratik-productivity-todo.vercel.app/)
  - 📝 **Description:** Comprehensive productivity dashboard with task organization, status tracking, and seamless light/dark theme switching powered by Context API.
- **TypeRush Application (Typing Speed Test App)**
  - 🔗 **Live Demo:** [https://pratik-typerush.vercel.app/](https://pratik-typerush.vercel.app/)
  - 📝 **Description:** Engaging typing speed and accuracy testing platform with real-time WPM calculation, accuracy metrics, and interactive timer.

---

### Phase_05 : SQL & PostgreSQL Development

Learn relational databases, SQL querying, and PostgreSQL concepts through practical implementation.

**Topics Covered:**

- Database fundamentals & DBMS concepts
- Relational vs Non-relational databases
- PostgreSQL setup and workflow
- CRUD operations & table relationships
- Primary Keys, Foreign Keys, Composite Keys & Constraints
- Joins (INNER, LEFT, RIGHT, FULL OUTER)
- Aggregation functions, `GROUP BY` and `HAVING`
- Subqueries & Transactions (`ACID` compliance)
- Triggers, Views, Functions & Stored Procedures
- Indexes & Performance Optimization
- ER Diagram modeling

**POCs:**

- **E-Commerce Order & Inventory Management System (POC 01)**
  - 📝 **Description:** Comprehensive relational database schema design with tables, foreign key constraints, complex analytical joins, views, and automated inventory deduction triggers.
- **Human Resource Management System - HRMS (POC 02)**
  - 📝 **Description:** Enterprise database design covering complete employee lifecycle, recruitment workflow, interview scheduling, document management, and payroll tracking.

---

### Phase_06 : Node.js, Express & TypeORM Development

Build scalable backend services, RESTful APIs, and relational ORM integrations.

**Topics Covered:**

- Node.js runtime architecture, Event Loop & Non-blocking I/O
- Node.js core modules (`fs`, `path`, `os`, `http`, `child_process`)
- Express.js server setup, modular routing & middleware architecture
- PostgreSQL connection pooling using `pg`
- Layered backend architecture (Controllers, Services, Models, Routes)
- TypeORM integration: Entities, Repositories, Migrations & Database Seeders
- Request validation using Zod schemas
- Centralized error handling middlewares
- Password hashing with `bcrypt`
- JWT (JSON Web Token) authentication & token verification
- Role-Based Access Control (RBAC) protecting admin endpoints

**POCs:**

- **E-Commerce Backend REST API (POC 01)**
  - 📝 **Description:** Scalable RESTful API built with Express.js, PostgreSQL, and TypeORM featuring authentication, RBAC, product catalogs, shopping cart, and database migrations.

---

### Phase_07 : NestJS & Microservices Architecture

Master enterprise-grade backend architecture, microservices communication, and asynchronous event processing.

**Topics Covered:**

- NestJS modular architecture: Modules, Controllers, Services, Repositories
- Dependency Injection (DI) & Inversion of Control (IoC)
- Data Transfer Objects (DTOs) with `class-validator` & `class-transformer`
- Prisma ORM integration, schema modeling & migration workflow
- Authentication & Security: JWT Strategy, Passport, Guards, and Refresh Token Rotation
- Custom decorators (`@CurrentUser`, `@Roles`) & Role-Based Access Control (RBAC)
- Global Exception Filters & standardized error responses
- Application logging using Winston (Console & File transports)
- Event-driven notifications: Dedicated Notification Microservice
- Swagger documentation integration
- Monorepo project structure for enterprise scale

**POCs:**

- **Bookmark API with Notification Microservice**
  - 📝 **Description:** Modular NestJS API with Prisma, JWT authentication, Winston logging, and decoupled email notification service.

---

## 🚀 Final Project : Full-Stack E-Commerce Microservices Platform

A production-grade, enterprise full-stack e-commerce system featuring a decoupled modern React frontend and NestJS microservices backend, connected with asynchronous event-driven notifications (RabbitMQ), payment handling, real-time inventory management, and a comprehensive admin management suite.

### 🔗 Live Project Links

- 🌐 **Live Frontend Application (Vercel):** [https://ecommerce-frontend-store-ochre.vercel.app/](https://ecommerce-frontend-store-ochre.vercel.app/)
- ⚙️ **Live Backend API Gateway (Render):** [https://ecommerce-backend-api-0ung.onrender.com/](https://ecommerce-backend-api-0ung.onrender.com/)

---

## Tech Stack Used

- **Frontend:** JavaScript, TypeScript, React.js, Vite, Tailwind CSS, shadcn/ui, TanStack Query
- **Backend:** Node.js, Express.js, NestJS, Prisma ORM, TypeORM, OOP concepts
- **Database:** PostgreSQL (Neon Serverless & Local), MongoDB
- **Email Delivery:** Nodemailer, Gmail SMTP
- **Documentation & Testing:** Swagger, Postman
- **DevOps & Deployment:** Vercel, Render, Git, GitHub

---

## Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project Folder

```bash
cd <project-name>
```

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm run dev
```

---

## Current Status

- Phase 01 : ✅ Completed (Git & OOP Fundamentals)
- Phase 02 : ✅ Completed (JavaScript Fundamentals & POCs)
- Phase 03 : ✅ Completed (TypeScript Development)
- Phase 04 : ✅ Completed (React Fundamentals & POCs)
- Phase 05 : ✅ Completed (SQL & PostgreSQL Development)
- Phase 06 : ✅ Completed (Node.js, Express & TypeORM)
- Phase 07 : ✅ Completed (NestJS & Microservices Architecture)
- Final Project : 🚀 Completed & Deployed Live
