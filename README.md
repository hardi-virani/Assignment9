# React Job Portal - Assignment 9

This project is a **React-based Job Portal** that allows users to log in, browse job listings, and view company profiles. It connects to a **Node.js + MongoDB** backend from Assignment 8 to manage users and images.

---
---

## How to Run the Project

### 1️⃣ Backend Setup (`api/`)

1. Navigate to the backend folder:
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file:
   ```bash
   MONGO_URI=mongodb+srv://<your-db-uri>
   ```

4. Run the backend server:
   ```bash
   node app.js
   ```

### 2️⃣ Frontend Setup (`client/`)

1. Navigate to the frontend folder:
   ```bash
    cd client
    ```

2. Install dependencies:
   ```bash
    npm install
    ```

3. Start the React app:
   ```bash
    npm start
    ```

App will run on: http://localhost:3000

---

## Login System
- The login page connects to the backend /user/login route from Assignment 8.
- Uses Axios to authenticate with saved credentials.
- Session is stored using localStorage.

## Pages Implemented
- Home Page: Welcome section and intro.
- About Page: Company story and mission.
- Job Listings Page:
- Data is stored in src/data/jobPosts.js.
- Each card displays: job title, description, salary, required skills.
- Text is truncated to maintain uniform card height.
- Contact Page: Static contact information.
- Company Showcase Page:
- Fetches company images from the backend.
- Displays them using Material UI cards in a responsive grid.

## Technologies Used

1. Frontend (React)
	- React Router DOM
	- Axios
	- Material UI (v5)
	- Functional components with hooks
	- Responsive layout

2. Backend (Node.js - Assignment 8)
	- Express.js
	- MongoDB with Mongoose
	- bcrypt for password hashing
	- multer for image uploads
	- Swagger UI for API documentation


## Notes
- CORS must be enabled in the backend (app.use(cors(...))) to allow frontend requests.
- Make sure backend is running before using login or viewing company showcase.
- Future Assignment 10 will restructure the API to support user-specific content.
