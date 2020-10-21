# Лекция 2
## 10.10.20


## Function scope
- създаване на нови области на видимост
  ```javascript
  function test() { 
    var c = 10;
    c++;

    return c;
  }
  console.log(c); // undefined
  ```
- Hoisting

    Всички декларации на фунцкии и на променливи и ги _"издига нагоре"_ _(hoist)_ до началото на файла. Това се случва по-време на parse-ването на кода от engine-а.
    Като се измествам само самите декларации, без задаването на стойност

- Functions as first class citizens

  Може да се задават на промелниви, да се подават и връщат от функции.
  Това ни дава възможност да ползваме т.нар high order функции - функции боравещи с функции

  ```javascript
  function test(fn) { 
    return function(a) {
      return fn(a) + 10;
    }
  }
  test(function(a) { return a + 10; })(5); // 25
  ```

  Това ни позволява да ползваме езика по доста _функционален_ начин
- _curry_-ing
  
  Идва от функционалното програмиране и от името на Haskel Curry
  Това е разбиването на функция на последователно изпълними части.
  ```javascript
  function sum(a, b, c) { return a + b + c; }
  sum(1, 2, 3);
  var currySum = curry(sum);
  currySum(1)(2)(3);
  currySum(1, 2)(3);
  ```
- арност на функция / length

  Арността на функцията може да вземем с помощта на `.length`
  ```javascript
  sum.length; // 3
  ```

- достъпване на всички аргументи на дадена фунцкия

  Това е удобно, когато фунцкията ни има динамичен брой аргументи

  arguments **не е** масив; особен тип е;

  ```javascript
  function avg() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
      var current = arguments[i];
      sum += current;
    }
    return sum / sum.length;
  }
  ```

  _(ES6 alternative: `function test(...args) { ... }`)_


    - Алтернативно решение: `for in` цикъл
    Той обхожда `enumerable` свойствата на дадения обект
    В конкретната ситуация `for-in` ни върши работа, но ползването му води до проблеми, когато заговорим за наследяване, защото достъпва и наследените свойства.
      ```javascript
      function avg() {
        var sum = 0;
        for (var prop in arguments) {
          var current = arguments[prop];
          sum += current;
        }
        return sum / sum.length;
      }
      ```

- Как може да направим _oбект, който да не се променя_ / _свойство не-`enumerable`_?

  ```javascript
  Object.defineProperty(obj, 'prop', {
      value: 10,
      enumerable: false,
      writable: false, // това значи, че горното value не може да се промени по референция
      configurable: false,
      set: function(newVal) { ... },
      get: function() { ... },
    });
  ```

  ```javascript
  var obj = { a: 1 };

  function definePropertyWithSetterAndGetter(obj, name, setterFn, getterFn) {
    var value;
    var archive = [];
    Object.defineProperty(obj, name, {
      value: 10,
      enumerable: false,
      // writable: false,
      configurable: false,
      set: function(newVal) {
        archive.push(newVal);
        value = setterFn(value);
      },
      get: function() {
        return getterFn(value);
      },
    });

    obj.archive = archive;
  }

  function mySetter(newValue) {
    return newValue + 10;
  }
  function myGetter(currValue) {
    console.log('getter called');
    return currValue;
  }
  definePropertyWithSetterAndGetter(obj, 'test', mySetter, myGetter);

  console.log(obj.test);
  obj.test++;
  console.log(obj.test);
  console.log(obj.archive);
  ```

- Алтернативно _замразяване_ на обект.

    Това прави _shallow_ freeze. т.е не замразява комплексните свойства _(обекти, масиви)_ на дадения обект.

    За да се постигне _deep_ freeze трябва да си напишем къса рекурсивна функция.
    ```
    Object.freeze(); // замрази
    Object.thaw(); // размрази
    ```

- рекурсия?

    ```javascript
    function sumAll(arr, acc) {
      var acc = acc || 0;
      if (arr.lengh === 0) { return acc; }
      return sumAll(arr.slice(1), acc + arr[0])
    }
    ```
    - рекурсията е малко по-тежка откъм памет, защото при всяко извикване на функция се създава нов stack frame
    - tail call optimization - въведена в ES2015 - при рекурсивни функции подобни на горната, когато отново се извика същата функция, се затрива предния call stack
    - [tail call optimization support](https://stackoverflow.com/questions/37224520/are-functions-in-javascript-tail-call-optimized)?

- декларативното писане на код
  ```javascript
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    ...
  }

  // vs

  arr.forEach(function(el) { ... });
  ```
  минус на forEach е, че не е _чиста_ функция

- чиста функция/пюре/pure 
  - няма странични ефекти (не променя нищо извън собствената област на видимост)
  - при един и същ вход винаги връща същия резултат - това ни дава възможност да оптимизаране кода с помощта на мемоизация

- _функционало_ боравене със списъци

  Долните оператори връщат получилия се след изпълнението списък 

  - `map`
    ```javascript
    [1, 2, 3, 4].map(function(x, idx, arr /* референция към самия масив */) { return x * x; }); // [1, 4, 9, 16]
    ```

  - `filter`
    ```javascript
    [1, 2, 3, 4].filter(function(x, idx, arr) { return x % 2 !== 0; }); // [1, 3]
    ```

  - `concat`
    ```javascript
    [1, 2, 3, 4].concat(5); // [1, 2, 3, 4, 5]
    ```

  - `reduce`
    дефакто _производна_
    ```javascript
    [1, 2, 3, 4].reduce(function(acc, curr, idx, arr) {
      return acc + curr;
      // стойността на акумулатора е или първоначалната или тази върната в предното изпълнение
    }, 0 /* това е първоначалната стойност на акумулатора */); 
    ```
    по-интересени примери
    
    ```javascript
    var users = [{ name: 'Ivan', age: 25 }, { name: 'Stoyan', age: 21 }];
    users.reduce(function(acc, currUser) {
      acc.names.push(currUser.name);
      acc.ages.push(currUseн r.age);
      return acc; // ако тук не върнем нищо, в следващата итерация acc ще е undefined
    }, { names: [], ages: [] }); // { names: ['Ivan', 'Stoyan'], ages: [25, 21] }
    ```
     ```javascript
    var users = [{ name: 'Ivan', age: 25, city: 'Berlin' }, { name: 'Stoyan', age: 21, city: 'London' }];
    users.reduce(function(acc, currUser) {
      if (!acc[currUser.city]) {
        acc[currUser.city] = [];
      }
      acc[currUser.city].push(currUser);
      return acc;
    }, { }); // { Berlin: [{ name: 'Ivan', age: 25, city: 'Berlin' }], London: [{ name: 'Stoyan', age: 21, city: 'London' }] }
    ```
    

  ...

  ...

  ...