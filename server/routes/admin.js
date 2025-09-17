const express = require('express');
const { getAllApplications, updateApplicationStatus, getAllUsers } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/applications', protect, getAllApplications);
router.put('/applications/:id', protect, updateApplicationStatus);
router.get('/users', protect, getAllUsers);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> b08aa6e (Correct activity frontend and backend)
