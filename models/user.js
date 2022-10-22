const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'поле должно содержать минимум 2 символа'],
    maxlength: [30, 'макимальная длина поля 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    required: true,
    minlength: [2, 'поле должно содержать минимум 2 символа'],
    maxlength: [30, 'макимальная длина поля 30 символов'],
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: ({ value }) => `${value} - некорректный адрес email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'минимальная длина пароля 8 символов'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
