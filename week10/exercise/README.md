# Упражнение 8
## 09.12.20

Като използвате Proxy, напише функция withArchive която взима като аргумент конструктор функция и връща нова конструктор функция. withArchive разширява прототипно подадената конструктор функция с друга, която  държи архив със всички промени направени по свойставта на конструираният обект. Също така добавя метод getArchive който връща стойността на обекта преди определената промяна да е била извършена.

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