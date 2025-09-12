const express = require('express');
const { updateLocation } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

module.exports = (io) => {
  router.post('/location', protect, (req, res) => updateLocation(req, res, io));
  return router;
};