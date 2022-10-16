const User = require('../models/user');

const SUCCESS_CODE = 200;
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
// const SERVER_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.status(SUCCESS_CODE).send({ users }));
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(SUCCESS_CODE).send({ user }))
    .catch(() => res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с таким id не найден' }));
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  if (!req.body) return res.sendStatus(ERROR_CODE).send({ message: 'Введите данные' });
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.meUser = (req, res) => {
  res.status(SUCCESS_CODE).send({ message: 'Me User' });
};

module.exports.avatarUser = (req, res) => {
  res.status(SUCCESS_CODE).send({ message: 'Avatar User' });
};
