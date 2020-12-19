const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
let db = null;

module.exports.getDb = () => db;

module.exports.connect = function () {
  return MongoClient.connect(config.db.url)
    .then(client => {
      console.log(`Connected to database ${config.db.name}`);
      db = client.db(config.db.name);
      return db;
    })
    .catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
}
