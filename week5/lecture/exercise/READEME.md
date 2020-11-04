# Упражнение 5
## 4.11.20

1. Напишете функция **promisify**, която взима един аргумент, който е асинхронна функция и връща `Promise` версията ѝ.

    Пример:

    ```js
    const fs = require('fs');
    const promisify = require('./promisify');
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);

    readFile('./data.txt')
      .then(content => content + ' more data')
      .then(data => writeFile('./data.txt', data))
      .then(() => console.log('Operation completed!'));
    ```

2. Напишете програма, която асинхронно чете през 5 секунди дали има промени по подадени 3 файла, ако има такива промени, да ги печата. Програмата да спира да проверява след 60 секунди без такива.

3. Нашипете програма, която приема функция и връща резултата ѝ след не по-малко от 10 секунди, без значение дали подадената функция се изпълнява за 0 или 7.