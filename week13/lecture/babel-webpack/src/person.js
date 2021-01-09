export class Person {

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
