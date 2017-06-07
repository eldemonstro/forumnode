const mongoose = require('mongoose');

var CountInfoSchema = new mongoose.Schema({
  postNumber: Number,
  threadNumber: Number,
  userNumber: 0,
  info: String
});

mongoose.model('Info', CountInfoSchema);
