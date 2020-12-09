// function Person() {

// }

// function Employee() {
//   Person.call(this, ...) // super -> this._super(name, age)
// }

// Employee.prototype = Object.create(Person.prototype); // extends

// Employee.extends(Person);


// GROUP A
// Function.prototype.extends = function (ctor) {
//   this.prototype = Object.create(ctor.prototype);
//   this.prototype._super = function () { ctor.apply(this, arguments); };
// };

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// function Employee(name, age, pos) {
//   this._super(name, age);
//   this.pos = pos;
// }

// Employee.extends(Person);

// const e = new Employee('Ivan', 20, 'E');





// GROUP B
// function withPrivateState(ctor) {
//   function stateWrapper(...args) {
//     const state = {};
//     ctor.apply(this, [state, ...args]);
//     for (const propName in this) {
//       if (typeof this[propName] !== 'function') { continue; }
//       const originalFn = this[propName];
//       this[propName] = function (...args) {
//         return originalFn.call(this, state, ...args);
//       }
//     }
//   }

//   stateWrapper.prototype = Object.create(ctor.prototype);
//   return stateWrapper;
// }

// function Person(state, name, age) {
//   state.name = name;
//   this.age = age;
// }

// Person.prototype.getName = function (state) {
//   return state.name;
// };

// Person = withPrivateState(Person);

// const ivan = new Person('Ivan', 20);
// console.log(ivan.getName());


// GROUP C
function withArchive(ctor) {
  const archive = [];

  function archiveWrapper(...args) {
    ctor.apply(this, args);

    for (const propName in this) {
      let currentValue = this[propName];
      Object.defineProperty(this, propName, {
        get() { return currentValue; },
        set(newValue) {
          const current = { ...this };
          archive.push(current);
          currentValue = newValue;
        }
      });
    }
  }

  archiveWrapper.prototype = Object.create(ctor.prototype);
  archiveWrapper.prototype.getArchive = function (idx) {
    return archive[idx];
  };
  return archiveWrapper;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.test = function () {

};

Person = withArchive(Person);

const ivan = new Person('Ivan', 20);
ivan.age = 30;
const prevObj = ivan.getArchive(0);
console.log(prevObj);
