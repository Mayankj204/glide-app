<<<<<<< HEAD
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'rider'
  },
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
});

// Hash password before saving the user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
=======
const express = require('express');
const { updateLocation, getAllUsers, getUserActivities } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Export a function that receives 'io' for Socket.IO communication
module.exports = (io) => {
  const router = express.Router();

  // Update driver location
  router.post('/location', protect, (req, res) => updateLocation(req, res, io));

  // Get all users (admin only)
  router.get('/', protect, getAllUsers);

  // Get user activities (rides, wallet, rewards)
  router.get('/activity', protect, getUserActivities);

  return router;
};
>>>>>>> b08aa6e (Correct activity frontend and backend)
