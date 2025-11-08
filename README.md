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




Backend API will run at `http://localhost:4000`.

---

## 📑 API Documentation (Swagger)

> **Interactive docs available at:**  
> [http://localhost:4000/api-docs](http://localhost:4000/api-docs)



## API Endpoints

- `POST /auth/register` – Register new user
- `POST /auth/login` – Login, receive JWT

- `POST /movies` – Create a movie (poster as file upload)
- `GET /movies` – Get all movies paginated
- `GET /movies/user/:userId` – Get user movies (paginated)
- `GET /movies/:id` – Movie details
- `PATCH /movies/:id` – Update movie (with poster upload)
- `DELETE /movies/:id` – Delete movie

All endpoints are documented interactively via Swagger.

---

## 🗄️ Architecture

- **Controllers:** API endpoints.
- **Services:** Business logic.
- **DTOs:** Validation and transformation with class-validator.
- **Interceptors:** For file upload with Multer.
- **Models:** Mongoose schemas.
- **Swagger:** Auto-API docs for quick reference and testing.

---

## 🛡️ Security

- Protect secrets and sensitive configs in `.env`.
- Validate all inputs.
- Protect endpoints with JWT guards.
- File upload and DTO validation enabled.

---

## 📝 Contributing

PRs and issues welcome! Please follow NestJS code standards.

---

## MIT License

---

With Swagger, your API is self-documenting: simply build and run, then visit `/api-docs` for all routes, schemas, and examples.
