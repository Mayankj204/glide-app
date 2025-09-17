const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Ride = require('../models/Ride');
const User = require('../models/User');
const Review = require('../models/Review');
const axios = require('axios');
<<<<<<< HEAD

=======
const asyncHandler = require('express-async-handler');

// Vehicle fare and capacity details
>>>>>>> b08aa6e (Correct activity frontend and backend)
const vehicleDetails = {
  'Bike': { fareRate: 8, capacity: 1 },
  'Auto': { fareRate: 12, capacity: 3 },
  'Electric Auto': { fareRate: 15, capacity: 3 },
  'Mini Car': { fareRate: 20, capacity: 4 },
  'XL Sedan': { fareRate: 25, capacity: 6 },
  'Luxury': { fareRate: 40, capacity: 4 },
};

<<<<<<< HEAD
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
=======
// Function to get distance between two locations using Google Maps API
const getDistance = async (origin, destination) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_MAPS_API_KEY is not set in environment variables.');
    return null;
  }

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status !== 'OK' || !response.data.rows[0]) {
      console.error('Distance Matrix API call failed:', response.data.status);
      return null;
    }
    const element = response.data.rows[0].elements[0];
    if (element.status === 'OK') {
      const distanceInKm = element.distance.value / 1000; // meters to km
      return distanceInKm;
    } else {
      console.error('Distance Matrix API element error:', element.status);
>>>>>>> b08aa6e (Correct activity frontend and backend)
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance:', error.message);
    return null;
  }
};

<<<<<<< HEAD
exports.requestRide = async (req, res) => {
=======
// Request a ride
exports.requestRide = asyncHandler(async (req, res) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
  const io = req.io;
  const { pickupLocation, dropoffLocation, vehicleType } = req.body;
  const riderId = req.user.id;

<<<<<<< HEAD
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
=======
  if (!pickupLocation || !dropoffLocation || !vehicleType) {
    res.status(400);
    throw new Error('pickupLocation, dropoffLocation, and vehicleType are required.');
  }

  const newRide = new Ride({
    rider: riderId,
    pickupLocation,
    dropoffLocation,
    vehicleType,
    status: 'requested',
  });

  await newRide.save();
  if (io) io.emit('new_ride_request', newRide); // Emit to all connected clients

  res.status(201).json(newRide);
});

// Get all requested rides
exports.getRequestedRides = asyncHandler(async (req, res) => {
  const rides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
  res.status(200).json(rides);
});

// Accept a ride
exports.acceptRide = asyncHandler(async (req, res) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

<<<<<<< HEAD
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
=======
  const ride = await Ride.findById(rideId);
  if (!ride) {
    res.status(404);
    throw new Error('Ride not found');
  }
  if (ride.status !== 'requested') {
    res.status(400);
    throw new Error('Ride already accepted or unavailable');
  }

  ride.driver = driverId;
  ride.status = 'accepted';
  await ride.save();

  if (io) io.to(ride.rider.toString()).emit('ride_accepted', ride); // Emit to rider only
  res.status(200).json(ride);
});

// Get fare estimate
exports.getFareEstimate = asyncHandler(async (req, res) => {
  const { pickup, dropoff, vehicleType } = req.body;

  if (!pickup || !dropoff || !vehicleType) {
    res.status(400);
    throw new Error('pickup, dropoff, and vehicleType are required.');
  }

  const fareRatePerKm = vehicleDetails[vehicleType]?.fareRate;
  if (!fareRatePerKm) {
    res.status(400);
    throw new Error('Invalid vehicleType');
  }

  const distance = await getDistance(pickup, dropoff);
  if (distance === null || isNaN(distance)) {
    res.status(500);
    throw new Error('Could not calculate distance.');
  }

  const estimatedFare = parseFloat((distance * fareRatePerKm).toFixed(2));
  res.status(200).json({ estimatedFare });
});

// Get fares for all vehicle types
exports.getFares = asyncHandler(async (req, res) => {
  const { pickup, dropoff } = req.body;

  if (!pickup || !dropoff) {
    res.status(400);
    throw new Error('pickup and dropoff are required.');
  }

  const distance = await getDistance(pickup, dropoff);
  if (distance === null || isNaN(distance)) {
    res.status(500);
    throw new Error('Could not calculate distance.');
  }

  const fares = Object.keys(vehicleDetails).map((type) => ({
    type,
    fare: parseFloat((distance * vehicleDetails[type].fareRate).toFixed(2)),
    capacity: vehicleDetails[type].capacity,
  }));

  res.status(200).json({ fares });
});

// Start ride
exports.startRide = asyncHandler(async (req, res) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

<<<<<<< HEAD
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
=======
  const ride = await Ride.findById(rideId);
  if (!ride || ride.driver.toString() !== driverId) {
    res.status(404);
    throw new Error('Ride not found or unauthorized');
  }

  ride.status = 'in_progress';
  await ride.save();

  if (io) io.to(ride.rider.toString()).emit('ride_started', ride);
  res.status(200).json({ message: 'Ride started', ride });
});

// Complete ride
exports.completeRide = asyncHandler(async (req, res) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
  const io = req.io;
  const { rideId } = req.params;
  const driverId = req.user.id;

<<<<<<< HEAD
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
=======
  const ride = await Ride.findById(rideId);
  if (!ride || ride.driver.toString() !== driverId) {
    res.status(404);
    throw new Error('Ride not found or unauthorized');
  }

  ride.status = 'completed';
  const finalDistance = await getDistance(ride.pickupLocation, ride.dropoffLocation);
  if (finalDistance === null || isNaN(finalDistance)) {
    res.status(500);
    throw new Error('Could not calculate final distance.');
  }

  ride.fare = parseFloat((finalDistance * vehicleDetails[ride.vehicleType].fareRate).toFixed(2));
  await ride.save();

  if (io) io.to(ride.rider.toString()).emit('ride_completed', ride);
  res.status(200).json({ message: 'Ride completed', ride });
});

// Get matching rides for driver route
exports.getMatchingRides = asyncHandler(async (req, res) => {
  const { driverRoute } = req.body;

  if (!driverRoute || !driverRoute.start || !driverRoute.end) {
    res.status(400);
    throw new Error('driverRoute.start and driverRoute.end are required.');
  }

  const requestedRides = await Ride.find({ status: 'requested' }).populate('rider', 'username');
  const matchingRides = requestedRides.filter(
    (ride) => ride.pickupLocation === driverRoute.start && ride.dropoffLocation === driverRoute.end
  );

  res.status(200).json(matchingRides);
});

// Create Stripe payment intent
exports.createPaymentIntent = asyncHandler(async (req, res) => {
  const { rideId } = req.body;

  if (!rideId) {
    res.status(400);
    throw new Error('rideId is required');
  }

  const ride = await Ride.findById(rideId);
  if (!ride) {
    res.status(404);
    throw new Error('Ride not found');
  }

  const fareInCents = Math.round(ride.fare * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: fareInCents,
    currency: 'inr',
    metadata: { rideId: ride._id.toString() },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
});

// Submit review
exports.submitReview = asyncHandler(async (req, res) => {
  const { rideId, rating, comment } = req.body;
  const riderId = req.user.id;

  if (!rideId || !rating) {
    res.status(400);
    throw new Error('rideId and rating are required');
  }

  const ride = await Ride.findById(rideId);
  if (!ride || ride.rider.toString() !== riderId || ride.status !== 'completed') {
    res.status(404);
    throw new Error('Ride not found or cannot be reviewed');
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
});
>>>>>>> b08aa6e (Correct activity frontend and backend)
