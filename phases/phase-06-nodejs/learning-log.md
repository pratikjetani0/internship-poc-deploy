# Learning Log

## 📅 Date: 2026-05-26

### 📚 Topics Learned

- Started learning Node.js and Express.js
- Understood server-side JavaScript execution using Node.js
- Learned:
  - Event Loop
  - Blocking vs Non-Blocking operations
  - Modules in Node.js
  - CommonJS and ES6 modules
  - Built-in modules: `fs`, `path`, `os`, `http`, `child_process`
- Created basic HTTP servers using Node.js
- Learned URL handling and HTTP methods
- Started building routes using Express.js

---

### 💡 Key Concepts

- Asynchronous programming and callbacks
- Event-driven architecture
- Request-response cycle
- Express.js routing

---

### 🧠 What I Understood Well

- Difference between synchronous and asynchronous operations
- Working of the Event Loop
- Using Node.js core modules
- Creating servers with `http`
- Basic Express.js routing and route parameters

---

### ⚠️ Challenges Faced

- Understanding Event Loop flow
- Difference between CommonJS and ES Modules
- Managing file system operations

---

### 🔍 How I Solved Them

- Practiced multiple server examples
- Explored built-in modules with small programs
- Repeatedly practiced routing and HTTP methods

---

### 📌 Pending Doubts

- Advanced middleware usage in Express.js
- Error handling patterns in Node.js

---

### 🚀 Next Plan

- Learn Express.js middleware
- Build REST APIs with CRUD operations
- Connect Node.js with PostgreSQL database

## 📅 Date: 2026-05-27

### 📚 Topics Learned

- Practiced REST API development using Express.js
- Implemented: `GET`, `POST`, `PUT`, `DELETE` routes
- Learned route parameters and multiple route handling
- Used Postman for API testing
- Learned Express Middleware concepts
- Practiced:
  - Built-in middleware (`express.json()`)
  - Custom middleware
  - Third-party middleware (`morgan`)
- Learned asynchronous programming in JavaScript
- Practiced:
  - Callbacks
  - Promises
  - Async/Await
  - Event Loop and Microtask Queue
- Connected Node.js application with PostgreSQL using `pg`
- Built API endpoints with PostgreSQL integration
- Learned schema and table creation using Node.js

---

### 💡 Key Concepts

- REST API architecture
- CRUD operations with Express.js
- Middleware flow in Express.js
- PostgreSQL connection pooling
- SQL query execution from Node.js
- Schema-based database structure

---

### 🧠 What I Understood Well

- API route creation in Express.js
- Request and response handling
- Difference between callbacks, promises, and async/await
- Middleware execution flow
- PostgreSQL connection setup

---

### ⚠️ Challenges Faced

- Handling async database operations
- Understanding middleware flow
- Database connection configuration

---

### 🔍 How I Solved Them

- Tested APIs using Postman
- Debugged async code step-by-step
- Referred to middleware execution flow
- Practiced PostgreSQL queries with Express.js

---

### 📌 Pending Doubts

- Advanced error handling middleware
- Authentication with JWT
- Database transaction handling in APIs

---

### 🚀 Next Plan

- Learn authentication and authorization

## 📅 Date: 2026-05-28

### 📚 Topics Learned

- Connected PostgreSQL database using TypeORM `DataSource`
- Practiced Entity-based database modeling with TypeORM decorators
- Implemented CRUD APIs using Express.js and PostgreSQL
- Practiced:
  - `GET` API for fetching customer data
  - `POST` API for inserting customer data
  - `PUT` API for updating customer data
  - `DELETE` API for removing customer data
- Practiced error handling using `try-catch`
- Improved backend folder structure and route organization concepts

---

### 💡 Key Concepts

- TypeORM `Entity` and `Repository`
- PostgreSQL integration with TypeORM
- CRUD API architecture
- Express.js routing
- Async database operations
- Schema-based database structure
- REST API response handling

---

