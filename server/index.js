const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

<<<<<<< HEAD
// Routes
=======
// Import Routes
>>>>>>> b08aa6e (Correct activity frontend and backend)
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/ride');
const userRoutes = require('./routes/user');
const driverRoutes = require('./routes/driver');
const adminRoutes = require('./routes/admin');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
<<<<<<< HEAD
  optionsSuccessStatus: 200
}));
app.use(express.json());

// MongoDB connection
=======
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Connect to MongoDB
>>>>>>> b08aa6e (Correct activity frontend and backend)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

<<<<<<< HEAD
// Socket.IO connection
=======
// Socket.IO Setup
>>>>>>> b08aa6e (Correct activity frontend and backend)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room.`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
<<<<<<< HEAD
app.use('/api/rides', rideRoutes(io)); // Pass io here
app.use('/api/users', userRoutes(io)); // If needed
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
=======
app.use('/api/rides', rideRoutes(io));
app.use('/api/users', userRoutes(io));
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
>>>>>>> b08aa6e (Correct activity frontend and backend)
app.get('/', (req, res) => {
  res.send('Glide Backend is running!');
});

<<<<<<< HEAD
// Start server
=======
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
>>>>>>> b08aa6e (Correct activity frontend and backend)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
