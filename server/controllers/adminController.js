const DriverApplication = require('../models/DriverApplication');
const User = require('../models/User');
<<<<<<< HEAD

// Get all driver applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await DriverApplication.find({});
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a driver application status
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const application = await DriverApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    application.status = status;
    await application.save();
    res.status(200).json({ message: `Application status updated to ${status}`, data: application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
=======
const asyncHandler = require('express-async-handler');

// @desc    Get all driver applications
// @route   GET /api/admin/applications
// @access  Private (Admin)
exports.getAllApplications = asyncHandler(async (req, res) => {
  const applications = await DriverApplication.find({});
  res.status(200).json(applications);
});

// @desc    Update a driver application status
// @route   PUT /api/admin/applications/:id
// @access  Private (Admin)
exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await DriverApplication.findById(id);
  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }
  application.status = status;
  await application.save();
  res.status(200).json({ message: `Application status updated to ${status}`, data: application });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
});
>>>>>>> b08aa6e (Correct activity frontend and backend)
