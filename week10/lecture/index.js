// // const obj = { a: 1 };
// // const set = new Set([2, 3, 4, 4, 4, 3, 3, 21, 2, 3, 32, 2, 1, 1, 1]);
// // const wSet = new WeakSet([obj]);

// // const map = new Map();
// // const wMap = new WeakMap();

// // wMap.set(obj, '1');

// // const obj2 = {
// //   obj: function () {

// //   }
// // };

// // console.log(set);

// // set.add(obj);
// // Array.from(set).map();

// // function numberGen() {
// //   let counter = 1;
// //   return function () { return counter++; };
// // }

// // const numbers = numberGen();

// // console.log(numbers());
// // console.log(numbers());
// // console.log(numbers());
// // console.log(numbers());



// function createIterator(arr) {
//   let idx = 0;
//   return {
//     next() {
//       const done = arr.length === idx;
//       const value = done ? undefined : arr[idx++];
//       return { value, done };
//     }
//   }
// }

// const arr = [1, 2, 3, 4];
// const arrIter = createIterator(arr);

// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// console.log(arrIter.next());
// arr.push(1000);
// console.log(arrIter.next());
// console.log(arrIter.next());

// // [1, 2, 3, 4];


// function* gen() {
//   yield 1;
//   console.log('gen 1');
//   yield 2;
//   console.log('gen 2');
//   yield 3;
//   console.log('gen 3');
//   yield 4;
//   console.log('gen 4');
// };

// const it = gen();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());


// function* numberGen() {
//   let counter = 1;
//   while (true) {
//     yield counter++;
//   }
// };

// const numIt = numberGen();
// console.log(numIt.next());
// console.log(numIt.next());
// console.log(numIt.next());
// console.log(numIt.next());
// console.log(numIt.next());
// console.log(numIt.next());

// const sym1 = Symbol('some prop');
// const sym2 = Symbol('some prop');

// const key1 = Symbol.for('key1');
// const key2 = Symbol.for('key1');

// console.log(key1 === key2);


// console.log(sym1 === sym2);
// const obj = {
//   [sym1]: 1
// }

// obj[sym2] = 1000;

// console.log(obj[sym1]);
// console.log(obj[sym2]);

// console.log(Object.keys(obj));
// console.log(Object.getOwnPropertySymbols(obj));

const arr = [1, 2, 3, 4, 5];
const it = arr[Symbol.iterator]();
console.log(it.next());

Object.prototype[Symbol.toPrimitive] = function (hint) {
  if (hint === 'string') {
    return JSON.stringify(this, null, 2);
  }
  return null;
};

function MyContainer() {
  this.entries = [{ a: 1 }];
  this.entriesMap = [1000];

  this[Symbol.iterator] = function* () {
    let idx = 0;
    for (const item of this.entries) {
      const value = this.entriesMap[idx];
      yield [item, value];
    }
  };

  // this[Symbol.toPrimitive] = function (hint) {
  //   if (hint === 'string') {
  //     return JSON.stringify(this, null, 2);
  //   }
  //   return null;
  // }
}

MyContainer.prototype.insert = function (entry) {
  this.entries.push(entry);
};

const c = new MyContainer();
c.insert(1);

c.test = c;

const collection = [...c];
console.log(collection);

const test = `${c}`;
console.log(test);
// for (const item of c) {
//   console.log(item);
// }
