const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  // SUCCESS_CODE,
  ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_CODE,
} = require('../utils/constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((user) => {
      // создаю токен
      const token = jwt.sign({ _id: user._id }, 'JWT', { expiresIn: '7d' });
      // возвращаю токен
      res.send({ token });
      if (!user) {
        // пользователь с такой почтой не найден
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // пользователь найден
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали, отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      // аутентификация успешна
      res.send({ message: 'Все верно!' });
    })
    .catch(() => {
      // возвращаем ошибку аутентификации
      res.status(UNAUTHORIZED_ERROR_CODE).send({ message: 'Ошибка авторизации или аутентификации' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users))
    .catch(() => res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' }));
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с таким id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.createUser = async (req, res, next) => {
  // if (!req.body) return res.sendStatus(ERROR_CODE).send({ message: 'Введите данные' });
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    // res.status(201).send(newUser);
  } catch (err) {
    if (err.code === 11000) {
      next();
    } else if (err.name === 'ValidationError') {
      next((err.message));
      // res.status(ERROR_CODE).send({ message: 'Произошла ошибка валидации' });
      // return;
    } else {
      next(err);
    }
    // res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
  }
};

const updateUser = (req, res, userData) => {
  User.findByIdAndUpdate(req.user._id, userData, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с таким id не найден' });
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Данные некорректные. Ошибка валидации' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const userData = {
    name: req.body.name,
    about: req.body.about,
  };
  updateUser(req, res, userData);
};

module.exports.updateUserAvatar = (req, res) => {
  const userData = {
    avatar: req.body.avatar,
  };
  updateUser(req, res, userData);
};

module.exports.getProfile = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(() => res.status(UNAUTHORIZED_ERROR_CODE)
      .send({ message: 'Ошибка авторизации или аутентификации' }));
};
