const userRouter = require('express').Router();
const userController = require('../controllers/users');

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:id', userController.getUser);
userRouter.post('/me', userController.getProfile);
userRouter.patch('/users/me', userController.updateUserInfo);
userRouter.patch('/users/me/avatar', userController.updateUserAvatar);
userRouter.post('/signin', userController.login);
userRouter.post('/signup', userController.createUser);

module.exports = userRouter;
