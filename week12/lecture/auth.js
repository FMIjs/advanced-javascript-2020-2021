const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SECRET';

module.exports.createToken = function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, function (err, token) {
      if (err) { return void reject(err); }
      resolve(token);
    })
  })
}

module.exports.verifyToken = function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) { return void reject(err); }
      resolve(decoded);
    });
  });
}

module.exports.auth = function (req, res, next) {
  const token = req.headers['x-access-token'] || req.cookies['AUTH_COOKIE'] || '';
  module.exports.verifyToken(token)
    .then((decoded) => {
      req.user = decoded;
      next();
    })
    .catch(err => res.status(401).send({ message: 'Unauthorized!' }))
}