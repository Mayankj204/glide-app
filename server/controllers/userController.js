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

    io.emit('driver_location_update', {
      driverId: user._id,
      location: user.location,
    });

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