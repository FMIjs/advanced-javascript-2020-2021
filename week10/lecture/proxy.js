const target = {
  test1: 123,
  test3: 345
};


const p = new Proxy(target, {
  get(target, propName, receiver) {
    if (target.hasOwnProperty(propName)) {
      return Reflect.get(target, propName, receiver);
    }
    return '<EMPTY>';
  }
});

function Test(name) {
  this.name = name;
};

Test.prototype.doSomething = function () {
  return 5;
};

Test.createWithName = function (name) {
  return new Test(name);
};

const i = Test.createWithName('Ivan');

i.doSomething();

class Test1 {

  static createWithName(name) {
    return new Test1(name);
  }

  constructor(name) {
    this.name = name;
  }

  doSomething() {
    return 5;
  };
}

// const i = new Test('Ivan');
// const i2 = Reflect.construct(Test, ['Ivan']);
// console.log(i2);

const arr = [];

Object.create();

Reflect.apply(Array.prototype.slice, arguments);

Array.prototype.slice.apply(this, arguments);



const result1 = p.test;
const result2 = p.test1;
const result3 = p.test2;
console.log(result1, result2, result3);
