const express = require('express');
<<<<<<< HEAD
const { submitApplication, getAllApplications, updateApplicationStatus } = require('../controllers/driverController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', submitApplication);
router.get('/applications', protect, getAllApplications);
router.put('/applications/:id', protect, updateApplicationStatus);
=======
const { submitApplication } = require('../controllers/driverController');
const { getAllApplications } = require('../controllers/adminController'); // Correct import
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', submitApplication);
router.get('/applications', protect, getAllApplications); // This line must be present and correct
>>>>>>> b08aa6e (Correct activity frontend and backend)

module.exports = router;