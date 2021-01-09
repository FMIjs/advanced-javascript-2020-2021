import 'moment';

import { Person } from './person';
import { test } from './utils';
import moment from 'moment';

import text from './long-text.txt';

test(text);

const now = moment();

const ivan = new Person('Ivan', 20);

ivan.logInfo();

console.log(now);

const obj = {
  name: 'Test',
  age: 10000,
  logInfo: ivan.logInfo
};

obj.logInfo();
