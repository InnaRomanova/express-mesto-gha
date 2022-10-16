const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status().send(err));
};

// module.exports.deleteCard = (req, res) => {
//   Card.findById(req.params.cardId)
//     .then((card) => {
//       if(!card) {
//         res.status().send({ message: 'Пост с таким id не найден' });
//         return;
//       }})}
