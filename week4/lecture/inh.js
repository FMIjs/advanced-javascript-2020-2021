// var arr = [1, 2, 3, 4];

// const { fstat, fs } = require("fs");

// Array.prototype.avg = function () {
//   var result = 0;
//   for (var i = 0; i < this.length; i++) {
//     result += this[i];
//   }
//   return result / this.length;

//   // this.reduce(function(acc, curr) {
//   //   return acc + curr;
//   // }, 0);
// };

// console.log(arr.avg());




// function Person(name, age) {
//   var archive = [age];
//   this.name = name;
//   Object.defineProperty('age', {
//     get: function () {
//       return age;
//     },
//     set: function (newAge) {
//       archive.push(newAge);
//       age = newAge;
//     }
//   });
//   // this.age = age;
//   // this.getAge = function () {
//   //   return age;
//   // };
//   // this.setAge = function (newAge) {
//   //   archive.push(newAge);
//   //   age = newAge;
//   // };
// }

// Person.prototype.getName = function () {
//   return this.name;
// };


// function Employee(name, age, position) {
//   Person.call(this, name, age); // super(name, age)
//   this.position = position;
// }

// Employee.prototype = Object.create(Person.prototype); // class Employee extends Person

// Employee.prototype.getPosition = function () {
//   return this.position;
// }

// var ivan = new Person('Ivan', 20);
// ivan.getName();

// ivan.age = 10;
// console.log(ivan.age);

// ivan.setAge(10);
// console.log(ivan.getAge());
// // Person.call({}, 'Ivan', 20);

// function sumAll() {
//   var args = Array.prototype.slice.call(arguments);
//   return args.reduce(function (acc, currentItem) {
//     return acc + currentItem;
//   }, 0);
// }

// var result = sumAll(1, 2, 2, 3, 4, 5, 56);
// console.log(result);
