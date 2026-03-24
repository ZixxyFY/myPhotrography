const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      match: [/^[A-Za-z ]+$/, 'Name should contain only letters and spaces']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);