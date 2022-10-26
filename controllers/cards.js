const Card = require('../models/card');
const ErrorCode = require('../errors/errorCode');
const NotFoundCode = require('../errors/notFoundCode');
const ServerCode = require('../errors/serverCode');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({}).then((cards) => res.send({ cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorCode('Ошибка валидации'));
      } else {
        next(new ServerCode('Ошибка на сервере'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundCode('Пост с таким id не найден');
        // res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        // return;
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Чужие карточки удалять нельзя');
        // res.status(403).send({ message: 'Чужие карточки удалять нельзя' });
        // return;
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Пост удалён' }))
        .catch(next(new ServerCode('Ошибка на сервере')));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Некорректный _id карточки'));
      } else {
        next(err);
      }
      // res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundCode('Пост с таким id не найден');
        // res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        // return;
      }
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => res.send(newCard))
        .catch(next(new ServerCode('Ошибка на сервере')));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Некорректный id карточки'));
        // res.status(ERROR_CODE).send({ message: 'Некорректный _id карточки' });
        // return;
      } else {
        next(new ServerCode('Ошибка на сервере'));
      }
      // res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundCode('Пост с таким id не найден');
        // res.status(NOT_FOUND_CODE).send({ message: 'Пост с таким id не найден' });
        // return;
      }
      Card.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
        .then((newCard) => res.send(newCard))
        .catch(next(new ServerCode('Ошибка на сервере')));
      // .catch(() => res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Некорректный id карточки'));
        // res.status(ERROR_CODE).send({ message: 'Некорректный _id карточки' });
        // return;
      } else {
        next(new ServerCode('Ошибка на сервере'));
      }
      // res.status(SERVER_CODE).send({ message: 'Ошибка на сервере' });
    });
};
