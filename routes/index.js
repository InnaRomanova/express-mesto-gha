const router = require('express').Router();
const cardsRoute = require('./cardsRoute');
const usersRoute = require('./usersRoute');
const auth = require('../middlewares/auth');
const userController = require('../controllers/users');
const NotFoundCode = require('../errors/notFoundCode');

router.post('/signin', userController.login);
router.post('/signup', userController.createUser);

router.use(auth);
// защищенные роуты
router.use('/users', usersRoute);
router.use('./cards', cardsRoute);
router.get('./signout', userController.logout);
router.use(() => {
  throw new NotFoundCode('Ресурс не найдет. Проверьте адрес');
});

module.exports = router;
