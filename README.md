# 🎥 Movies Backend API (NestJS)

A scalable, secure backend API for a movie management app. Built with NestJS, MongoDB, and Mongoose.

---

## 🚀 Features

- RESTful API for managing movies with CRUD operations.
- Secure file uploads for movie posters (converted to base64 on server).
- User-based data filtering (user-centric movie management).
- Server-side pagination for large movie collections.
- Validation with DTOs and class-validator.
- Centralized exception handling.
- JWT-based authentication integration ready for frontend token validation.

---

## 🐳 Prerequisites

- Node.js >= 16.x  
- MongoDB Atlas or local MongoDB with remote access  
- NestJS CLI (optional but recommended for development)

---

## 🔧 Installation

git clone https://github.com/priyanshu-rathore/movies-app-backend.git
cd movies-app-backend
npm install


---

## 🌱 Environment Variables

Create `.env` in the project root:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/moviedb?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=4000



Replace `<username>`, `<password>` with your credentials.

---

## 🚴‍♂️ Running the App

Start the development server:

npm run start:dev



Your backend will be accessible at `http://localhost:4000`.

---

## 📚 API Overview

### Authentication
- Login endpoint issues JWT tokens.
- Protect your endpoints by validating JWT in headers.

### Movie Endpoints

- `POST /movies` - Create a movie (accepts multipart poster upload)
- `GET /movies` - Paginated movie list
- `GET /movies/user/:userId` - Movies owned by a user (paginated)
- `GET /movies/:id` - Get movie details
- `PATCH /movies/:id` - Update movie with optional poster
- `DELETE /movies/:id` - Delete movie by ID

---

## 🛠 Architecture

- **Controllers:** Define routes and request handling.
- **Services:** Business logic and DB interactions.
- **DTOs:** Data validation and transformation.
- **Interceptors:** File upload handling with `@UseInterceptors(FileInterceptor)`.
- **Models:** MongoDB schemas with Mongoose.

---

## 🎯 Key Modules

### MoviesService
- Handles create, read, update, delete logic.
- Converts uploaded posters to base64.

### MoviesController
- Routes requests to corresponding service methods.
- Accepts multipart file uploads for posters.

---

## 🔐 Security

- Handle sensitive environment variables securely.
- Validate and sanitize user inputs.
- Protect routes with JWT guard (to be integrated with frontend).

---

## ⬆️ Contributing

Pull requests and issues welcome. Please follow standard Node.js and NestJS practices.

---

## 📝 License

MIT

---

For detailed documentation on API endpoints, refer to the [Swagger/OpenAPI docs](link-to-docs-if-available).

---

This README outlines your backend’s core functionalities, usage, and setup instructions for a smooth developer experience and deployment.
