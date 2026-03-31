const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// Home Route
app.get('/', (req, res) => {
  res.send('Express + MongoDB Connected!');
});

// Insert Test Data
app.get('/add-user', async (req, res) => {
  try {
    const newUser = new User({
      name: 'Nishu',
      age: 21
    });

    await newUser.save();
    res.send('User added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});