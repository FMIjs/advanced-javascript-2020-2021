const { Router } = require('express');
const userRouter = require('./resources/user');

module.exports.connect = function (app, path) {
  const router = Router();

  router.use('/users', userRouter);

  app.use(path, router);
};