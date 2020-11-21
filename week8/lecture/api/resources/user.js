const { Router } = require('express');
const { createQueriesForCollection } = require('../../db/queries');
const router = Router();
const userQueries = createQueriesForCollection('users');

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

router.post('/', function (req, res) {
  const user = req.body;
  userQueries.insert(user).then(user => {
    res.send(user);
  });
});

router.put('/:id', function (req, res) {
  const updatedUser = req.body;
  userQueries.update({ _id: req.params.id }, updatedUser).then(user => {
    res.send(user);
  });
});

router.delete('/:id', function (req, res) {
  userQueries.remove({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

module.exports = router;