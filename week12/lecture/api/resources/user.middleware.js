// in case if the client provided more fields that we need we just
// extract the ones that we care about and if the check is strict we
// check if all the fiends are provided and if not we throw a new error
// that need to be handled in the global error handler. If it's not strict
// we just get the provided fields and continue with the next handler/middleware

module.exports.checkAndExtractUserFieldsMiddlewareFactory =
  function checkAndExtractUserFieldsMiddlewareFactory({ strict } = { strict: false }) {
    return function (req, res, next) {
      const { firstName, lastName, age } = req.body || {};
      if (strict && (!firstName || !lastName || !age)) {
        return void next(new Error('BAD_REQUEST'));
      }
      req.body = { firstName, lastName, age: +age };
      next();
    };
  };
