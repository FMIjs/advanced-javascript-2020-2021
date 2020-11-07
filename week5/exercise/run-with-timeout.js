const fs = require('fs');
const promisify = require('util').promisify;
const Worker = require('worker_threads').Worker;

const writeFile = promisify(fs.writeFile);

function endless() {
  while (true) {

  }
  // return 10;
}

function runWithTimeout(timeout) {
  const ww = new Worker('./_exec.js');
  return new Promise((resolve, reject) => {
    let timeoutId;
    function res(result) {
      ww.terminate().then(() => console.log('_exec.js worker terminated!'));
      clearTimeout(timeoutId); resolve(result);
    };
    ww.on('message', message => res(message));
    ww.on('error', error => res(error));
    timeoutId = setTimeout(() => reject(new Error('Timeout!')), timeout);
  });
}

function safeExec(fn) {
  const content = `const { parentPort } = require('worker_threads');\n${fn.toString()}\n const result = ${fn.name}();\nparentPort.postMessage(result);`
  return writeFile('./_exec.js', content)
    .then(() => runWithTimeout(10000))
    .then(result => console.log(result))
    .catch((err) => console.error(err));
}

safeExec(endless);
