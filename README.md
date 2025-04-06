# Job Portal - Admin & Employee Portal with Redux - Assignment 10

This project implements a job portal with role-based access control, using React, Redux, Node.js, Express, and MongoDB.

---
---

## Key Features

### Role-Based Authentication

- User registration with role selection (admin/employee)
- Role-specific access to routes and features
- Protected routes for authenticated users


### Admin Features

- View all users in a table format
- Create new job listings
- Admin-only protected routes


### Employee Features

- View all job listings with pagination
- Employee-only protected routes


### Technical Implementation

- Redux for global state management
- Material UI components
- Loading spinners during API calls
- Error handling

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)


### 1️⃣  Getting Started

1. Navigate to the backend folder:
   ```bash
   git clone <your-repo-url>
   ```

2. Backend Setup:
   ```bash
   npm install
   ```

3. Create .env file with:
   ```bash
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/job-portal
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 2️⃣ Frontend Setup 

1. Navigate to the frontend folder:
   ```bash
    npm install
    npm start
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

##  API Endpoints

1. User Authentication

- Register User

- POST /user/create
   - Body:
      ```bash
      "fullName": "John Doe",
      "email": "john@example.com",
      "password": "Password@123",
      "type": "admin" // or "employee"
      ```


- Login User

- POST /user/login

   - Body:
      ```bash
      "email": "john@example.com",
      "password": "Password@123"
      ```
2. Admin Endpoints


- Get All Users
   - GET /user/getAll

- Create Job
   - POST /job/create

   - Body:
      ```bash
      "companyName": "Tech Corp",
      "jobTitle": "Full Stack Developer",
      "description": "Experienced developer needed...",
      "salary": "$80,000 - $100,000",
      "email": "admin@example.com"
      ```

3. Employee Endpoints

- Get All Jobs

   - GET /job/getAll

4. Company Images

- GET /company-images

---

### Frontend Routes

1. Public Routes

   - /login - Login page
   - /register - Registration page


2. Protected Routes (require authentication)

   - / - Home page
   - /about - About page
   - /contact - Contact page
   - /companies - Company showcase


3. Admin Routes (require admin role)

   - /admin/employees - View all users
   - /admin/add-job - Add new job


4. Employee Routes (require employee role)

   - /jobs - View all job listings


--- 

### Testing the Application

#### Admin Workflow

1. Register an account with type "admin"
2. Login with your admin credentials
3. You'll be redirected to the admin dashboard
4. Navigate to "Employees" to view all users
5. Navigate to "Add Job" to create new job listings

#### Employee Workflow

1. Register an account with type "employee"
2. Login with your employee credentials
3. You'll be redirected to the jobs page
4. Browse available job listings

---

### Redux Implementation

- Auth Slice - Manages user authentication state
- Job Slice - Handles job creation and retrieval
- User Slice - Manages user listing and creation


### How to Get Full Marks

- Ensure all routes are properly protected based on user roles
- Implement proper error handling in all forms
- Use Redux for all state management
- Implement loading indicators during API calls
- Test the complete workflow for both admin and employee roles
- Ensure all required features are implemented  according to the assignment rubric

---

## Project Structure

### Frontend
 
```bash
/src
  /components        - UI components
    /admin           - Admin-specific components
  /store             - Redux store
    /slices          - Redux slices (auth, jobs, users)
  /services          - API services
  /config            - Configuration
  App.jsx            - Main component with routes

  ```

### Backend
```bash
Copy/controllers     - Request handlers
/models              - MongoDB schemas
/routes              - API routes
/middlewares         - Custom middleware
server.js            - Entry point 
```


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
