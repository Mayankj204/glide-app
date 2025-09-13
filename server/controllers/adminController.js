const DriverApplication = require('../models/DriverApplication');
const User = require('../models/User');

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
