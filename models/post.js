// models/post.js

const mongoose = require('mongoose');

// Define post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true }, // Change author to String
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);
