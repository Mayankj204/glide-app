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

module.exports = (io) => {
  const router = express.Router();

  router.post('/request', protect, (req, res) => requestRide(req, res, io));
  router.get('/requested', protect, getRequestedRides);
  router.put('/accept/:rideId', protect, (req, res) => acceptRide(req, res, io));
  router.post('/fare', protect, getFareEstimate);
  router.post('/fares', protect, getFares);
  router.put('/start/:rideId', protect, (req, res) => startRide(req, res, io));
  router.put('/complete/:rideId', protect, (req, res) => completeRide(req, res, io));
  router.post('/match', protect, getMatchingRides);
  router.post('/create-payment-intent', protect, createPaymentIntent);
  router.post('/review/:rideId', protect, (req, res) => submitReview(req, res, io));

  return router;
};
