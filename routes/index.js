const router = require('express').Router();
const userController = require('../controllers/users');
const { validateLoginData, validateRegisterData } = require('../utils/validators/userValidators');
const cardsRoute = require('./cardsRoute');
const usersRoute = require('./usersRoute');
const auth = require('../middlewares/auth');
const NotFoundCode = require('../errors/notFoundCode');

router.post('/signin', validateLoginData, userController.login);
router.post('/signup', validateRegisterData, userController.createUser);

router.use(auth);
// защищенные роуты
router.use('/users', usersRoute);
router.use('/cards', cardsRoute);
router.get('/signout', userController.logout);
router.use(() => {
  throw new NotFoundCode('Ресурс не найдет. Проверьте адрес');
});

module.exports = router;
