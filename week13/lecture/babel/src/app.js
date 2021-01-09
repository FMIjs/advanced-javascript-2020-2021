class Person {

  #test = 123;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  logInfo = () => {
    this.#privateLogInfo();
  }

  #privateLogInfo() {
    console.log(this.name, this.age, this.#test);
  }
}

const ivan = new Person('Ivan', 20);

ivan.logInfo();

const obj = {
  name: 'Test',
  age: 10000,
  logInfo: ivan.logInfo
};

obj.logInfo();
