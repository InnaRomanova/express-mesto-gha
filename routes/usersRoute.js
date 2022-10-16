const userRouter = require('express').Router();
const userController = require('../controllers/users');

userRouter.get('/users', userController.getUsers);
userRouter.get('/users/:id', userController.getUser);
userRouter.post('/users', userController.createUser);
userRouter.patch('/users/me', userController.meUser);
userRouter.patch('/users/me/avatar', userController.avatarUser);

module.exports = userRouter;
