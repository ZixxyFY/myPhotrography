const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String },
  type: { type: String },
  date: { type: Date },
  comment: { type: String },
  status: { type: String, default: "pending" },
  shotList: [String], // Array to store multiple shot names
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);