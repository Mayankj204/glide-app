const DriverApplication = require('../models/DriverApplication');

// @desc    Submit a new driver application
// @route   POST /api/drivers/apply
// @access  Public
exports.submitApplication = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    vehicleType,
    vehicleNumber,
    vehicleModel,
    vehicleCompany,
    licenseFile,
    vehiclePhotoFile,
    personalPhotoFile,
  } = req.body;

  try {
    const existingApplication = await DriverApplication.findOne({ email });
    if (existingApplication) {
      return res.status(400).json({ message: 'An application with this email already exists.' });
    }

    const newApplication = new DriverApplication({
      fullName,
      email,
      phoneNumber,
      vehicleType,
      vehicleNumber,
      vehicleModel,
      vehicleCompany,
      licenseFile,
      vehiclePhotoFile,
      personalPhotoFile,
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!', data: newApplication });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};