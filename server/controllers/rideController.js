const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ride = require('../models/Ride');
const User = require('../models/User');
const Review = require('../models/Review');
const axios = require('axios');
const vehicleDetails = {
  'Bike': { fareRate: 8, capacity: 1 },
  'Auto': { fareRate: 12, capacity: 3 },
  'Electric Auto': { fareRate: 15, capacity: 3 },
  'Mini Car': { fareRate: 20, capacity: 4 },
  'XL Sedan': { fareRate: 25, capacity: 6 },
  'Luxury': { fareRate: 40, capacity: 4 },
};

const getDistance = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      const distanceInKm = element.distance.value / 1000;
      return distanceInKm;
    } else {
      console.error('Distance Matrix API call failed:', element.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance:', error.message);
    return null;
  }
};

exports.requestRide = async (req, res) => {
  const io = req.io;
  const { pickupLocation, dropoffLocation, vehicleType } = req.body;
  const riderId = req.user.id;

  try {
    const newRide = new Ride({
      rider: riderId,
      pickupLocation,
      dropoffLocation,
      vehicleType,
      status: 'requested',
    });
    await newRide.save();
    io.emit('new_ride_request', newRide);
    res.status(201).json(newRide);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getRequestedRides = async (req, res) => {
  try {
    const rides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.acceptRide = async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    if (ride.status !== 'requested') {
      return res.status(400).json({ message: 'Ride already accepted or unavailable' });
    }
    ride.driver = driverId;
    ride.status = 'accepted';
    await ride.save();
    io.to(ride.rider.toString()).emit('ride_accepted', ride);
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFareEstimate = async (req, res) => {
  const { pickup, dropoff, vehicleType } = req.body;
  const fareRatePerKm = vehicleDetails[vehicleType]?.fareRate || 20;

  try {
    const distance = await getDistance(pickup, dropoff);
    if (distance === null) {
      return res.status(500).json({ message: 'Could not calculate distance.' });
    }
    const estimatedFare = parseFloat((distance * fareRatePerKm).toFixed(2));
    res.status(200).json({ estimatedFare });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFares = async (req, res) => {
  const { pickup, dropoff } = req.body;
  try {
    const distance = await getDistance(pickup, dropoff);
    if (distance === null) {
      return res.status(500).json({ message: 'Could not calculate distance.' });
    }
    const fares = Object.keys(vehicleDetails).map(type => ({
      type,
      fare: parseFloat((distance * vehicleDetails[type].fareRate).toFixed(2)),
      capacity: vehicleDetails[type].capacity,
    }));
    res.status(200).json({ fares });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.startRide = async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.driver.toString() !== driverId) {
      return res.status(404).json({ message: 'Ride not found or unauthorized' });
    }
    ride.status = 'in_progress';
    await ride.save();
    io.to(ride.rider.toString()).emit('ride_started', ride);
    res.status(200).json({ message: 'Ride started', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.completeRide = async (req, res) => {
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.driver.toString() !== driverId) {
      return res.status(404).json({ message: 'Ride not found or unauthorized' });
    }
    ride.status = 'completed';
    const finalDistance = await getDistance(ride.pickupLocation, ride.dropoffLocation);
    if (finalDistance === null) {
       return res.status(500).json({ message: 'Could not calculate final distance.' });
    }
    ride.fare = parseFloat((finalDistance * vehicleDetails[ride.vehicleType].fareRate).toFixed(2));
    await ride.save();
    io.to(ride.rider.toString()).emit('ride_completed', ride);
    res.status(200).json({ message: 'Ride completed', ride });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMatchingRides = async (req, res) => {
  const { driverRoute } = req.body;
  const driverId = req.user.id;

  try {
    const requestedRides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
    const matchingRides = requestedRides.filter(ride => 
      ride.pickupLocation === driverRoute.start && ride.dropoffLocation === driverRoute.end
    );
    res.status(200).json(matchingRides);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createPaymentIntent = async (req, res) => {
  const { rideId } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    const fareInCents = Math.round(ride.fare * 100);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: fareInCents,
      currency: 'inr',
      metadata: { rideId: ride._id.toString() },
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.submitReview = async (req, res) => {
  const { rideId, rating, comment } = req.body;
  const riderId = req.user.id;
  try {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.rider.toString() !== riderId || ride.status !== 'completed') {
      return res.status(404).json({ message: 'Ride not found or cannot be reviewed' });
    }
    const review = new Review({
      ride: rideId,
      rider: riderId,
      driver: ride.driver,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
