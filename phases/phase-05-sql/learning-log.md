# Learning Log

## 📅 Date: 2026-05-20

### 📚 Topics Learned

- Started learning **SQL (Structured Query Language)**
- Learned fundamentals of:
  - Databases
  - DBMS (Database Management Systems)
  - Relational vs Non-Relational Databases
- Understood: Primary Keys, Foreign Keys and Composite Keys

- Practiced basic SQL operations: `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE`, `ALTER TABLE`, `DROP TABLE`

---

### 💡 Key Concepts

- Difference between databases and DBMS
- CRUD Operations: Create, Read, Update, Delete
- Relational database structure
- Relationships using foreign keys
- SQL as:
  - DQL
  - DDL
  - DML
  - DCL
- Importance of primary keys in unique identification

---

### 🧠 What I Understood Well

- How relational databases organize data into tables
- Difference between primary key and foreign key
- How SQL queries interact with databases
- Basic table creation and data insertion flow

---

### ⚠️ Challenges Faced

- Understanding relationships between multiple tables
- Remembering SQL syntax and constraints
- Understanding composite keys and foreign keys

---

### 🔍 How I Solved Them

- Practiced creating sample tables and inserting records
- Compared SQL tables with real-world examples like student and company databases
- Repeated CRUD query practice to improve syntax understanding

---

### 📌 Pending Doubts

- SQL joins (`INNER JOIN`, `LEFT JOIN`, etc.)
- Advanced query writing
- Database normalization
- Real-world database design practices

---

### 🚀 Next Plan

- Practice SQL queries daily
- Start PostgreSQL hands-on practice
- Build small database projects using SQL

## 📅 Date: 2026-05-21

### 📚 Topics Learned

