const { Router } = require('express');
const userRouter = require('./resources/user');

module.exports.connect = function (app, path) {
  const router = Router();

  router.use('/users', userRouter, function (req, res) {
    res.send(res.locals.data);
  });

  app.use(path, router);
};