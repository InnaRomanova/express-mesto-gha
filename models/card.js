const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    minlength: 10,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
