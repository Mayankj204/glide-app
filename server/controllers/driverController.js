const DriverApplication = require('../models/DriverApplication');
<<<<<<< HEAD
=======
const asyncHandler = require('express-async-handler');
>>>>>>> b08aa6e (Correct activity frontend and backend)

// @desc    Submit a new driver application
// @route   POST /api/drivers/apply
// @access  Public
<<<<<<< HEAD
exports.submitApplication = async (req, res) => {
=======
exports.submitApplication = asyncHandler(async (req, res) => {
>>>>>>> b08aa6e (Correct activity frontend and backend)
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

<<<<<<< HEAD
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
=======
  // Input validation
  if (!fullName || !email || !phoneNumber || !vehicleType || !vehicleNumber || !vehicleModel || !vehicleCompany) {
    res.status(400);
    throw new Error('Please fill all required fields.');
  }

  const existingApplication = await DriverApplication.findOne({ email });
  if (existingApplication) {
    res.status(400);
    throw new Error('An application with this email already exists.');
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
});
>>>>>>> b08aa6e (Correct activity frontend and backend)
