const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    cName: {
      type: String,
      required: true,
      minlength: 2
    },
    cEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    cMessage: {
      type: String,
      required: true,
      minlength: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);