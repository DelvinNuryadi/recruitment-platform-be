# Recruitment Platform Backend

A simple **REST API backend** for a **Recruitment SaaS Platform**.
This platform is designed to be sold to companies to manage their recruitment process, including job positions, applicants, and internal users with role-based access.

---

## 🚀 Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Architecture**: MVC
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (HttpOnly Cookie) + RBAC
- **Logging**: HTTP Request Logger
- **Containerization**: Docker & Docker Compose

---

## 🧩 Roles

- **Admin** → manage users & full access
- **Recruiter** → manage positions & applicants

---

## 📦 Requirements

- **Node.js**: `>= 20.x` (recommended)

    > Project currently tested on **Node 24.11.1**, but Node 20+ is safer and more stable for production.

- **PostgreSQL**: `>= 16`
- **npm** or Docker

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/recruitment-db
JWT_SECRET=your_jwt_secret
PORT=8000
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd recruitment-platform
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Prisma Setup

```bash
npm run db:generate
npm run db:migrate
```

Optional (reset & seed):

```bash
npm run db:reset
npm run db:seed
```

---

## ▶️ How To Run

### 🔹 Development (Manual)

```bash
npm run dev
```

Server will run on:

```
http://localhost:8000
```

---

### 🐳 Using Docker

#### Build & Run

```bash
docker compose up -d --build
```

Or using Makefile:

```bash
make up
```

---

## 🐳 Docker Overview

### Dockerfile

- Base image: `node:20-alpine`
- Working directory: `/app`
- Runs Prisma generate + dev server

### Docker Compose Services

- **app** → Node.js API
- **postgres** → PostgreSQL 16

---

## 🔐 Authentication Flow

- Uses **JWT stored in HttpOnly Cookie**
- Auth middleware protects secured routes
- Role-based access control (RBAC) for Admin & Recruiter

---

## 🌐 API Base URL

```
/api
```

---

## 📚 API Endpoints

### 🔑 Auth

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/login`    | Login user                 |
| POST   | `/api/auth/register` | Register admin & company   |
| GET    | `/api/auth/me`       | Get current logged-in user |
| DELETE | `/api/auth/logout`   | Logout user                |

---

### 👤 Users

| Method | Endpoint         | Description          | Role  |
| ------ | ---------------- | -------------------- | ----- |
| POST   | `/api/users`     | Create user          | Admin |
| GET    | `/api/users`     | Get users in company | Auth  |
| GET    | `/api/users/:id` | Get user detail      | Auth  |
| DELETE | `/api/users/:id` | Delete user          | Auth  |

---

### 💼 Positions

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/positions`     | Create job position |
| GET    | `/api/positions`     | Get all positions   |
| GET    | `/api/positions/:id` | Get position detail |
| PUT    | `/api/positions/:id` | Update position     |
| DELETE | `/api/positions/:id` | Delete position     |

---

### 🧑‍💻 Applicants

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| POST   | `/api/applicants`            | Create applicant (public) |
| GET    | `/api/applicants`            | Get all applicants        |
| GET    | `/api/applicants/:id`        | Get applicant detail      |
| PATCH  | `/api/applicants/:id/status` | Update applicant status   |
| PATCH  | `/api/applicants/:id/notes`  | Update applicant notes    |
| DELETE | `/api/applicants/:id`        | Delete applicant          |

---

## ❗ Error Handling

- Centralized error handler
- Validation using Zod
- Consistent HTTP status codes

---

## 🧪 Useful Scripts

```bash
npm run dev           # Run dev server
npm run build         # Build TypeScript
npm run start         # Run production build
npm run db:migrate    # Prisma migrate
npm run db:generate   # Prisma generate
npm run db:studio     # Prisma Studio
```

---

© 2026 @delvinnr
