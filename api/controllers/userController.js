// controllers/userController.js
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');

// CREATE USER
// In userController.js
exports.createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { fullName, email, password, type } = req.body;
    
    // Log the type to verify it's being received
    console.log('User registration request received with type:', type);

    // Validate user type
    if (!type || !['admin', 'employee'].includes(type)) {
      console.log('Invalid or missing type, defaulting to employee');
      // Default to employee if type is missing or invalid
      userType = 'employee';
    } else {
      userType = type;
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      type: userType // Use the validated type
    });

    await newUser.save();
    
    // Log the created user to verify type
    console.log('User created with type:', newUser.type);
    
    return res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('Error creating user:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { email, fullName, password, type } = req.body;

    // Make sure user with this email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update user fields
    if (fullName) existingUser.fullName = fullName;
    if (type && ['admin', 'employee'].includes(type)) existingUser.type = type;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(password, salt);
    }

    await existingUser.save();
    return res.status(200).json({ message: 'User updated successfully.' });
  } catch (err) {
    console.error('Error updating user:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // If the user has an image, delete it from the server
    if (existingUser.imageFilePath) {
      const imagePath = path.join(__dirname, '..', existingUser.imageFilePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await User.deleteOne({ email });
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    return res.status(200).json({ users });
  } catch (err) {
    console.error('Error retrieving users:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// UPLOAD IMAGE
exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      // Multer might already have stored the file, so delete it if necessary
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if user already has an image
    if (existingUser.imageFilePath) {
      // If an image already exists, we do not allow a second upload
      // Delete newly uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'Image already exists for this user.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded or invalid file format.' });
    }

    // Update user with the new image path
    const relativePath = path.join('images', path.basename(req.file.path));
    existingUser.imageFilePath = relativePath;
    await existingUser.save();

    return res.status(201).json({
      message: 'Image uploaded successfully.',
      filePath: `/${relativePath}`
    });
  } catch (err) {
    console.error('Error uploading image:', err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("Login request received:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // If matched, return user info including type (but not password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName,
        type: user.type
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};