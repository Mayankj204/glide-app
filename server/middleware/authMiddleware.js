const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
=======

      // Decode JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded); // Debug

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        console.error('User not found for decoded ID:', decoded.id);
        return res.status(401).json({ message: 'User not found' });
      }

>>>>>>> b08aa6e (Correct activity frontend and backend)
      next();
    } catch (error) {
      console.error('Token error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
<<<<<<< HEAD
=======
    console.error('No token found in headers');
>>>>>>> b08aa6e (Correct activity frontend and backend)
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
