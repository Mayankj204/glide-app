const express = require('express');
const { submitApplication, getAllApplications, updateApplicationStatus } = require('../controllers/driverController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', submitApplication);
router.get('/applications', protect, getAllApplications);
router.put('/applications/:id', protect, updateApplicationStatus);

module.exports = router;