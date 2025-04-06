// server.js
// Add this at the beginning of your routes in server.js
app.get('/', (req, res) => {
  res.send('Server is running!');
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
// In server.js
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Add this at the top of your routes in server.js (after middleware setup)
app.get('/api-test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Also add a specific test for the job route
app.post('/job-test', (req, res) => {
  res.json({ message: 'Job POST route is working!', body: req.body });
});

// Serve static files from the images folder
app.use('/images', express.static('images'));

// Add this to server.js
app.get('/test-job-route', (req, res) => {
  res.json({ message: 'Job routes test endpoint is working' });
});

// Routes
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Company images route
app.get('/company-images', (req, res) => {
  const companyImages = [
    {
      name: "Tech Innovators",
      url: "https://cdn.pixabay.com/photo/2023/02/01/00/54/company-7759278_1280.png"
    },
    {
      name: "Creative Solutions",
      url: "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
    },
    {
      name: "Global Ventures",
      url: "https://www.freepnglogos.com/uploads/company-logo-png/company-logo-transparent-png-19.png"
    }
  ];

  res.json(companyImages);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});