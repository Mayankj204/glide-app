const express = require('express');
<<<<<<< HEAD
const { registerUser, loginUser } = require('../controllers/authController');
=======
const { registerUser, loginUser } = require('../controllers/userController');
>>>>>>> b08aa6e (Correct activity frontend and backend)

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;