const fs = require('fs');



const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('./data.txt')
  .then(content => content + ' more data')
  .then(data => writeFile('./data.txt', data))
  .then(() => console.log('Operation completed!'));