const express = require('express');
const { body } = require('express-validator');
const jobController = require('../controllers/jobController');

const router = express.Router();

// Create new job (admin only)
router.post(
  '/create',
  [
    body('companyName').notEmpty().withMessage('Company name is required'),
    body('jobTitle').notEmpty().withMessage('Job title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('salary').notEmpty().withMessage('Salary is required'),
    body('email').isEmail().withMessage('Valid admin email is required')
  ],
  jobController.createJob
);

// Get all jobs
router.get('/getAll', jobController.getAllJobs);

module.exports = router;