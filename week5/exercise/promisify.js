const fs = require('fs');
const path = require('path');

const promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) { reject(err); return; }
        resolve(result);
      })
    });
  }
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const dirPath = './week5/exercise/';
readFile(path.resolve(dirPath, 'data.txt'), { encoding: 'utf-8' })
  .then(content => content + ' more data')
  .finally(() => console.log('in finally'))
  .then(data => writeFile(dirPath + 'data.txt', data))
  .then(() => console.log('Operation completed!'))
  .finally(() => console.log('in finally 2'))
  .catch(err => {
    // console.error(err);
    return err;
  })
  .then(console.error)
  .finally(() => console.log('in finally 3'))

Promise.all([
  readFile(path.resolve(dirPath, 'test-files', 'all-test-1.txt'), { encoding: 'utf-8' }),
  readFile(path.resolve(dirPath, 'test-files', 'all-test-2.txt'), { encoding: 'utf-8' })
])
  .then(res => { console.log('in `all` then'); return res; })
  .then(console.log)
  .catch(console.err);

Promise.race([
  readFile(dirPath, 'test-files', 'race-test-1.txt'),
  readFile(dirPath, 'test-files', 'race-test-2.txt')
])
  .then(res => { console.log('in `race` then'); return res; })
  .then(console.log)
  .catch(console.err);
