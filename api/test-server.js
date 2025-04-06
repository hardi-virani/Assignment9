// test-server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test routes
app.get('/test', (req, res) => {
  res.json({ message: 'GET test route works!' });
});

app.post('/test-post', (req, res) => {
  res.json({ 
    message: 'POST test route works!', 
    receivedData: req.body 
  });
});

// Direct job route
app.post('/job/create', (req, res) => {
  console.log('Received job creation request:', req.body);
  res.status(201).json({ 
    success: true,
    message: 'Job creation endpoint reached successfully!',
    receivedData: req.body
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});