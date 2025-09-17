<<<<<<< HEAD
const User = require('../models/User');

// @desc    Update a driver's location
// @route   POST /api/users/location
// @access  Private (Driver)
exports.updateLocation = async (req, res, io) => {
  const { latitude, longitude } = req.body;
  const driverId = req.user.id;

  try {
    const user = await User.findById(driverId);
    if (!user || user.role !== 'driver') {
      return res.status(403).json({ message: 'Unauthorized or not a driver' });
    }

    user.location = { latitude, longitude };
    await user.save();

=======
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ride = require('../models/Ride');

// Generate JWT token for user
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// Get user profile
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      location: user.location,
      isAvailable: user.isAvailable,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  user.username = username || user.username;
  user.email = email || user.email;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});

// Get user activities (rides, wallet, rewards)
exports.getUserActivities = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const rides = await Ride.find({
    $or: [{ rider: userId }, { driver: userId }],
  }).sort({ createdAt: -1 });

  const activities = rides.map((ride) => {
    const isRider = ride.rider.toString() === userId;
    return {
      id: ride._id,
      type: 'ride',
      title: isRider ? 'Ride Completed' : 'Ride as Driver',
      details: `${ride.pickupLocation} to ${ride.dropoffLocation}`,
      date: ride.createdAt.toISOString(),
      amount: ride.fare,
      status: ride.status,
    };
  });

  const mockWalletActivities = [
    {
      id: 'wallet-1',
      type: 'wallet',
      title: 'Wallet Top-up',
      details: 'Added money to wallet',
      date: new Date(Date.now() - 86400000).toISOString(),
      amount: 500,
    },
  ];

  const mockRewardActivities = [
    {
      id: 'reward-1',
      type: 'reward',
      title: 'Points Earned',
      details: 'Earned 200 points for a long ride',
      date: new Date(Date.now() - 172800000).toISOString(),
      amount: 200,
    },
  ];

  const allActivities = [...activities, ...mockWalletActivities, ...mockRewardActivities];
  allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.status(200).json(allActivities);
});

// Update driver location
exports.updateLocation = asyncHandler(async (req, res, io) => {
  const { latitude, longitude } = req.body;
  const driverId = req.user.id;

  const user = await User.findById(driverId);
  if (!user || user.role !== 'driver') {
    res.status(403);
    throw new Error('Unauthorized or not a driver');
  }

  user.location = { latitude, longitude };
  await user.save();

  if (io) {
>>>>>>> b08aa6e (Correct activity frontend and backend)
    io.emit('driver_location_update', {
      driverId: user._id,
      location: user.location,
    });
<<<<<<< HEAD

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (riders and drivers)
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
=======
  }

  res.status(200).json({ message: 'Location updated successfully', location: user.location });
});

// Toggle driver availability
exports.setDriverAvailability = asyncHandler(async (req, res, io) => {
  const driverId = req.user.id;
  const user = await User.findById(driverId);
  if (!user || user.role !== 'driver') {
    res.status(403);
    throw new Error('Unauthorized or not a driver');
  }

  user.isAvailable = req.body.isAvailable ?? user.isAvailable;
  await user.save();

  if (io) {
    io.emit('driver_availability_update', { driverId: user._id, isAvailable: user.isAvailable });
  }

  res.status(200).json({ message: 'Availability updated', isAvailable: user.isAvailable });
});

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});

// Get driver ride history
exports.getRideHistory = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const rides = await Ride.find({
    $or: [{ rider: userId }, { driver: userId }],
  }).populate('rider', 'username').populate('driver', 'username');

  res.status(200).json(rides);
});
>>>>>>> b08aa6e (Correct activity frontend and backend)
