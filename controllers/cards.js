const Card = require('../models/card');

const { ERROR_CODE, NOT_FOUND_CODE, SERVER_CODE } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => res.send({ cards }))
    .catch((err) => res.status(SERVER_CODE).send(err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Ошибка валидации' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Пост удалён' }))
        .catch(() => res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный _id карточки' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        return;
      }
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => res.send(newCard))
        .catch(() => res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный _id карточки' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        return;
      }
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => res.send(newCard))
        .catch(() => res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Некорректный _id карточки' });
        return;
      }
      res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};
