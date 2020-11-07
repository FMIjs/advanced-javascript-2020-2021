const fs = require('fs');
const Writable = require('stream').Writable;
const Readable = require('stream').Readable;
const Transform = require('stream').Transform;
const pipeline = require('stream').pipeline;

const data = [1, 2, 3, 4, 5];
let counter = 0;

// [1, 2, 3].map(function (x) { return x + 1; }).forEach(console.log);

const readable = new Readable({
  highWaterMark: 10,
  read(size) {
    const item = data[counter++];
    if (item === undefined) { this.push(null); return; }
    const buf = Buffer.from([item]);
    this.push(buf);
  }
});

const transform = new Transform({
  highWaterMark: 10,
  transform(chunk, encoding, done) {
    if (chunk === null) { done(null, null); return; }
    const number = chunk[0];
    if (number === 2) { done(new Error('TEST')); return; }
    done(null, Buffer.from([number + 1]));
  }
});

// transform.on('error', function (error) {
//   console.error('error');
// });

const writable = new Writable({
  highWaterMark: 10,
  write(chunk, encoding, done) {
    setTimeout(function () {
      console.log(chunk[0]);
      done();
    }, 1000);
  }
});

// writable.on('error', function (err) {
//   console.error(err);
// });

pipeline(readable, transform, writable, function (err) {
  console.log(err);
});

// readable.pipe(transform).pipe(writable);

// const textStream = fs.createReadStream('./text.txt', { highWaterMark: 10 });

// textStream.on('error', function (error) {
//   console.log('Oops something went wrong!', error);
// });

// textStream.pipe(writable);
