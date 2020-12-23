const { Router } = require('express');
const generateControllers = require('../modules/controllers');
const { checkAndExtractUserFieldsMiddlewareFactory } = require('./user.middleware');

const router = Router();
const userController = generateControllers('users');


router.route('/')
  .get(userController.queryAll)
  .post(
    checkAndExtractUserFieldsMiddlewareFactory({ strict: true }),
    userController.create
  );

router.route('/:id')
  .get(userController.queryOne)
  .put(
    checkAndExtractUserFieldsMiddlewareFactory({ strict: false }),
    userController.update
  )
  .delete(userController.remove);

module.exports = router;