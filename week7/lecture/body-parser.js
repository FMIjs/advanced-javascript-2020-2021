function urlencodedMiddleware(req, res, next) {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    const body = [];
    req.on('data', function (chunk) { body.push(chunk); });
    req.on('error', function (err) { next(err); })
    req.on('end', function () {
      try {
        const bodyString = body.map(b => b.toString()).join('');
        req.body = bodyString.split('&').reduce((acc, curr) => {
          const [key, value] = curr.split('=');
          acc[key] = decodeURIComponent(value);
          return acc;
        }, {});
        next();
      } catch (e) {
        next(e);
      }
    });
  }
}

const bodyParser = {
  urlencoded() {
    return urlencodedMiddleware;
  }
};

module.exports = bodyParser;
