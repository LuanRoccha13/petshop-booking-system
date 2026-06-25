# Petshop Booking System

A web system for managing pet bathing appointments, featuring JWT authentication, pet image upload, a customer dashboard, and Swagger-documented APIs.

## Overview

The project is organized into two main modules:

- `backend-spring`: REST API built with Spring Boot, Spring Security, JPA, and PostgreSQL.
- `frontend-react`: React + TypeScript + Vite SPA with registration, login, and dashboard flows.

## Architecture

### Backend (Spring Boot)

- Java 21
- Spring Boot 4
- Spring Security with JWT (access token + refresh token)
- Spring Data JPA
- PostgreSQL
- Swagger OpenAPI
- Image upload via `multipart/form-data`
- Images stored on disk (only path/URL saved in the database)

### Frontend (React)

- React 18
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS

## Features

- User registration
- Login with access token + refresh token issuance
- Session renewal via refresh token
- Logout with refresh token invalidation
- Appointment creation with:
  - pet name
  - breed
  - date
  - time
  - notes
  - image upload
- Authenticated user appointment listing
- Appointment cancellation
- Public landing page + full flow to dashboard

## Folder structure

```text
petshop-booking-system/
├── README.md
└── petshop-system/
    ├── backend-spring/
    └── frontend-react/
```

## Requirements

- Node.js 18+
- npm 9+
- Java 21
- Maven (or use `mvnw`)
- Docker and Docker Compose (optional, recommended for DB and backend)

## Running the project (recommended mode)

### 1. Start backend + database with Docker

In `petshop-system/backend-spring`:

```bash
docker-compose up -d
```

Services:

- API: `http://localhost:8080`
- PostgreSQL: `localhost:5432` (db `petshop`)

### 2. Run the React frontend

In `petshop-system/frontend-react`:

```bash
npm install
npm run dev
```

Frontend:

- App: `http://localhost:5173`

## Running locally (backend outside container)

### Docker database + local backend

In `petshop-system/backend-spring`:

```bash
docker-compose up -d postgres
./mvnw spring-boot:run
```

On Windows (PowerShell):

```powershell
docker-compose up -d postgres
.\mvnw.cmd spring-boot:run
```

Then run the frontend normally in `petshop-system/frontend-react`:

```bash
npm install
npm run dev
```

## Environment variables

### Frontend

File: `petshop-system/frontend-react/.env.local`

```env
VITE_API_URL=http://localhost:8080
```

### Backend

Configured in `application.properties` with defaults. Main variables:

```env
DB_HOST=localhost
DB_NAME=petshop
DB_USERNAME=petshop
DB_PASSWORD=petshop

JWT_SECRET=<your-secret>
JWT_EXPIRATION_MS=86400000
JWT_REFRESH_EXPIRATION_MS=2592000000

APP_UPLOAD_DIR=uploads
```

## Main endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### User

- `GET /api/user/me`

### Appointments

- `POST /api/appointments` (multipart with `appointment` and `image` parts)
- `GET /api/appointments`
- `DELETE /api/appointments/{id}`

### API docs

- `GET /swagger-ui.html`

## Appointment creation example (multipart)

```bash
curl -X POST http://localhost:8080/api/appointments \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F 'appointment={"petName":"Luna","breed":"Shih Tzu","date":"2026-07-15","time":"14:30:00","notes":"Bath and hydration"};type=application/json' \
  -F "image=@/path/to/photo.jpg"
```

## Production build

### Frontend

In `petshop-system/frontend-react`:

```bash
npm run build
npm run preview
```

### Backend

In `petshop-system/backend-spring`:

```bash
./mvnw clean package
```

On Windows (PowerShell):

```powershell
.\mvnw.cmd clean package
```

## Troubleshooting

### Image not showing on dashboard

- Ensure `VITE_API_URL` points to the correct backend URL.
- Ensure `/uploads/**` is accessible.
- Confirm the file was saved to the directory configured by `APP_UPLOAD_DIR`.

### CORS error in frontend

- Ensure frontend runs on `http://localhost:5173` (or another allowed origin).
- Review allowed origins in `SecurityConfig`.

### 401 on authenticated routes

- Ensure `Authorization: Bearer <token>` is being sent.
- If token expired, call `POST /api/auth/refresh`.

### Port 5432 already in use

```bash
docker-compose down
docker-compose up -d
```

## Suggested roadmap

- Integrate external image storage (S3/Cloudinary) for production
- Add end-to-end automated tests (auth + appointments)
- Improve observability (structured logs and metrics)
- Full deployment setup (frontend + backend + database)

## License

See `LICENSE`.

