# Learning Log

## 📅 Date: 2026-06-09

### 📚 Topics Learned

- Started NestJS Learning Phase
- Explored NestJS Project Structure
- Learned Core NestJS Concepts:
  - Modules
  - Controllers
  - Services

- Read NestJS Official Documentation
- Started Learning Prisma ORM Integration with NestJS
- Explored Prisma Setup and Database Connection Configuration

---

### 💡 Key Concepts

- NestJS Architecture
- Modules, Controllers, and Services
- Prisma ORM Basics
- Database Connection Setup

---

### 🧠 What I Understood Well

- How NestJS organizes application logic using modules
- Responsibilities of controllers and services
- Basic dependency injection workflow
- Prisma project setup and database connection process

---

### ⚠️ Challenges Faced

- Understanding how different NestJS components interact
- Configuring Prisma with the latest project setup
- Understanding the overall request flow in NestJS applications

---

### 🔍 How I Solved Them

- Followed the official NestJS documentation and examples
- Explored project structure through hands-on practice
- Tested Prisma configuration and database connection setup

---

### 📌 Pending Doubts

- Prisma integration patterns

---

### 🚀 Next Plan

- Build APIs using NestJS modules, controllers, and services
- Learn DTOs, Validation Pipes, and Prisma CRUD operations

---

## 📅 Date: 2026-06-10

### 📚 Topics Learned

- Solved Prisma Connection Issues with Latest Prisma Version
- Researched Version Compatibility and Configuration Changes
- Learned NestJS Core Concepts in Depth:
  - Modules
  - Controllers
  - Services
  - DTOs
  - Validation

- Implemented Request Validation using DTOs
- Explored Data Flow Between Controller, Service, and Database Layer

---

### 💡 Key Concepts

- Prisma Configuration and Troubleshooting
- DTO (Data Transfer Object)
- Request Validation
- NestJS Request Lifecycle
- Controller-Service Architecture

---

### 🧠 What I Understood Well

- How DTOs improve request validation and data consistency
- The role of validation in API development
- Complete request flow from controller to service layer
- Prisma configuration and connection handling with newer versions

---

### ⚠️ Challenges Faced

- Resolving Prisma connection errors caused by version updates
- Understanding DTO validation decorators and validation flow

---

### 🔍 How I Solved Them

- Debugged connection issues through testing and error analysis
- Built sample implementations using DTOs and validation

---

### 📌 Pending Doubts

- Global exception handling and error management in NestJS

---

### 🚀 Next Plan

- Implement CRUD APIs using NestJS and Prisma
- Learn Middleware, Guards, and Interceptors

## 📅 Date: 2026-06-11

### 📚 Topics Learned

- Continued NestJS Bookmark API Development
- Implemented Authentication Module
  - User Registration (Sign Up)
  - User Login (Sign In)
  - JWT Authentication
  - JWT Strategy Configuration
  - JWT Guard Implementation
  - Protected Routes
  - Custom Decorators for Current User Extraction
- Implemented User Module
  - User Controller
  - User Service
  - User Repository
  - User Profile APIs
- Implemented Bookmark Module
  - Bookmark Controller
  - Bookmark Service
  - Bookmark Repository
  - Create Bookmark API
  - Get All Bookmarks API
  - Get Single Bookmark API
  - Update Bookmark API
  - Delete Bookmark API

- Performed Testing with Jest

---

### 💡 Key Concepts

- JWT Authentication
- Guards and Strategies
- Custom Decorators
- DTOs and Validation
- Module-Based Architecture
- Authorization and Protected Routes
- Jest E2E Testing

---

### 🧠 What I Understood Well

- Complete authentication flow using JWT in NestJS
- How Guards and Strategies work together to protect APIs
- Creating reusable custom decorators
- Separation of concerns using Controller, Service, Repository, and Module layers
- Repository pattern for database operations
- Writing and executing E2E tests using Jest

---

### ⚠️ Challenges Faced

- Understanding JWT Strategy and Guard workflow
- Configuring authentication for protected endpoints
- Setting up and understanding Jest testing workflow

---

### 🔍 How I Solved Them

- Followed NestJS authentication documentation and implementation examples
- Tested protected APIs using different authentication scenarios
- Wrote and executed test cases to verify application behavior

---

### 📌 Pending Doubts

- Role-Based Access Control (RBAC) implementation in NestJS

---

### 🚀 Next Plan

- Learn Exception Filters and Global Error Handling
- Implement Role-Based Authorization

## 📅 Date: 2026-06-12

### 📚 Topics Learned

- Enhanced NestJS Bookmark API with Production-Level Error Handling
- Implemented Global Exception Filter
  - Centralized Error Handling
  - Standardized Error Response Structure

- Implemented Application Logging with Winston
  - Winston Logger Configuration
  - Console Logging
  - File-Based Logging

