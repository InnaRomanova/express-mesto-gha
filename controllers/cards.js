const Card = require('../models/card');

const SUCCESS_CODE = 200;
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => res.status(SUCCESS_CODE).send({ cards }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(SUCCESS_CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      res.status(SERVER_CODE).send(err);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.id })
    .then(() => res.send({ succsess: 'Карточка удалена' }))
    .catch(() => res.send({ error: 'Карточка id не найден' }));
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
        .catch((err) => res.status(SERVER_CODE).send(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      res.status(SERVER_CODE).send(err);
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
        .catch((err) => res.status(SERVER_CODE).send(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send(err);
        return;
      }
      res.status(SERVER_CODE).send(err);
    });
};
