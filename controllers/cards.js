const Card = require('../models/card');

const SUCCSESS_CODE = 200;
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => res.status(SUCCSESS_CODE).send({ cards }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then(() => res.status(SUCCSESS_CODE).send({ message: 'Пользователь создан' }))
    .catch(() => res.status(SERVER_CODE).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.id })
    .then(() => res.send({ succsess: 'Карточка удалена' }))
    .catch(() => res.send({ error: 'Карточка id не найден' }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  // добавить _id в массив, если его там нет
  { new: true },
);

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
);
