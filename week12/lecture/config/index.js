const environment = process.env.NODE_ENV || 'dev';
module.exports = environment === 'prod' ?
  require('./prod.config.json') :
  require('./dev.config.json');