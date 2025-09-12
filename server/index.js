const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const rideRoutes = require('./routes/ride');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

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

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes(io));
app.use('/api/users', userRoutes(io));

app.get('/', (req, res) => {
  res.send('Glide Backend is running!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));