const { Router } = require('express');
const userRouter = require('./resources/user');
const { auth } = require('../auth');

module.exports.connect = function (app, path) {
  const router = Router();

  router.use('/users', auth, userRouter, function (req, res) {
    res.send(res.locals.data);
  });

  app.use(path, router);
};