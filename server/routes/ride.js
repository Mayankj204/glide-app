const express = require('express');
const {
  requestRide,
  getRequestedRides,
  acceptRide,
  getFareEstimate,
  getFares,
  startRide,
  completeRide,
  getMatchingRides,
  createPaymentIntent,
  submitReview,
} = require('../controllers/rideController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

module.exports = (io) => {
  // Routes that need the 'io' instance for real-time events
  router.post('/request', protect, (req, res) => requestRide(req, res, io));
  router.put('/accept/:rideId', protect, (req, res) => acceptRide(req, res, io));
  router.put('/start/:rideId', protect, (req, res) => startRide(req, res, io));
  router.put('/complete/:rideId', protect, (req, res) => completeRide(req, res, io));

  // Routes that do NOT need the 'io' instance
  router.get('/requested', protect, getRequestedRides);
  router.post('/fare', getFareEstimate);
  router.post('/fares', getFares);
  router.post('/match', protect, getMatchingRides);
  router.post('/create-payment-intent', protect, createPaymentIntent);
  router.post('/review/:rideId', protect, submitReview);

  return router;
};