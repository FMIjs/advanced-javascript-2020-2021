// function Container(x) { this.value = x; }

// Container.of = function (x) { return new Container(x); };

// Container.map = function (fn) { return Container.of(fn(this.value)); };

// Container.of(10)
//   .map(function (x) { return x + 1; })
//   .map(function (x) { return x * x; })
//   .map(function (x) { return x.toString(); })
//   .map(function (x) { return x.toUpperCase(); });





// function Maybe(x) {
//   this.value = x;
// }

// Maybe.of = function (x) { return new Maybe(x); };

// Maybe.prototype.isNothing = function () {
//   return (this.value === null || this.value === undefined);
// };

// Maybe.prototype.map = function (fn) {
//   return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value));
// };

// Maybe.of(undefined)
//   .map(function (name) { return name.toUpperCase(); })
//   .map(function (name) { return name + ' Test'; });


// function Promis() {
//   this.state = 'PENDING';
// }

// Promis.resolve = function () {
//   const p = new Promis();
//   p.state = 'RESOLVED';
//   return p;
// };

// Promis.reject = function () {
//   const p = new Promis();
//   p.state = 'REJECTED';
// };

// var p = new Promis();

// var p1 = Promis.resolve();

// var p2 = Promis.reject();




// with max priority (execute ASAP after the stack is empty)
// process.nextTick(function () { console.log('Tick'); });


// Promise.resolve(10) // resolved promise
//   .then(function (x) {
//     return Promise.reject(123);
//   })
//   .catch(function () {
//     return 100;
//   })
//   .then(function (x) {
//     return x * x;
//   })
//   .then(console.log);

// Promise.reject(new Error('error'))
//   .catch(function (err) {
//     return Promise.reject(err);
//   })
//   .then(function (x) {
//     return x + x;
//   })
//   .catch(function (err) {
//     return Promise.reject(err);
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (error) {
//     console.error(error);
//   });




// function readFile(fileName) {
//   const fs = require('fs');
//   return new Promise(function (resolve, reject) {
//     fs.readFile(fileName, function (err, data) {
//       if (err) { reject(err); return; }
//       resolve(data);
//     });
//   });
// }


try {
  var fs = require('fs');
  var result;
  try {
    result = fs.readFileSync('./dasfadas');
  } catch (e) {
    if (e.code === 'ENOENT') {
      result = 'EMPTY';
    } else {
      throw e;
    }
  }
} catch (e) {
  console.error(e);
}

Promise.all([
  readFile('./teasda'),
  readFile('/dasdsad')
]).catch(function () {

}).then((data) => {
  data[0] // f1data
  data[1] // f2data
}).catch();

readFile('./teasda')
  .then(function (f1data) {
    return readFile('/dasdsad').catch(function (err) {
      if (err.code === 'ENOENT') {
        return '<EMPTY>'; // Promise.resolve('<EMPTY>');
      }
      return Promise.reject(err);
    }).then(function (f2data) {
      return ({ f1data, f2data });
    });
  }).then(allData => {
    // calculate
  })
  .catch(err => console.error(err));

// // readFile().then(console.log).catch(console.err);