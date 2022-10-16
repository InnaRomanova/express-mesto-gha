const cardRouter = require('express').Router();
const cardController = require('../controllers/cards');

cardRouter.get('/cards', cardController.getCards);
cardRouter.post('/cards', cardController.createCard);
cardRouter.delete('/cards/:cardId', cardController.deleteCard);
cardRouter.put('/cards/:cardId', cardController.likeCard);
cardRouter.delete('/cards/:cardId', cardController.dislikeCard);

module.exports = cardRouter;
