// scripts/addSampleJob.js
require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../models/jobModel');
const User = require('../models/userModel');

async function addSampleJob() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal');
    console.log('Connected to MongoDB');

    // Find an admin user
    const adminUser = await User.findOne({ type: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found. Creating a sample job without admin reference.');
    } else {
      console.log(`Found admin user: ${adminUser.email}`);
    }

    // Create a sample job
    const sampleJob = new Job({
      companyName: 'Tech Innovators',
      jobTitle: 'Full Stack Developer',
      description: 'We are looking for a talented Full Stack Developer to join our team. The ideal candidate will have experience with React, Node.js, and MongoDB.',
      salary: '$80,000 - $100,000',
      createdBy: adminUser ? adminUser._id : null,
      createdAt: new Date()
    });

    await sampleJob.save();
    console.log('Sample job created successfully with ID:', sampleJob._id);

    // Create another sample job
    const anotherJob = new Job({
      companyName: 'Creative Solutions',
      jobTitle: 'UX/UI Designer',
      description: 'We are seeking a creative UX/UI Designer with experience in creating intuitive and engaging user interfaces. Knowledge of Figma and Adobe Creative Suite is required.',
      salary: '$70,000 - $90,000',
      createdBy: adminUser ? adminUser._id : null,
      createdAt: new Date()
    });

    await anotherJob.save();
    console.log('Second sample job created successfully with ID:', anotherJob._id);

    console.log('All sample jobs created successfully!');
  } catch (error) {
    console.error('Error adding sample jobs:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
addSampleJob();