- Learned advanced SQL querying concepts
- Practiced:
  - `SELECT`, `WHERE`, `ORDER BY`, `LIMIT`
  - `GROUP BY`, `HAVING`
  - Aggregate functions: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`
  - `LIKE`, wildcards, `DISTINCT`, aliases
  - `UNION` and nested queries (subqueries)
- Learned different types of SQL JOINs:
  - `INNER JOIN`
  - `LEFT JOIN`
  - `RIGHT JOIN`
  - `FULL OUTER JOIN`
- Understood:
  - Foreign key delete actions (`ON DELETE SET NULL`, `CASCADE`)
  - Transactions (`BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`)
  - Views, Indexing, Constraints, Triggers
  - Custom Functions and Stored Procedures
  - ER Diagrams and database relationships

---

### 💡 Key Concepts

- Data filtering and sorting using SQL queries
- Aggregation and grouped data handling
- Table relationships using JOINs
- Difference between `WHERE` and `HAVING`
- Transactions and ACID properties
- Database schema design using ER diagrams

---

### 🧠 What I Understood Well

- Writing filtered and sorted queries
- Using aggregate functions with `GROUP BY`
- Basic JOIN operations between tables
- Understanding transactions and rollback flow

---

### ⚠️ Challenges Faced

- Understanding complex JOINs and subqueries
- Remembering trigger and procedure syntax
- Confusion between views, functions, and stored procedures

---

### 🔍 How I Solved Them

- Practiced queries on sample databases
- Compared JOIN outputs visually
- Repeated CRUD and aggregation query practice
- Created small relational database examples for better understanding

---

### 📌 Pending Doubts

- Advanced JOIN optimization
- Database normalization in real projects
- Advanced PostgreSQL features

---

### 🚀 Next Plan

- Build mini database projects
- Learn PostgreSQL deeply

## 📅 Date: 2026-05-22

### 📚 Topics Learned

- Started learning PostgreSQL in depth
- Practiced PostgreSQL setup and query execution
- Solved:
  - 50+ Core SQL practice questions
  - 20+ PostgreSQL practice questions
- Started solving PostgreSQL LeetCode questions

- Practiced:
  - Joins
  - Aggregate functions
  - Subqueries
  - Filtering and sorting queries
  - Grouping data using `GROUP BY`
  - PostgreSQL syntax and database operations

---

### 💡 Key Concepts

- PostgreSQL query execution
- SQL problem-solving approach
- Writing optimized filtering and aggregation queries

---

### 🧠 What I Understood Well

- Basic PostgreSQL workflow
- Core SQL query writing
- Joins and aggregation concepts
- Solving beginner-level SQL problems

---

### ⚠️ Challenges Faced

- PostgreSQL-specific syntax differences
- LeetCode SQL problem understanding

---

### 🔍 How I Solved Them

- Practiced repeated SQL queries
- Solved questions on sample databases
- Compared query outputs for better understanding
- Focused on query logic step-by-step

---

### 📌 Pending Doubts

- Advanced PostgreSQL optimization
- Advanced LeetCode SQL problems

---

### 🚀 Next Plan

- Continue PostgreSQL practice
- Solve more SQL LeetCode questions
- Build small database practice projects

## 📅 Date: 2026-05-25

### 📚 Topics Learned

- Built an E-Commerce Order Management System using PostgreSQL
- Practiced real-world database design and schema creation
- Implemented:
  - CRUD operations
  - Joins and aggregation queries
  - Transactions
  - Triggers
  - Functions
  - Procedures
  - Views
  - Indexes

---

### 💡 Key Concepts

- PostgreSQL database design
- Entity relationships and foreign keys
- Business logic implementation using PL/pgSQL
- Query optimization using indexes
- Workflow automation using procedures and triggers

---

### 🧠 What I Understood Well

- Database schema creation
- Relationships between tables
- Writing complex SQL queries
- Functions, procedures, and triggers
- Transaction handling and audit logging

---

### ⚠️ Challenges Faced

- Managing complex relationships
- Writing trigger and procedure logic
- Understanding transaction workflows
- PostgreSQL PL/pgSQL syntax

---

### 🔍 How I Solved Them

- Broke complex logic into smaller steps
- Tested triggers and procedures multiple times
- Improved understanding through repeated implementation

---

### 📌 Pending Doubts

- Advanced PostgreSQL optimization

---

### 🚀 Next Plan

- start learning node.js

## 📅 Date: 2026-06-03

### 📚 Topics Learned

- Started Designing HRMS System
- Designed and implemented User Management Module
- Implemented Role Management and Permission Management
- Learned Role-Based Access Control (RBAC) architecture using:
  - Roles
  - Permissions
  - Role Permissions
  - User Roles
  - User Permission Overrides

- Implemented Employee Management Module
- Designed employee master data structure using:
  - Employee Profile
  - Personal Details
  - Work Details
  - Identification Details
  - Bank Details
  - Experience Details
  - Skills Management

- Implemented many-to-many relationship between Employees and Skills
- Designed Organization Management Module:
  - Departments
  - Designations

---

### 💡 Key Concepts

- User Management
- Role & Permission Management
- Role-Based Access Control (RBAC)
- User Permission Override
- Employee Master Data Design

---

### 🧠 What I Understood Well

- How RBAC controls system access using roles and permissions
- How employee data can be separated into multiple related tables

---

### ⚠️ Challenges Faced

- Understanding permission inheritance from roles to users
- Designing employee-related tables without data duplication

---

### 🔍 How I Solved Them

- Created RBAC flow diagrams and mapped permissions to roles
- Normalized employee data into separate modules

---

### 📌 Pending Doubts

- Strategies for caching permissions in large-scale applications

---

### 🚀 Next Plan

- Refactor Employee Module
- Implement Leave Management System
- Implement Asset Management System

---

## 📅 Date: 2026-06-04

### 📚 Topics Learned

- Continued Designing HRMS System
- Refactored Employee Management Module
- Optimized employee data structure using JSON-based storage for flexible data management
- Implemented Leave Management Module
  - Leave Types
  - Leave Rules
  - Leave Eligibility Rules
  - Leave Balances
  - Leave Applications
  - Leave Approval Process
- Implemented Asset Management Module
  - Asset Registration
  - Asset History Tracking

---

### 💡 Key Concepts

- Employee Data Refactoring
- JSON Data Storage
- Leave Policy Management
- Leave Eligibility Rules
- Asset Tracking System

---

### 🧠 What I Understood Well

- How flexible employee information can be managed using structured JSON fields
- How leave policies are configured and enforced
- How leave balances and carry-forward rules work

---

### ⚠️ Challenges Faced

- Designing dynamic leave eligibility rules
- Managing carry-forward policies across different employee categories

---

### 🔍 How I Solved Them

- Created rule-based workflow diagrams for leave processing

---

### 📌 Pending Doubts

- Automating leave balance calculations and yearly resets

---

### 🚀 Next Plan

- Implement Document Management Module
- Implement Job Portal Workflow
- Implement Announcement Management Module

---
