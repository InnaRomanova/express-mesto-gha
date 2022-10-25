const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'минимальная длина поля 2 символа'],
    maxlength: [30, 'максимальная длина поля 30 символов'],
  },
  link: {
    required: true,
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: ({ value }) => `${value} - некоректный адрес URL. Ожидается адрес в формате: http(s)://(www).site.com`,
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
