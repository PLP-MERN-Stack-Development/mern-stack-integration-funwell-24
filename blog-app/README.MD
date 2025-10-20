## Blog App - Full Stack MERN Application
A modern, full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create, read, update, and delete blog posts with user authentication.

## Project Overview
This is a complete blogging application with the following features:

User Authentication - Register, login, and JWT-based session management

Blog Management - Create, read, update, and delete blog posts

Responsive Design - Modern UI that works on all devices

RESTful API - Clean API architecture with proper error handling

Real-time Updates - Dynamic content rendering without page refreshes

🛠️ Tech Stack
Frontend
React - UI framework

React Router - Client-side routing

Context API - State management

CSS3 - Styling with modern features

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM for MongoDB

JWT - Authentication

bcryptjs - Password hashing

CORS - Cross-origin resource sharing

📦 Installation & Setup
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

1. Clone the Repository
bash
git clone <your-repo-url>
cd blog-app
2. Backend Setup
bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
Edit the .env file:

env
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
3. Frontend Setup
bash
cd client

# Install dependencies
npm install
4. Start the Application
Option A: Run separately

bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend  
cd client
npm start
Option B: Run with concurrently (if configured)

bash
# From root directory
npm run dev
🗄️ Database Setup
Local MongoDB
bash
# Start MongoDB service
mongod

# Or using brew services (Mac)
brew services start mongodb-community
MongoDB Atlas (Cloud)
Create account at MongoDB Atlas

Create a cluster

Get connection string

Update MONGODB_URI in .env

📚 API Documentation
Authentication Endpoints
Register User
URL: POST /api/auth/register

Body:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Response:

json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
Login User
URL: POST /api/auth/login

Body:

json
{
  "email": "john@example.com",
  "password": "password123"
}
Response: Same as register

Get Current User
URL: GET /api/auth/me

Headers: Authorization: Bearer <token>

Blog Posts Endpoints
Get All Posts
URL: GET /api/posts

Query Params:

page (optional) - Page number

limit (optional) - Posts per page

category (optional) - Filter by category

search (optional) - Search in title/content

sort (optional) - newest|oldest|popular

Get Single Post
URL: GET /api/posts/:id

Create Post
URL: POST /api/posts

Headers: Authorization: Bearer <token>

Body:

json
{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Short description",
  "category": "Technology",
  "tags": ["react", "javascript"],
  "featuredImage": "https://example.com/image.jpg"
}
Update Post
URL: PUT /api/posts/:id

Headers: Authorization: Bearer <token>

Delete Post
URL: DELETE /api/posts/:id

Headers: Authorization: Bearer <token>

Like Post
URL: PATCH /api/posts/:id/like

Additional Endpoints
Get Categories
URL: GET /api/posts/categories/list

Search Posts
URL: GET /api/posts/search/:query

Get Popular Posts
URL: GET /api/posts/featured/popular

## Features Implemented
## ✅ Core Features
User registration and authentication

JWT-based session management

Create, read, update, delete blog posts

Responsive design

RESTful API architecture

Password hashing and security

## ✅ User Interface
Modern, clean design

Responsive layout

Form validation

Loading states

Error handling

Navigation between pages

## ✅ Blog Features
Rich text content support

Post categories and tags

Read time calculation

Like functionality

View counting

Search and filtering

Pagination

## ✅ Security
Password encryption

JWT token validation

CORS configuration

Input validation

Error handling middleware

## 🗂️ Project Structure
text
blog-app/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   └── App.js          # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   │   └── User.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   └── posts.js
│   ├── server.js           # Server entry point
│   └── package.json
└── README.md
## Development Scripts
Backend Scripts
bash
npm run dev          # Start development server with nodemon
npm start           # Start production server
npm test            # Run tests
## Frontend Scripts
bash
npm start           # Start development server
npm run build       # Build for production
npm test            # Run tests