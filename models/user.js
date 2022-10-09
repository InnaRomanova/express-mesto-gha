const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    minlength: 2,
    maxlength: 30,
    type: String,
  },
  avatar: {
    type: String,
    required: true,
    minlength: 10,
  }
});

module.exports = mongoose.model('user', userSchema);