- Implemented Refresh Token Authentication Flow
  - Access Token Generation
  - Refresh Token Generation
  - Refresh Token Storage
  - Refresh Token Validation
  - Token Rotation Strategy
  - Secure Token Renewal Proces
  - Generate New Refresh Token on Every Refresh Request

---

### 💡 Key Concepts

- Global Exception Filters
- Centralized Error Handling
- Winston Logger
- File and Console Logging
- JWT Authentication
- Access Tokens
- Refresh Tokens
- Refresh Token Rotation

---

### 🧠 What I Understood Well

- How Global Exception Filters simplify application-wide error handling
- Configuring Winston for production-level logging
- Secure refresh token implementation and rotation strategy
- Managing access and refresh token expiration effectively

---

### ⚠️ Challenges Faced

- Designing a centralized exception handling mechanism
- Configuring Winston transports and log formats
- Understanding refresh token rotation workflow

---

### 🔍 How I Solved Them

- Implemented a Global Exception Filter to handle all application exceptions consistently
- Configured Winston with separate console and file transports
- Implemented refresh token rotation and validated token lifecycle through testing

---

### 📌 Pending Doubts

- Refresh token storage best practices for large-scale applications
- Log aggregation and centralized log management solutions

---

### 🚀 Next Plan

- Explore Role-Based Access Control (RBAC)
- Implement API Documentation Using Swagger

## 📅 Date: 2026-06-15

### 📚 Topics Learned

- Learned Microservices Architecture in NestJS

- Integrated Microservices into Bookmark API
  - Service-to-Service Communication
  - Event-Based Architecture Concepts

- Implemented Notification Microservice
  - Dedicated Notification Service
  - Decoupled Notification Logic

- Implemented Email Service Using Nodemailer
  - Email Configuration and Setup
  - Dynamic Email Templates

- Implemented Automated Email Notifications
  - User Registration Email
  - Bookmark Creation Email
  - Event Triggered Notifications

---

### 💡 Key Concepts

- NestJS Microservices
- Service Communication
- Event-Driven Architecture
- Notification Service
- Nodemailer
- Email Templates
- Asynchronous Processing

---

### 🧠 What I Understood Well

- How microservices help separate business concerns
- Communication between services in NestJS
- Implementing a dedicated notification service
- Sending automated emails using Nodemailer

---

### ⚠️ Challenges Faced

- Understanding microservice architecture and communication flow
- Configuring Nodemailer correctly
- Triggering email notifications from business events

---

### 🔍 How I Solved Them

- Studied NestJS microservice communication patterns and implemented them in the Bookmark API
- Configured Nodemailer using environment variables
- Created notification events for user registration and bookmark creation actions

---

### 📌 Pending Doubts

- Email queue implementation for high-volume applications

---

### 🚀 Next Plan

- Learn Monorepo Architecture
- Design Scalable Folder Structure for Microservices

---

## 📅 Date: 2026-06-16

### 📚 Topics Learned

- Learned Monorepo Architecture in NestJS

- Studied Scalable Folder Structures for Monolith and Microservices
  - Shared Libraries
  - Reusable Modules

- Started POC1 Ecommerce Backend API Development
  - Project Initialization
  - Application Structure Setup

- Implemented Database Design Using Prisma ORM
  - Schema Design
  - Model Relationships
  - Migration Workflow

- Created Database Migrations for Ecommerce Modules
  - User Model
  - Product Model
  - Category Model
  - Cart Model
  - Order Related Tables

---

### 💡 Key Concepts

- Monorepo Architecture
- Microservice Folder Structure
- Scalable Backend Design
- Prisma ORM
- Database Modeling
- Prisma Migrations

---

### 🧠 What I Understood Well

- Advantages of monorepo architecture for large-scale applications
- Designing relational database schemas using Prisma
- Managing database changes through migrations

---

### ⚠️ Challenges Faced

- Designing a scalable project structure
- Defining relationships between ecommerce entities
- Understanding Prisma migration workflow

---

### 🔍 How I Solved Them

- Researched industry-standard monorepo structures
- Designed ecommerce models with proper relationships

---

### 📌 Pending Doubts

- Managing multiple microservices inside a monorepo
- Database scaling strategies for ecommerce systems

---

### 🚀 Next Plan

- Implement Authentication and Authorization
- Add RBAC and Security Features

---

## 📅 Date: 2026-06-17

### 📚 Topics Learned

- Implemented Authentication Module in POC1 Ecommerce API
  - User Registration
  - User Login
  - JWT Authentication

- Learned and Implemented NestJS Security Components
  - Guards
  - Strategies
  - JWT Authentication Strategy

- Implemented Refresh Token Authentication Flow
  - Access Token Generation
  - Refresh Token Generation
  - Refresh Token Validation
  - Refresh Token Rotation

- Implemented Role-Based Access Control (RBAC)
  - Role Management
  - Protected Routes
  - Authorization Guards

- Enhanced Error Handling
  - HTTP Exceptions
  - Global Exception Filter

