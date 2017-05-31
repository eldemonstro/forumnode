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
  threadId: {
    type: Number,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  postId: {
    type: Number,
    required: true
  },
  leadPost: Boolean,
  deleted: Boolean
});

mongoose.model('Post', PostSchema);
