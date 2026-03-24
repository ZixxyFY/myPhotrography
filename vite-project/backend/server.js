const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/photographyDB')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Register route
app.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if fields are empty
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'Account created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});