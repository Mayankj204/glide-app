const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
<<<<<<< HEAD
    default: 'rider' // Removed the enum, all new users are riders by default
=======
    default: 'rider'
>>>>>>> b08aa6e (Correct activity frontend and backend)
  },
  location: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
});

<<<<<<< HEAD
// Hash password before saving the user
=======
// Hash password before saving
>>>>>>> b08aa6e (Correct activity frontend and backend)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

<<<<<<< HEAD
// Method to compare passwords
=======
// Compare password method
>>>>>>> b08aa6e (Correct activity frontend and backend)
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
<<<<<<< HEAD
module.exports = User;
=======
module.exports = User;
>>>>>>> b08aa6e (Correct activity frontend and backend)
