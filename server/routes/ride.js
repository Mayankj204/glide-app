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

<<<<<<< HEAD
const router = express.Router();

module.exports = (io) => {
  router.post('/request', protect, (req, res) => requestRide(req, res, io));
  router.get('/requested', protect, getRequestedRides);
  router.put('/accept/:rideId', protect, (req, res) => acceptRide(req, res, io));
  router.post('/fare', getFareEstimate);
  router.post('/fares', getFares);
  router.put('/start/:rideId', protect, (req, res) => startRide(req, res, io));
  router.put('/complete/:rideId', protect, (req, res) => completeRide(req, res, io));
  router.post('/match', protect, getMatchingRides);
  router.post('/create-payment-intent', protect, createPaymentIntent);
  router.post('/review/:rideId', protect, submitReview);
  
  return router;
};
=======
// Export a function that accepts 'io'
module.exports = (io) => {
  const router = express.Router();

  // Ride request with io
  router.post('/request', protect, (req, res, next) => {
    req.io = io;
    requestRide(req, res, next);
  });

  // Get all requested rides
  router.get('/requested', protect, getRequestedRides);

  // Accept a ride
  router.put('/accept/:rideId', protect, (req, res, next) => {
    req.io = io;
    acceptRide(req, res, next);
  });

  // Get fare estimate
  router.post('/fare', getFareEstimate);

  // Get fares for all vehicles
  router.post('/fares', getFares);

  // Start ride
  router.put('/start/:rideId', protect, (req, res, next) => {
    req.io = io;
    startRide(req, res, next);
  });

  // Complete ride
  router.put('/complete/:rideId', protect, (req, res, next) => {
    req.io = io;
    completeRide(req, res, next);
  });

  // Match rides with driver route
  router.post('/match', protect, getMatchingRides);

  // Stripe payment intent
  router.post('/create-payment-intent', protect, createPaymentIntent);

  // Submit ride review
  router.post('/review/:rideId', protect, submitReview);

  return router;
};
>>>>>>> b08aa6e (Correct activity frontend and backend)
