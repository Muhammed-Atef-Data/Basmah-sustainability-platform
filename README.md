# Basmah – Sustainable E-Commerce Platform

Basmah is a sustainability-focused e-commerce graduation project designed to help consumers discover and evaluate eco-friendly products through sustainability information, product ratings, and environmental impact insights.

> The project was previously named **EcoMart** in the source code. Basmah is the final project name.

## Project Overview

Basmah aims to connect consumers with more sustainable shopping choices and provide a marketplace workflow for customers, companies, and administrators.

## Key Features

- Customer registration and authentication
- Product browsing and product details
- Shopping cart, wishlist, and order management
- Company applications and product submission workflows
- Admin review and approval workflows
- Product sustainability scores and eco badges
- Carbon-saved tracking
- Company and admin analytics dashboards
- Product image uploads

## Technology Stack

**Frontend**
- React
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- Framer Motion
- Recharts

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Multer

## Repository Structure

```text
Basmah-sustainability-platform/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
├── screenshots/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB local instance or MongoDB Atlas database

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Update the values in `backend/.env` with your own local configuration. Then run:

```bash
npm run dev
```

The backend uses port `5000` by default.

### Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` in the frontend environment file to the backend API URL (by default `http://localhost:5000/api`).

## Screenshots

Screenshots of the application will be added here.

## Project Team

This is a collaborative graduation project. Team member details and individual contributions can be added here after they are confirmed by the team.

## Notes

- Never commit `.env` files, database credentials, JWT secrets, API keys, or private user data.
- The seed script contains demonstration account credentials. Keep this repository private until those credentials and all demo data have been reviewed and sanitized before any public release.
- The source code may contain legacy `ecomart` naming from the project's earlier name.
