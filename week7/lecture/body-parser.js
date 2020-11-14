
function processBody(fn, req, next) {
  const bodyArray = [];
  req.on('data', function (chunk) { bodyArray.push(chunk); });
  req.on('error', function (err) { next(err); })
  req.on('end', function () {
    try {
      req.body = fn(bodyArray);
      next();
    } catch (e) {
      next(e);
    }
  });
}

function processUrlencoded(body) {
  const bodyString = body.map(b => b.toString()).join('');
  return bodyString.split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

function processJSON(body) {
  return JSON.parse(body);
}

function urlencodedMiddleware(req, res, next) {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    processBody(processUrlencoded, req, next);
    return;
  }
  next();
}

function jsonMiddleware(req, res, next) {
  if (req.headers['content-type'] === 'application/json') {
    processBody(processJSON, req, next);
    return
  }
  next();
}

const bodyParser = {
  urlencoded() {
    return urlencodedMiddleware;
  },
  json() {
    return jsonMiddleware;
  }
};

module.exports = bodyParser;