- Developed Ecommerce Modules
  - Product Module
  - Cart Module

- Implemented Role-Based Route Protection
  - Admin Product Management
  - User Cart Operations
  - Protected API Endpoints

---

### 💡 Key Concepts

- JWT Authentication
- Access Tokens
- Refresh Tokens
- Refresh Token Rotation
- Guards
- Strategies
- Role-Based Access Control (RBAC)
- Authorization
- Global Exception Filter
- Product Module
- Cart Module

---

### 🧠 What I Understood Well

- Complete JWT authentication workflow in NestJS
- Difference between authentication and authorization
- Implementing RBAC using guards and decorators
- Securing routes based on user roles
- Structuring ecommerce modules with proper access control

---

### ⚠️ Challenges Faced

- Understanding guard and strategy execution flow
- Implementing refresh token rotation securely
- Designing role-based route protection
- Handling exceptions consistently across modules

---

### 🔍 How I Solved Them

- Implemented JWT and Refresh Token strategies step by step
- Added role guards and custom decorators for authorization
- Applied a Global Exception Filter for centralized error handling
- Tested authentication, authorization, product, and cart workflows thoroughly

---

### 📌 Pending Doubts

- Advanced RBAC patterns for enterprise applications
- Permission-based authorization vs role-based authorization

---

### 🚀 Next Plan

- Implement Order Management Module
- Integrate Payment Gateway
- Add Unit and E2E Testing for Ecommerce Modules

## 📅 Date: 2026-06-18

### 📚 Topics Learned

- Continued Development of POC1 Ecommerce Backend API

- Implemented Order Module
  - Create Order API
  - Get Orders API
  - Order Creation Workflow
  - Cart to Order Conversion

- Implemented Payment Module
  - Simulated Payment Processing
  - Payment Status Management
  - Payment Retry Mechanism

- Added Payment Status Flows
  - Success Status
  - Failed Status
  - Pending Status
  - Retry Payment Flow

- Implemented Cart Management During Order Creation
  - Automatic Cart Clearance After Successful Order Placement

- Integrated Notification Microservice
  - Order Confirmation Notifications
  - Payment Success Notifications

- Implemented Notification Persistence
  - Store Notifications in Database
  - Notification History Tracking

---

### 💡 Key Concepts

- Order Management
- Payment Processing
- Payment Status Lifecycle
- Payment Retry Mechanism
- Cart Management
- Microservice Communication
- Notification Service
- Database Persistence

---

### 🧠 What I Understood Well

- Order creation workflow from cart items
- Simulating payment processing in an ecommerce system
- Managing different payment states effectively
- Integrating notifications using microservices
- Storing notification records for future reference

---

### ⚠️ Challenges Faced

- Designing the order placement workflow
- Synchronizing notification events with order and payment actions
- Clearing cart items after successful order creation

---

### 🔍 How I Solved Them

- Implemented a structured order lifecycle from cart to order creation
- Triggered notification events through the notification microservice
- Stored notification records in the database and verified event execution through testing

---

### 📌 Pending Doubts

- Integrating real payment gateways in production applications

---

### 🚀 Next Plan

- Implement Admin Dashboard APIs
- Add Email Notifications for Orders and Payments
- Learn and Integrate Swagger Documentation

---

## 📅 Date: 2026-06-19

### 📚 Topics Learned

- Implemented Admin Dashboard APIs

- Developed Dashboard Summary Endpoints
  - User Summary API
  - Product Summary API
  - Order Summary API

- Enhanced Notification Microservice
  - Order Confirmation Email
  - Payment Success Email
  - Email-Based Notifications

- Learned Swagger Documentation in NestJS

- Integrated Swagger into POC1 Ecommerce API
  - API Documentation Setup
  - Route Documentation
  - DTO Documentation
  - Request and Response Documentation

---

### 💡 Key Concepts

- Admin Dashboard APIs
- Analytics and Summary Endpoints
- Notification Microservice
- Nodemailer
- Email Templates
- Swagger
- JWT Authorization
- API Testing

---

### 🧠 What I Understood Well

- Building admin-focused dashboard APIs
- Creating reusable email templates for notifications
- Documenting APIs effectively using Swagger
- Testing authenticated endpoints through Swagger UI

---

### ⚠️ Challenges Faced

- Designing summary endpoints for dashboard data
- Configuring Swagger decorators correctly
- Integrating JWT authentication with Swagger

---

### 🔍 How I Solved Them

- Implemented dedicated dashboard routes for users, products, and orders
- Configured Swagger decorators for controllers, DTOs, and authentication flows
- Added JWT Bearer Authentication support and verified protected routes through Swagger testing

---

### 📌 Pending Doubts

- Advanced Swagger customization and versioning strategies
- Email queue implementation for high-volume notification systems

---

### 🚀 Next Plan

- Optimize Microservice Communication and Scalability
