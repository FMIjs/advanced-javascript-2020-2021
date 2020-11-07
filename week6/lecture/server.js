global.__basedir = __dirname;

const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const publicDir = path.join(__basedir, 'public');

const Transform = require('stream').Transform;
const rx = /{{(\w+)}}/g;

function populateStreamFactory(queryData) {
  let prevStr = '';
  queryData = queryData || {};
  return new Transform({
    transform(chuck, encoding, done) {
      const str = chuck === null ? '' : chuck.toString();
      // while chunk is not null (i.e. end of file)
      // and chunk still does not hold any new lines
      if (chuck !== null && str.indexOf('\n') === -1) {
        prevStr += str;
        done();
      } else {
        const data = str.split('\n'); // split current content into new lines -> data is array
        data[0] = prevStr + data[0];  // feed the remain from last processing into first elem
        prevStr = data.pop();         // save the remaining stuff
        const result = data.map(line =>
          line.replace(rx, (m, g1) => queryData[g1] || '')
        ).join('\n');

        done(null, result);
      }
    }
  });
}


function createHtmlStream(pageName) {
  return function (req, res, queryObj) {
    const ps = populateStreamFactory(queryObj);
    const indexHtmlPath = path.join(publicDir, 'pages', pageName + '.html');
    return fs.createReadStream(indexHtmlPath, { highWaterMark: 10 }).pipe(ps);
  };
}

function createJSStream(scriptPath) {
  return function () {
    return fs.createReadStream(path.join(__basedir, scriptPath));
  };
}

const notFoundHtmlStream = createHtmlStream('not-found');

function testHandler() {
  return function (req, res) {
    let allData = '';

    req.on('data', function (chunk) {
      allData += chunk.toString();
    });

    req.on('end', function () {
      console.log(allData);
      res.statusCode = 301;
      res.setHeader('Location', '/?errorMessage=Wrong email or password');
      res.end();
    });
  };
}

const routeMap = {
  GET: {
    '/': createHtmlStream('index'),
    '/about': createHtmlStream('about')
  },
  POST: {
    '/test': testHandler()
  }
};

const server = http.createServer(function (req, res) {
  const urlData = req.url.split('?');
  const url = urlData[0];
  const queryString = urlData[1];
  const queryObj = querystring.parse(queryString);
  const parsedPath = path.parse(url);
  let streamFactory;

  if (parsedPath.ext === '.js') {
    res.setHeader('Content-type', 'application/javascript');
    streamFactory = createJSStream(url);
  } else {
    res.setHeader('Content-type', 'text/html');
    const method = req.method.toUpperCase();
    streamFactory = (routeMap[method] && routeMap[method][url]) || notFoundHtmlStream;
  }

  const rs = streamFactory(req, res, queryObj);

  if (!rs) { return; }

  rs.on('error', function (err) { console.error(err); });

  rs.pipe(res);
});

server.listen(3000, function () {
  console.log('Server is listening on :3000');
});