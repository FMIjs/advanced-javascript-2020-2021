// var cb = function (currentI) {
//   return function () { console.log(currentI); };
// };

// for (var i = 0; i < 5; i++) {
//   setTimeout(cb(i), 0);
// }

// var cb = function (currentI) { console.log(currentI, this.i); };

// for (var i = 0; i < 5; i++) {
//   setTimeout(cb.bind({ i }, i));
// }

// for (var i = 0; i < 5; i++) {
//   var cb = function (currentI) { console.log(currentI); }
//   setTimeout(cb, 0, i);
// }


// for (let i = 0; i < 5; i++) {
//   setTimeout(function () { console.log(i); }, 0);
// }


// const fs = require('fs');


// function Proxi(obj, handlers) {
//   for (var prop in obj) {
//     (function (propName) {
//       var currentValue = obj[propName];
//       Object.defineProperty(this, propName, {
//         set: function (newValue) {
//           handlers[propName](currentValue, newValue);
//           currentValue = newValue;
//         },
//         get: function () {
//           return currentValue;
//         }
//       });
//     }).call(this, prop);
//   }
// }


function EventEmitter() {
  this.subscribers = {};
}

EventEmitter.prototype.on = function (eventName, handlerFn) {
  this.subscribers[eventName] =
    (this.subscribers[eventName] || []).concat(handlerFn);
};

EventEmitter.prototype.emit = function (eventName, data) {
  (this.subscribers[eventName] || []).forEach(function (handlerFn) {
    handlerFn(data);
  });
};

function Proxi(obj, handlers) {
  EventEmitter.call(this); // super
  for (const prop in obj) {
    if (!obj.hasOwnProperty(prop)) { continue; }
    let currentValue = obj[prop];
    Object.defineProperty(this, prop, {
      set: newValue => {
        this.emit('change', { prop, currentValue, newValue });
        handlers[prop](currentValue, newValue);
        currentValue = newValue;
      },
      get: () => currentValue
    });
  }
}

Proxi.prototype = Object.create(EventEmitter.prototype); // extends


function readFile(fileName, cb) {
  const fs = require('fs');
  const emitter = new EventEmitter();

  fs.readFile(fileName, { encoding: 'utf-8' }, function (err, content) {
    if (err) {
      emitter.emit('error', err);
    } else {
      emitter.emit('data', content);
    }
    if (cb) { cb(err, content); }
  });

  return emitter;
}

const read = readFile('./week5/lecture/text.txt', function (err, data) {
  if (err) { console.error(err); return; }
  console.log(data);
});

read.on('data', function (data) {
  console.log(data);
});

read.on('error', function (error) {
  console.error(error);
});

// var ivan = {
//   name: 'Ivan',
//   age: 20
// };

// function logOutput(currentValue, newValue) {
//   console.log(currentValue, newValue);
// };

// const p = new Proxi(ivan, {
//   name: logOutput,
//   age: logOutput
// });

// p.on('change', function (data) {
//   console.log(data);
// });

// p.name = 'Todor';
// p.age = 30;

// console.log(p.name);