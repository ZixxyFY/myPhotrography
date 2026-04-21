const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Contact = require('./models/Contact');

const app = express();
const PORT = 5000;
const projectRoutes = require("./routes/projectRoutes");


// Middleware
app.use(require("cors")());
app.use(express.json());
app.use("/api/projects", require("./routes/projectRoutes"));
// Connect MongoDB
mongoose.connect('mongodb+srv://Trinary_db_user:Nishu%4017@cluster0.wkyv5xf.mongodb.net/?appName=Cluster0')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});
// 👉 ADD HERE 👇 (Forgot Password API)
app.post("/api/forgot-password", async (req, res) => {
  // code hereconst crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("./models/User");

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // generate token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

  await user.save();

  // send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",
      pass: "your_app_password"
    }
  });

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    html: `<p>Click below to reset password:</p>
           <a href="${resetLink}">${resetLink}</a>`
  });

  res.json({ message: "Reset link sent to email" });
});
});

// 👉 Reset Password API
app.post("/api/reset-password/:token", async (req, res) => {
  // code here
  const bcrypt = require("bcryptjs");

app.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;

  await user.save();

  res.json({ message: "Password updated successfully" });
});
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