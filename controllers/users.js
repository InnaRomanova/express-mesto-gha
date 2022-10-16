const User = require('../models/user');

const SUCCESS_CODE = 200;
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.status(SUCCESS_CODE).send({ users }));
};

module.exports.getUser = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с таким id не найден' });
        return;
      }
      res.status(SUCCESS_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      res.status(SERVER_CODE).send(err);
    });
};

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  if (!req.body) return res.sendStatus(ERROR_CODE).send({ message: 'Введите данные' });
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send(user))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(ERROR_CODE).send({ message: 'Передан пустой запрос' });
    return;
  }
  console.log(req.user._id);
  User.findByIdAndUpdate(
    req.user._id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ error: 'Пользователь с таким id не найден' });
        return;
      }
      res.status(NOT_FOUND_CODE).send(err);
    });
};
