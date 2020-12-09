const prop = 1;

const obj = { prop: 12, prop2: 13, prop3: 14 };
const arr = [1, 2, 3, 4, 5, 6];

const { prop2 } = obj; // extract given prop
const { prop: newPropName } = obj; // rename prop

const [, secondNumber, fourthNumber, fifthNumber] = arr;  // extract data from the array
// using ',' we can skip values;

// getting the "rest"
const [firstNumber, secondNumber, ...theRestOfTheNumbers] = arr;
const { prop: anotherNewName, ...props2and3 } = obj;

// spreading
const arr1 = [1, 2, 3];
const arr2 = [5, 6, 7];
const concatArr = [...arr1, 4, ...arr2]; // 1, 2, 3, 4, 5, 6, 7

const baseUserInfo = { name: 'Ivan', age: 12 };
const userProfessionInfo = { profession: 'cook' };
const ivanTheCook = { ...baseUserInfo, ...userProfessionInfo }; // { name: 'Ivan', age: 12, profession: 'cook' }


// default values
const { someOtherProp = 3 } = {};
console.log(someOtherProp); // 3

var { boom } = null;
// TypeError: null has no properties
var { boom } = undefined;
// TypeError: undefined has no properties


// value swap with destructuring
const x = 1;
const y = 5;
[x, y] = [y, x];






const req = {}, res = {};
const middlewares = [];

const next = () => {
  const nextMiddleware = middlewares.shift();
  nextMiddleware(req, res, next);
}

middlewares[0](req, res, next);