const cardRouter = require('express').Router();
const cardController = require('../controllers/cards');
const { validateCardId, validateCardData } = require('../utils/validators/cardValidators');

cardRouter.get('/', cardController.getCards);
cardRouter.post('/', validateCardData, cardController.createCard);
cardRouter.delete('/:cardId', validateCardId, cardController.deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, cardController.likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, cardController.dislikeCard);

module.exports = cardRouter;
