const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and Body Parser middleware
app.use(cors());
app.use(express.json());

// In-Memory Database Fallback System
// Ensures the application remains fully functional even if MongoDB is not running locally.
let isUsingMongoDB = false;
let bookingsMemoryDb = [];
let trainersMemoryDb = [
  {
    _id: "t1",
    name: "Ava Reyes",
    role: "Combat & Conditioning",
    handle: "@ava.meliora",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800",
    specialties: ["Combat", "MMA", "HIIT"],
    number: "01"
  },
  {
    _id: "t2",
    name: "Kai Mercer",
    role: "Strength & Hypertrophy",
    handle: "@kai.meliora",
    image: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?q=80&w=800",
    specialties: ["Hypertrophy", "Olympic Lifting", "Powerbuilding"],
    number: "02"
  },
  {
    _id: "t3",
    name: "Lena Park",
    role: "Mobility & Movement",
    handle: "@lena.meliora",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800",
    specialties: ["Mobility", "Pilates", "Breathwork"],
    number: "03"
  }
];

// Database Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gym_meliora';
console.log('Attempting to connect to MongoDB...');

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 3000 // Quick timeout to fallback if DB is not available
})
.then(() => {
  console.log('🚀 Success: Connected to MongoDB.');
  isUsingMongoDB = true;
})
.catch((err) => {
  console.warn('⚠️ Warning: MongoDB connection failed. Falling back to local In-Memory Persistence.');
  console.log('Reason for failure:', err.message);
  console.log('App is now running in seamless In-Memory Mock Mode.');
  isUsingMongoDB = false;
});

// Import Mongoose Models (if using MongoDB)
const Booking = require('./models/Booking');
const Trainer = require('./models/Trainer');

// Import Routes
const shareLinksRouter = require('./routes/shareLinks');

// --- API ROUTES ---

// 1. Health & Status Check
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    databaseMode: isUsingMongoDB ? 'MongoDB' : 'In-Memory Persisted Mock',
    timestamp: new Date()
  });
});

// 2. Fetch all Trainers (Vanguard)
app.get('/api/trainers', async (req, res) => {
  try {
    if (isUsingMongoDB) {
      const trainers = await Trainer.find().sort({ number: 1 });
      if (trainers.length > 0) {
        return res.json(trainers);
      }
    }
    // Return memory DB fallback if MongoDB failed or is empty
    return res.json(trainersMemoryDb);
  } catch (error) {
    console.error('Error fetching trainers:', error);
    res.status(500).json({ error: 'Server error retrieving trainers data' });
  }
});

// 3. Post a private tour reservation
app.post('/api/bookings', async (req, res) => {
  try {
    const { fullName, email, phone, interest } = req.body;

    // Validate request body
    if (!fullName || !email || !phone || !interest) {
      return res.status(400).json({ error: 'Please provide all required fields (fullName, email, phone, interest)' });
    }

    const newBookingData = {
      fullName,
      email,
      phone,
      interest,
      createdAt: new Date()
    };

    if (isUsingMongoDB) {
      const booking = new Booking(newBookingData);
      await booking.save();
      return res.status(201).json({
        success: true,
        message: 'Walkthrough request received and stored in MongoDB successfully.',
        booking
      });
    } else {
      // Memory DB storage
      const bookingMemory = {
        _id: 'b_' + Math.random().toString(36).substr(2, 9),
        ...newBookingData
      };
      bookingsMemoryDb.push(bookingMemory);
      console.log('📥 Saved booking to In-Memory Persistence:', bookingMemory);
      return res.status(201).json({
        success: true,
        message: 'Walkthrough request received and stored in In-Memory Persisted Mock successfully.',
        booking: bookingMemory
      });
    }
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Server error saving booking walkthrough' });
  }
});

// 4. Admin endpoint to view all bookings (for demo verification)
app.get('/api/admin/bookings', async (req, res) => {
  try {
    if (isUsingMongoDB) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json(bookings);
    }
    // Sort memory bookings descending by date
    const sortedMemoryBookings = [...bookingsMemoryDb].sort((a, b) => b.createdAt - a.createdAt);
    return res.json(sortedMemoryBookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Server error retrieving bookings list' });
  }
});

// 5. Share Links API Routes
app.use('/api/share-links', shareLinksRouter);

// Base Route
app.get('/', (req, res) => {
  res.send('Gym Meliora Full Stack API Server is running. Access endpoints via /api/...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🏋️ Gym Meliora Server listening on http://localhost:${PORT}`);
  console.log(`Database URL: ${mongoURI}`);
  console.log(`====================================================`);
});
