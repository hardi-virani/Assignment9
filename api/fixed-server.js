// fixed-server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// User Model
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['admin', 'employee'],
    required: true,
    default: 'employee'
  },
  imageFilePath: {
    type: String,
    default: null
  }
});

const User = mongoose.model('User', userSchema);

// Job Model
const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model('Job', jobSchema);

// User Routes
app.post('/user/create', [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('type').isIn(['admin', 'employee']).withMessage('User type must be admin or employee')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { fullName, email, password, type } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      type: type || 'employee'
    });

    await user.save();
    
    console.log(`User created: ${email}, Type: ${type}`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log(`Login attempt: ${email}`);
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Success
    console.log(`Login successful: ${email}, Type: ${user.type}`);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        email: user.email,
        fullName: user.fullName,
        type: user.type
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

app.get('/user/getAll', async (req, res) => {
  try {
    console.log('Fetching all users');
    const users = await User.find({}, { password: 0 }); // Exclude password
    console.log(`Found ${users.length} users`);
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Job Routes
app.post('/job/create', [
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('jobTitle').notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('salary').notEmpty().withMessage('Salary is required'),
  body('email').isEmail().withMessage('Valid admin email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { companyName, jobTitle, description, salary, email } = req.body;
    
    console.log(`Create job request from: ${email}`);
    
    // Verify admin
    const admin = await User.findOne({ email });
    if (!admin || admin.type !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    // Create job
    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary,
      createdBy: admin._id
    });

    await job.save();
    
    console.log(`Job created: ${jobTitle} by ${email}`);
    res.status(201).json({ 
      success: true,
      message: 'Job created successfully',
      jobId: job._id
    });
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/job/getAll', async (req, res) => {
  try {
    console.log('Fetching all jobs');
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log(`Found ${jobs.length} jobs`);
    
    res.json({ 
      success: true,
      jobs
    });
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Company images route
app.get('/company-images', (req, res) => {
  const companyImages = [
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

  res.json(companyImages);
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'API is working correctly!' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});