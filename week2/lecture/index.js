// // var test;

// // function test() {
// //   c = 20;
// //   function test2() {

// //   }
// //   // code 

// //   var c = 10;

// //   c++;
// //   return c;
// // }


// // // sdsad
// // // sdad
// // test = 123;

// // console.log(a);


// // function sum(a, b, c) {
// //   return a + b + c;
// // }

// // sum.length //3

// // sum(1, 2, 3);

// // function curry() {

// // }

// // var currySum = curry(sum);

// // currySum(1)(2)(3);
// // currySum(1, 2)(3);

// Array.isArray();
// Number.isNaN();



// var object = { a: 1 };

// function definePropertyWithSetterAndGetter(obj, name, value, setterFn, getterFn) {
//   var archive = [value];

//   Object.defineProperty(obj, name, {
//     // value: 10,
//     enumerable: false,
//     configurable: false,
//     // writable: false,
//     set: function (newValue) {
//       value = setterFn(newValue);
//       archive.push(value);
//     },
//     get: function () {
//       return getterFn(value);
//     }
//   });

//   obj.archive = archive;
//   obj.getArchive = function () {
//     return archive.slice();
//   };
// }

// function mySetter(value) {
//   if (typeof value === 'string') {
//     return value.toUpperCase();
//   }
//   return value + 10;
// }

// function myGetter(currentValue) {
//   console.log('myGetter was called!');
//   return currentValue;
// }

// definePropertyWithSetterAndGetter(object, 'test', 10, mySetter, myGetter);

// console.log(object.test);
// object.test++;
// console.log(object.test);
// object.test = 100;

// object.test = 'hello';

// console.log(object.test);

// console.log(object.archive);

// function sumAll(arr, acc) {
//   acc = acc || 0;
//   if (arr.length === 0) { return acc; }
//   return sumAll(arr.slice(1), acc + arr[0]);
// }

// var result = sumAll([1, 2, 3, 4]);







// function avg() {
//   var sum = 0;
//   // for (var i = 0; i < arguments.length; i++) {
//   //   var currentArg = arguments[i];
//   //   sum += currentArg;
//   // }
//   var sum = 0;
//   for (var prop in arguments) {
//     sum += arguments[prop];
//   }

//   return sum / arguments.length;
// }

// avg(1, 2, 3, 4, 5);

// // function test(fn) {
// //   return function (a) {
// //     return fn(a) + 10;
// //   };
// // }

// // test(function (a) { return a + 10; })(20);



// function pure(a, b) {
//   return a + b;
// }


// // var sum = 0;
// // [1, 2, 3, 4].forEach(function (el) {
// //   sum += el;
// // });



// // [].push()
// // [].shift()


// [1, 2, 3, 4].filter(function (el) { return el % 2 !== 0; });
// // [1, 3]

// [1, 2, 3, 4].concat(1)
// // [1,2,3,4,1]

// for () {

// }

var originalMap = Array.prototype.map;

Array.prototype.map = function (currentElement, currentIndex, currentArray) {
  console.log(currentElement, currentIndex, currentArray);
  originalMap(currentElement, currentIndex, currentArray);
}

[1, 2, 3, 4].map(function (x, currentIndex, arr) {
  return x * x;
}).map().filter().reduce();

// [1, 2, 3, 4].reduce(function (acc, currentItem, currentIndex, arr) {
//   return acc + currentItem;
// }, 0);

// // { names: [], ages: [] }
// var arr = [{ name: 'Ivan', age: 20 }, { name: 'Ivan', age: 20 }];
// var result = arr.reduce(function (acc, currUser) {
//   acc.names.push(currUser.name);
//   acc.ages.push(currUser.age);
//   return acc;
// }, { names: [], ages: [] });

// console.log(result);