// models/userModel.js
const mongoose = require('mongoose');

// In userModel.js
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
module.exports = mongoose.model('User', userSchema);