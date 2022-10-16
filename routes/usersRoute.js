const userRouter = require('express').Router();
const { createUser, getUser, getUsers } = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('./users/:id', getUser);
userRouter.post('./users', createUser);

module.exports = userRouter;
