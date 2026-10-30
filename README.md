# Basmah | Sustainable E-Commerce Platform 🌱

Basmah is a sustainability-focused e-commerce platform developed as a university graduation project. It aims to encourage sustainable shopping by helping consumers discover and evaluate eco-friendly products through sustainability scores and environmental impact insights.

## 🎯 Project Overview

Traditional e-commerce platforms mainly focus on product price, quality, and customer reviews. Basmah introduces sustainability as an additional factor in the shopping experience, helping consumers make more environmentally conscious purchasing decisions.

## ✨ Key Features

- **Sustainable Product Marketplace:** Browse and explore eco-friendly products.
- **Sustainability Scoring:** Evaluate products based on sustainability-related criteria.
- **Product Comparison:** Support more informed and sustainable purchasing decisions.
- **Carbon Footprint Calculator:** Explore the environmental impact of everyday choices.
- **User Accounts:** Registration, authentication, and profile management.
- **Shopping Experience:** Cart, wishlist, checkout, and order management.
- **Company Dashboard:** Product submission and business analytics.
- **Admin Dashboard:** Manage users, products, company applications, and platform activities.
- **Reviews & Ratings:** Share product feedback.
- **Educational Content:** Learn more about sustainability through the platform.

## 🛠️ Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- TanStack Query
- Framer Motion
- Recharts

### Backend
- Node.js
- Express.js
- REST APIs
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer

## 📁 Project Structure

```text
Basmah-sustainability-platform/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── lib/
│       └── pages/
│
├── backend/
│   ├── config/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── screenshots/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammed-Atef-Data/Basmah-sustainability-platform.git
cd Basmah-sustainability-platform
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

## 📸 Screenshots

### Basmah Home Page
![Basmah Home Page](screenshots/Basmah%20Home%20Page.jpeg)

### Carbon Footprint Calculator
![Carbon Footprint Calculator](screenshots/Carbon%20Footprint%20Calculator.jpeg)

### Card Checkout
![Card Checkout](screenshots/Card%20Checkout.jpeg)

### Product Details
![Product Details](screenshots/Product%20Details.jpeg)
Application screenshots will be added here to demonstrate the platform's interface and main features.

## 👥 Project Team

**University Graduation Project – Business Information Systems (BIS)**

Team members:
- Mohamed Atef Abdelhamid
- Omar Sayed
- Basmala Nayer

Supervisor: Mohamed K. Elhadad

## 🌍 Project Vision

Basmah aims to make sustainable shopping more accessible by connecting consumers with environmentally conscious products and encouraging more responsible purchasing decisions.

---

**Basmah – Every Choice Leaves a Footprint. 🌱**
