const { Router } = require('express');
const { createQueriesForCollection } = require('../../db/queries');

const router = Router();
const userQueries = createQueriesForCollection('users');


// in case if the client provided more fields that we need we just
// extract the ones that we care about and if the check is strict we
// check if all the fiends are provided and if not we throw a new error
// that need to be handled in the global error handler. If it's not strict
// we just get the provided fields and continue with the next handler/middleware
function checkAndExtractUserFieldsMiddlewareFactory({ strict } = { strict: false }) {
  return function (req, res, next) {
    const { firstName, lastName, age } = req.body || {};
    if (strict && (!firstName || !lastName || !age)) {
      next(new Error('BAD_REQUEST'));
      return;
    }
    req.body = { firstName, lastName, age };
    next();
  };
};

router.get('/', function (req, res) {
  userQueries.get({}).then(users => {
    res.send(users);
  });
});

router.get('/:id', function (req, res) {
  userQueries.get({ _id: req.params.id }).then(users => {
    res.send(users);
  });
});

router.post('/',
  checkAndExtractUserFieldsMiddlewareFactory({ strict: true }),
  function (req, res) {
    userQueries.insert(req.body).then(user => {
      res.send(user);
    });
  }
);

router.put(
  '/:id',
  checkAndExtractUserFieldsMiddlewareFactory({ strict: false }),
  function (req, res) {
    userQueries.update({ _id: req.params.id }, req.body).then(user => {
      res.send(user);
    });
  }
);

router.delete('/:id', function (req, res) {
  userQueries.remove({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

module.exports = router;