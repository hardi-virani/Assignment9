// scripts/checkUsers.js
const mongoose = require('mongoose');
const User = require('../models/userModel');
require('dotenv').config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal');
    console.log('Connected to MongoDB');

    // Find all users
    const users = await User.find({});
    
    console.log(`Found ${users.length} users in the database:`);
    users.forEach(user => {
      console.log(`- Name: ${user.fullName}, Email: ${user.email}, Type: ${user.type}`);
    });
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await mongoose.connection.close();
  }
}

checkUsers();