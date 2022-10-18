const User = require('../models/user');

const {
  SUCCESS_CODE,
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_CODE,
} = require('../utils/constants');

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

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  if (!req.body) return res.sendStatus(ERROR_CODE).send({ message: 'Введите данные' });
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Произошла ошибка валидации' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
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
