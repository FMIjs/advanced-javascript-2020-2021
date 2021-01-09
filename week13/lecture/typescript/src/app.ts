// import { stringToNumber } from './utils/string-to-number';

// enum Color {
//   Red = 'Red',
//   Green = 'Green',
//   Blue = 'Blue',
// };

// let obj: any;

// interface IUser {
//   name: string;
//   age: number;
// }

// function logUserData(data: IUser & { test: number }) {

// }

// logUserData({ name: 'Ivan', age: 20, test: 231 });


// function id<T>(obj: T): T { return obj; }

// const result = id<IUser>({ name: 'Ivan', age: 20 });
// id<{ test: number }>({ test: 112 });

// function setUserProp2(key: keyof IUser, value: IUser[typeof key]) {

// };

// function setUserProp<T extends keyof IUser>(key: T, value: IUser[T]) {

// }

// type Property<T, K> = K extends keyof T ? T[K] : number;
// type ValueOf<T> = T[keyof T];
// type a = Property<IUser, 'age'>;




// setUserProp('name', 'sda');

// // setUserProp('age', 'sdsa');

// // class Person {

// //   getTest: () => boolean;

// //   constructor(public name: string, private age: number, test = false) {
// //     this.getTest = () => { return test; }
// //   }
// // }

// // console.log(123);

// // const ivan = new Person('Ivan', 20);

// // const result = stringToNumber(ivan.name);
// // console.log(result);

// function test(prop1: number, prop2: string, prop3: boolean) {

// }

// type Args<T> = T extends (...args: infer U) => any ? U : never;

// type a = Args<typeof test>

// const arr: a = [1, 'dsada', true]

// test(...arr);

import express from 'express';

const app = express();

app.get('/', function (req, res) {
  res.send('HELLO!');
});

app.listen(8080, () => { console.log('server is listening on :8080') })