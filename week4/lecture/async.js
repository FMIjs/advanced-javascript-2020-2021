var fs = require('fs');

// // CPS
// fs.readFile('./test.txt', { encoding: 'utf8' }, function (err, content) {
//   if (err) { console.error(err); return; }
//   // 
//   console.log(content);
// });

// fs.readFile('./test.txt', { encoding: 'utf8' }, function (err, content) {
//   if (err) { console.error(err); return; }
//   // 
//   console.log(content);
// });

// for (var i = 0; i < 5; i++) {
//   // var cbFactory = function (currentI) {
//   //   return function () {
//   //     console.log(currentI);
//   //   };
//   // }
//   // setTimeout(cbFactory(i), 0);

//   // setTimeout((function (currentI) {
//   //   return function () {
//   //     console.log(currentI);
//   //   }
//   // }()), 0);

//   // var cb = function (currentI) {
//   //   console.log(this.i, currentI);
//   // }.bind({ i: i }, i);

//   // setTimeout(cb, 0);

//   setTimeout(function (a) { console.log(a); }, 0, i);
// }

Promise.resolve().then(function () {
  console.log('Promise.resolve().then');
});

process.nextTick(function () {
  console.log('nextTick');
});

setImmediate(function () {
  console.log('setImmediate');
});

setTimeout(function () {
  console.log('setTimeout');
});

console.log('Main file');



// setTimeout(function () {
//   console.log('HELLO!');
// }, 1000);


// console.log('Main file');
// var content = fs.readFileSync('./test.txt', { encoding: 'utf-8' });
// console.log(content);

