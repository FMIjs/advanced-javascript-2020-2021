# Упражнение 8
## 09.12.20

[Разгледайте решенията на задачите от контролното](https://github.com/FMIjs/advanced-javascript-2020-2021/blob/master/week10/lecture/exam-solutions.js) и преправете функциите:

1. Като използвате `Proxy`, напише функция withArchive която взима като аргумент конструктор функция и връща нова конструктор функция. withArchive разширява прототипно подадената конструктор функция с друга, която  държи архив със всички промени направени по свойставта на конструираният обект. Също така добавя метод getArchive който връща стойността на обекта преди определената промяна да е била извършена. За разлика от задачата, която трябваше да се напише на контролното новата функция трябва да дава възможност за запазва състоянието на обекта преди да е отразена промяната и на не съществуващи свойства на инстанциите създадени с първоначално подадената конструктор функция.

    ```javascript
    function withArchive(klass) { }

    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    Person = withArchive(Person);

    const ivan = new Person('Ivan', 20);
    ivan.age = 30; // change (put the current object values in the archive)
    const originalObject = ivan.getArchive(0);
    console.log(originalObject); // {name: 'Ivan', age: 20, getArchive: ƒ}
    ivan.name = 'TEST'; // change (put the current object values in the archive)
    const prevObject = ivan.getArchive(1);
    console.log(prevObject); // {name: 'Ivan', age: 30, getArchive: ƒ}
    ivan.age = 40; // change (put the current object values in the archive)
    const lastObject = ivan.getArchive(2);
    console.log(lastObject); // {name: 'TEST', age: 30, getArchive: ƒ}
    console.log(ivan); // { name: 'TEST', age: 40, getArchive: ƒ}
    ivan.age = 50; // change (put the current object values in the archive)
    ivan.test = 'HELLO!'; // change (put the current object values in the archive)
    const latestObject = ivan.getArchive(4);
    console.log(latestObject); // {name: 'TEST', age: 50, getArchive: ƒ}
    ```

2. Като използвате `WeakMap` напишете функция withPrivateState, която взима като аргумент конструктор функция и връща нова конструктор функция. withPrivateState разширява прототипно подадената конструктор функция с друга, която  използва `WeakMap` (вместо обекта state, който ползвахме в задачата от контролното), който съхранява частно състояние на обектите създанени чрез нея, като имаме възможност да достъпваме това частно състояние през конструктора като първи аргумент и като първи аргумент на всеки един метод, независимо дали е на прототипа или на текущия контекст. 

    ```javascript
    function withPrivateState(ctor) {
      
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
    ```
