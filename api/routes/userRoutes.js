// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

const router = express.Router();

// Validation helpers
const fullNameValidation = body('fullName')
  .optional()
  .matches(/^[a-zA-Z\s]+$/)
  .withMessage('Full name must contain only alphabetic characters and spaces.');

const emailValidation = body('email')
  .isEmail()
  .withMessage('Invalid email format.');

const passwordValidation = body('password')
  .optional()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
  .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');

const typeValidation = body('type')
  .optional()
  .isIn(['admin', 'employee'])
  .withMessage('User type must be "admin" or "employee".');

// 1. Create User
router.post(
  '/create',
  [
    body('fullName')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Full name must contain only alphabetic characters and spaces.'),
    emailValidation,
    body('password').isStrongPassword().withMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'),
    body('type')
      .isIn(['admin', 'employee'])
      .withMessage('User type must be "admin" or "employee".')
  ],
  userController.createUser
);

// 2. Update User (fullName, password, type)
router.put(
  '/edit',
  [
    emailValidation, // to identify the user to update
    fullNameValidation,
    passwordValidation,
    typeValidation
  ],
  userController.updateUser
);

// 3. Delete User
router.delete('/delete', userController.deleteUser);

// 4. Retrieve All Users
router.get('/getAll', userController.getAllUsers);

// 5. Upload Image
router.post(
  '/uploadImage',
  upload.single('image'), // expecting form-data field named 'image'
  userController.uploadImage
);

// 6. Login User
router.post('/login', userController.loginUser);

module.exports = router;