const { validationResult } = require('express-validator');
const Job = require('../models/jobModel');
const User = require('../models/userModel');

// Create new job (admin only)
// In controllers/jobController.js
// In jobController.js
exports.createJob = async (req, res) => {
  try {
    console.log('Received job creation request:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false,
        error: errors.array()[0].msg 
      });
    }

    const { companyName, jobTitle, description, salary, email } = req.body;

    console.log('Creating job with admin email:', email);

    // Verify admin exists
    const admin = await User.findOne({ email });
    if (!admin) {
      console.log('Admin not found with email:', email);
      return res.status(404).json({ 
        success: false,
        error: `User not found with email: ${email}` 
      });
    }
    
    console.log('Admin found. User type:', admin.type);
    
    // Verify user is admin
    if (admin.type !== 'admin') {
      console.log('User is not an admin. Type:', admin.type);
      return res.status(403).json({ 
        success: false,
        error: 'Access denied. Admin privileges required.' 
      });
    }

    console.log('Admin verified. Creating job...');

    // Create new job
    const newJob = new Job({
      companyName,
      jobTitle,
      description,
      salary,
      createdBy: admin._id
    });

    await newJob.save();
    console.log('Job created successfully with ID:', newJob._id);
    
    return res.status(201).json({ 
      success: true,
      message: 'Job created successfully',
      jobId: newJob._id 
    });
  } catch (err) {
    console.error('Error creating job:', err.message);
    return res.status(500).json({ 
      success: false,
      error: `Server error: ${err.message}` 
    });
  }
};
// Get all jobs
// In controllers/jobController.js
exports.getAllJobs = async (req, res) => {
  try {
    console.log('Fetching all jobs...');
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log(`Found ${jobs.length} jobs`);
    
    return res.status(200).json({ 
      success: true,
      jobs 
    });
  } catch (err) {
    console.error('Error fetching jobs:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};