### 🧠 What I Understood Well

- Database connection setup with `DataSource`
- Repository methods like:
  - `find()`
  - `create()`
  - `save()`
  - `findOneBy()`
  - `remove()`
- API route handling in Express.js
- Basic error handling using `try-catch`

---

### ⚠️ Challenges Faced

- Understanding TypeORM workflow
- Entity and schema configuration
- Updating and deleting records properly
- Organizing backend folders and routes

---

### 🔍 How I Solved Them

- Practiced CRUD APIs multiple times
- Tested APIs using Postman
- Referred to TypeORM repository methods
- Used environment variables for database configuration

---

### 📌 Pending Doubts

- Advanced TypeORM relationships (`OneToMany`, `ManyToOne`)
- Validation using middleware

---

### 🚀 Next Plan

- Implement middleware-based validation
- Create proper backend architecture using:
  - Routes
  - Controllers
  - Services
  - Middleware
  - Config

## 📅 Date: 2026-05-29

### 📚 Topics Learned

- Start POC1
- Learned scalable backend architecture with proper folder structure
- Implemented CRUD operations using PostgreSQL and Express.js
- Practiced REST API development with modular route handling
- Used PostgreSQL connection pooling with `pg`
- Learned service-based backend architecture
- Implemented:
  - Controllers
  - Routes
  - Services/Models
  - Middleware
  - Database configuration
- Learned centralized error handling middleware
- Implemented request validation using `Zod`
- Learned password hashing using `bcrypt`

---

### 💡 Key Concepts

- REST API architecture
- CRUD operations with PostgreSQL
- PostgreSQL connection pooling
- Middleware flow in Express.js
- Input validation using Zod
- Password hashing with bcrypt

---

### 🧠 What I Understood Well

- Route handling using Express Router
- Controller and service separation
- PostgreSQL query execution using `pg`
- Input validation using Zod middleware
- Password hashing using bcrypt
- Database connection setup using Pool
- Async database operations with async/await

---

### ⚠️ Challenges Faced

- Handling async database queries
- Separating controller and service logic properly
- Input validation using Zod
- Password hashing workflow

---

### 🔍 How I Solved Them

- Practiced CRUD APIs multiple times
- Debugged API responses using Postman
- Tested validation middleware with invalid inputs
- Referred to Express middleware execution concepts

---

### 📌 Pending Doubts

- Role-based authorization

---

### 🚀 Next Plan

- Learn JWT authentication and authorization
- Add role-based access control
- Learn advanced PostgreSQL concepts

---

## 📅 Date: 2026-06-01

### 📚 Topics Learned

- Continued POC1 Backend Development using Node.js, Express.js, PostgreSQL, and TypeORM
- Designed a scalable backend folder structure following industry practices
- Learned TypeORM Migration workflow
- Created and executed multiple database migrations
- Practiced:
  - Creating migration files
  - Running migrations
  - Reverting migrations
  - Updating database schema through migrations
- Implemented middleware architecture for:
  - Error Handling
  - Validation

---

### 💡 Key Concepts

- Layered Backend Architecture
- TypeORM Migrations
- Express Middleware Flow
- Validation and Error Handling

---

### 🧠 What I Understood Well

- Creating and managing TypeORM entities
- How migrations track database changes
- Difference between migration `up()` and `down()` methods
- Organizing modules independently inside backend applications
- Middleware execution flow in Express.js

---

### ⚠️ Challenges Faced

- Understanding migration workflow
- Tracking which files are affected after schema changes

---

### 🔍 How I Solved Them

- Practiced creating and running multiple migrations
- Studied migration-generated schema changes

---

### 📌 Pending Doubts

- Advanced migration strategies in production

---

### 🚀 Next Plan

- Implement JWT Authentication
- Add Role-Based Authorization
- Build Authentication Module
- Learn Advanced TypeORM Relationships

## 📅 Date: 2026-06-02

### 📚 Topics Learned

