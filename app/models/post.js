const mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  thread: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Post', PostSchema);
