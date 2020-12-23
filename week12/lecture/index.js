global.__basedir = __dirname;

const path = require('path');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const api = require('./api');
const db = require('./db');
const auth = require('./auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/lit-html/*', function (req, res) {
  const reqPath = req.path;
  res.sendFile(path.join(__basedir, 'node_modules', ...reqPath.split('/')), function (err) {
    if (err) { console.error(err); }
  });
});

app.use(express.static(path.join(__basedir, 'static')));

app.post('/login', function (req, res) {
  const body = req.body;
  if (body.password !== '123') { return void res.status(401).send({ error: 'Invalid email or password!' }); }

  auth.createToken({ id: 1 }).then(token => {
    res.cookie('AUTH_COOKIE', token, { httpOnly: true }).end();
    // res.send({ token });
  });
});

api.connect(app, '/api');

app.get('/', function (req, res) {
  res.sendFile(path.join(__basedir, 'index.html'));
});

app.get('*', function (req, res) {
  res.status(404).send('PAGE NOT FOUND!');
});

app.use(function (err, req, res, next) {
  if (err.message === 'BAD_REQUEST') {
    res.status(400).send('BAD REQUEST');
    return;
  }
  res.status(500).send('SERVER ERROR');
});

db.connect().then(() => {
  app.listen(config.port, function () {
    console.log(`Server is listening on :${config.port}`);
  });
});
