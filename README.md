

### Blog Management App
## Project Purpose
A full-stack blog management application that allows users to create, edit, and delete their own blog posts, while public users can view all blogs. It provides secure authentication, a rich text editor for blog content, and seamless image uploads, making blog management easy and user-friendly.

---

## 🌐 Live Demo
https://myblogapp.tech/
## 🛠️ Technology Stack

**Frontend**
- Next.js / React  
- Tailwind CSS  
- Redux Toolkit (for state management)  
- React Quill / TipTap (Rich Text Editor)  

**Backend**
- Node.js  
- Express.js  
- JWT-based Authentication  
- Bcrypt for password hashing  
- Cloudinary for image uploads  

**Database**
- MongoDB (NoSQL database)  
- Mongoose (ODM for MongoDB)

---

## 🏗 Architecture Explanation

This project is a **Monolithic full-stack application** following the **MVC (Model-View-Controller) pattern**:

- **Models:** Define database schemas (User, Post)  
- **Controllers:** Handle business logic for authentication and blog CRUD operations  
- **Routes:** Map HTTP requests to controller functions  
- **Middleware:** Protect routes using JWT, handle errors globally, manage file uploads  
- **Frontend:** Next.js app with auth-protected routes, rich text editor, and responsive UI  
````md
## ⚙️ Getting Started / Setup Instructions

### 1. Clone the repository
```bash
git clone [REPO_URL]
cd [PROJECT_FOLDER]
````

### 2. Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the **backend** folder with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
CORS_ORIGIN_FRONTEND_PROD=https://your-frontend-url
CORS_ORIGIN_FRONTEND_LOCAL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

Create a `.env` file in the **frontend** folder with:

```
NEXT_PUBLIC_API_URL=https://your-backend-url
```

### 4. Start the servers

**Backend**

```bash
cd backend
npm run start:dev
```

**Frontend**

```bash
cd frontend
npm run dev
```

---

## 📚 API Documentation

### **Auth Endpoints**

| Method | Endpoint         | Description                  | Auth Required |
| ------ | ---------------- | ---------------------------- | ------------- |
| POST   | `/auth/register` | Register new user            | ❌             |
| POST   | `/auth/login`    | Login user                   | ❌             |
| GET    | `/auth/me`       | Get currently logged-in user | ✅             |
| POST   | `/auth/logout`   | Logout & invalidate token    | ✅             |

**Request & Response Examples**

**Register**

```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "status": "success",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Login**

```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response**

```json
{
  "status": "success",
  "token": "<JWT_TOKEN>",
  "user": {
    "id": "12345",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### **Post Endpoints**

| Method | Endpoint                        | Description                 | Auth Required |
| ------ | ------------------------------- | --------------------------- | ------------- |
| GET    | `/api/v1/blogs/`                | Get all blogs (public)      | ❌             |
| GET    | `/api/v1/blogs/:slug`           | Get blog by slug            | ❌             |
| POST   | `/api/v1/blogs/`                | Create new blog             | ✅             |
| PUT    | `/api/v1/blogs/:id`             | Update blog (owner only)    | ✅             |
| DELETE | `/api/v1/blogs/:id`             | Delete blog (owner only)    | ✅             |
| GET    | `/api/v1/blogs/user-blogs`      | Get blogs of logged-in user | ✅             |
| DELETE | `/api/v1/blogs/delete-multiple` | Delete multiple blogs       | ✅             |

**Create Blog Example**

```bash
curl -X POST https://your-backend-url/api/v1/blogs \
-H "Authorization: Bearer <token>" \
-F "title=My Blog" \
-F "content=This is a rich text blog post." \
-F "images=@image.jpg"
```

**Get All Blogs Example**

```bash
curl -X GET https://your-backend-url/api/v1/blogs
```

---

---

## 👩‍💻 Author

**Zarqa Shehwar**
Full Stack Developer (MERN / Next.js / Node.js)

---


```

---

```
