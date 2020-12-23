const { createQueriesForCollection } = require('../../db/queries');

function generateControllers(name) {
  const queries = createQueriesForCollection(name);
  return {
    queryAll: (req, res, next) => {
      queries.get({}).then(users => {
        res.locals.data = users;
        next();
      });
    },
    queryOne: (req, res, next) => {
      queries.get({ _id: req.params.id }).then(users => {
        res.locals.data = users;
        next();
      });
    },
    create: (req, res, next) => {
      return queries.insert(req.body).then(user => {
        res.locals.data = user;
        next();
      });
    },
    update: (req, res, next) => {
      return queries.update({ _id: req.params.id }, req.body).then(user => {
        res.locals.data = user;
        next();
      });
    },
    remove: (req, res, next) => {
      return queries.remove({ _id: req.params.id }).then(user => {
        res.locals.data = user;
        next();
      });
    }
  }
}

module.exports = generateControllers;
