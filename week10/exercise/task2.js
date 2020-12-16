function withPrivateState(ctor) {
  const map = new WeakMap();
  function stateWrapper(...args) {
    map.set(this, {});
    ctor.apply(this, [map.get(this), ...args]);
    for (const propName in this) {
      if (typeof this[propName] !== 'function') { continue; }
      const originalFn = this[propName];
      this[propName] = function (...args) {
        return originalFn.call(this, map.get(this), ...args);
      }
    }
  }

  stateWrapper.prototype = Object.create(ctor.prototype);
  return stateWrapper;
}

function Person(state, name, age) {
  state.name = name;
  this.age = age;
}

Person.prototype.getName = function (state) {
  return state.name;
};

Person = withPrivateState(Person);

const ivan = new Person('Ivan', 20);
console.log(ivan.getName());