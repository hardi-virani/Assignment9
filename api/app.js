// app.js
const express = require("express");
const cors = require("cors");
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/job', jobRoutes);

//TESTING
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Dummy credentials from assignment 8 (or from your DB)
const USERS = [
  { username: "john", password: "1234" },
  { username: "jane", password: "abcd" },
    { username: "alice", password: "password" },
    { username: "bob", password: "qwerty" },
    { username: "charlie", password: "letmein" },
];

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);

  if (user) {
    // Typically you'd create a session or JWT token. We'll just respond with success for now:
    return res.json({ success: true, message: "Login successful" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Company images route
app.get("/api/company-images", (req, res) => {
  // This array simulates images in your DB or filesystem
  const images = [
    {
      name: "Tech Innovators",
      url: "https://via.placeholder.com/300.png?text=Tech+Innovators"
    },
    {
      name: "Creative Solutions",
      url: "https://via.placeholder.com/300.png?text=Creative+Solutions"
    },
    {
      name: "Global Ventures",
      url: "https://via.placeholder.com/300.png?text=Global+Ventures"
    }
  ];

  res.json(images);
});

module.exports = app;