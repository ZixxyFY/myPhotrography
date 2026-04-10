const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Contact = require('./models/Contact');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/trivydb')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// ================= REGISTER ROUTE =================
app.post('/register', async (req, res) => {
  try {
    console.log('Register Data:', req.body);

    const { fullName, email, password } = req.body;

    // Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
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

    console.log('Saved User:', newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully'
    });

  } catch (error) {
    console.error('Register Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// ================= CONTACT ROUTE =================
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact Data:', req.body);

    const { cName, cEmail, cMessage } = req.body;

    // Validation
    if (!cName || !cEmail || !cMessage) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create contact
    const newContact = new Contact({
      cName,
      cEmail,
      cMessage
    });

    await newContact.save();

    console.log('Saved Contact:', newContact);

    res.status(201).json({
      success: true,
      message: 'Contact saved successfully'
    });

  } catch (error) {
    console.error('Contact Error:', error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});