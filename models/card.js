const mongoose = require('mongoose');

const {
  URL_REGEXP,
} = require('../utils/constants');

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
    validate: {
      validator: (v) => URL_REGEXP.test(v),
      message: ({ value }) => `${value} - некоректный адрес URL`,
    },
  },
  owner: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

module.exports = mongoose.model('card', cardSchema);
