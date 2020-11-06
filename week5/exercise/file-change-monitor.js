const fs = require('fs');
const path = require('path');

const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
  fn(...args, (err, result) => {
    if (err) { reject(err); return; }
    resolve(result);
  })
});


const readFile = promisify(fs.readFile);

const checkFiles = files => {
  const tmpFileData = files.reduce((acc, fName) => ({ ...acc, [fName]: null }), {})
  let noChangeCounter = 0;
  const loop = setInterval(() => {
    const checkFile = fName => readFile(fName, { encoding: 'utf-8' }).then(data => {
      const hasChanged = tmpFileData[fName] && tmpFileData[fName] !== data;
      tmpFileData[fName] = data;
      if (hasChanged) {
        console.log(`${fName} has changed - ${data}`);
      }
      return hasChanged;
    });
    Promise.all(files.map(fName => checkFile(fName))).then(hasChangesArr => {
      const hasChanges = hasChangesArr.reduce((acc, curr) => acc || curr, false);
      if (hasChanges) { noChangeCounter = 0; return; }
      noChangeCounter++;
      if (noChangeCounter === 12) {
        console.log('[done]');
        clearInterval(loop);
      }
    })
  }, 1000);

}

const pathToFolder = './week5/exercise/file-change-monitor-files';
checkFiles([
  path.resolve(pathToFolder, 'file1.txt'),
  path.resolve(pathToFolder, 'file2.txt'),
  path.resolve(pathToFolder, 'file3.txt')
]);