- Continued POC1 Development
- Implemented Authentication and Authorization system
- Integrated **bcrypt** for password hashing and password comparison
- Implemented **JWT (JSON Web Token)** authentication
- Learned JWT token generation (`sign`) and verification (`verify`)
- Built complete Authentication Module using:
  - Register API
  - Login API
  - Authentication Middleware
- Separated application routes based on user roles:
  - User Routes
  - Admin Routes
- Implemented Role-Based Access Control (RBAC)
- Restricted:
  - Get All Users → Admin Only
  - Delete User → Admin Only

---

### 💡 Key Concepts

- Password Hashing with bcrypt
- Password Verification
- JWT Authentication Flow
- Access Token Generation
- Authentication Middleware
- Role-Based Authorization (RBAC)

---

### 🧠 What I Understood Well

- How bcrypt hashes and compares passwords securely
- JWT token creation and validation process
- Difference between Authentication and Authorization
- Middleware flow for securing APIs
- How role-based access control protects sensitive resources

---

### ⚠️ Challenges Faced

- Understanding JWT authentication flow from login to protected routes
- Managing user roles across different endpoints

---

### 🔍 How I Solved Them

- Practiced hashing and comparing passwords using bcrypt
- Tested role-based permissions with different user accounts

---

### 📌 Pending Doubts

- Token expiration and renewal strategies

---

### 🚀 Next Plan

- Implement Refresh Token mechanism
- Add Logout functionality with token invalidation

## 📅 Date: 2026-06-05

### 📚 Topics Learned

- Continued Designing HRMS System
- Implemented Document Management Module
  - Employee Documents
  - Organization Documents
  - Signed Documents

- Implemented Job Portal Workflow Module
  - Job Posting
  - Candidate Application
  - Interview Scheduling
  - Interview Feedback
  - Offer Management
  - Employee Conversion

- Implemented Announcement Management Module

---

### 💡 Key Concepts

- Document Management System
- Job Portal Workflow
- Announcement Management

---

### 🧠 What I Understood Well

- How employee and organization documents are managed securely
- Complete recruitment process from application to employee onboarding

---

### ⚠️ Challenges Faced

- Designing recruitment workflow with multiple status transitions

---

### 🔍 How I Solved Them

- Mapped recruitment stages into structured workflow states

---

### 📌 Pending Doubts

- Document versioning and storage optimization strategies

---

### 🚀 Next Plan

- Add audit logging and activity tracking

## 📅 Date: 2026-06-08

### 📚 Topics Learned

- Completed POC1 Backend Development

- Implemented Product Management Module
  - Create Product API
  - Get All Products API
  - Get Single Product API
  - Update Product API
  - Delete Product API

- Implemented Cart Management Module
  - Add Product to Cart
  - Get User Cart with Product Details
  - Update Cart Item Quantity
  - Remove Cart Item
  - Clear Entire Cart

- Learned Seeder Purpose and Use Cases
- Executed Seeders for Initial Data Population

- Generated Migration Files from Entity Changes
- Executed Migration Scripts

---

### 💡 Key Concepts

- Product CRUD Operations
- Shopping Cart Management
- Database Seeders
- TypeORM Migrations

---

### 🧠 What I Understood Well

- Complete Product and Cart workflow implementation using Express.js, PostgreSQL, and TypeORM
- How seeders help populate initial application data
- Relationship handling between entities in TypeORM
- Managing database schema changes through migration scripts

---

### ⚠️ Challenges Faced

- Handling Product and Cart entity relationships correctly
- Managing cart item updates while maintaining data consistency
- Understanding seeders generation and execution workflow

---

### 🔍 How I Solved Them

- Tested CRUD operations using different scenarios and edge cases
- Used seeders to verify database initialization and application behavior

---

### 📌 Pending Doubts

- Best practices for production-level seeding strategies

---

### 🚀 Next Plan

- Improve API testing and documentation
- Satrt next phase
