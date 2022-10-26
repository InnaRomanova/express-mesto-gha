const userRouter = require('express').Router();
const userController = require('../controllers/users');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidators');

userRouter.get('/', userController.getUsers);
userRouter.get('/me', userController.getProfile);
userRouter.get('/:id', validateUserId, userController.getUser);
userRouter.patch('/me', validateUserInfo, userController.updateUserInfo);
userRouter.patch('/me/avatar', validateUserAvatar, userController.updateUserAvatar);

module.exports = userRouter;
