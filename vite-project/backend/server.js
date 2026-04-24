const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('./models/User');
const Contact = require('./models/Contact');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use('/api/projects', projectRoutes);

// ─── Connect MongoDB ─────────────────────────────────────────
mongoose.connect('mongodb+srv://Trinary_db_user:Nishu%4017@cluster0.wkyv5xf.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// ─── Health Check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// ─── Forgot Password ─────────────────────────────────────────
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // NOTE: Configure nodemailer with real credentials before using in production
    console.log(`[Forgot Password] Reset token for ${email}: ${token}`);
    res.json({ message: 'Reset link sent to email' });

  } catch (err) {
    console.error('[Forgot Password] Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── Reset Password ──────────────────────────────────────────
app.post('/api/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error('[Reset Password] Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
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