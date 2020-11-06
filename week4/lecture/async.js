var fs = require('fs');

// // CPS
// fs.readFile('./test.txt', { encoding: 'utf8' }, function (err, content) {
//   if (err) { console.error(err); return; }
//   // 
//   console.log(content);
// });

// fs.readFile('./test.txt', { encoding: 'utf8' }, function (err, content) {
//   if (err) { console.error(err); return; }
//   // 
//   console.log(content);
// });

// for (var i = 0; i < 5; i++) {
//   // var cbFactory = function (currentI) {
//   //   return function () {
//   //     console.log(currentI);
//   //   };
//   // }
//   // setTimeout(cbFactory(i), 0);

//   // setTimeout((function (currentI) {
//   //   return function () {
//   //     console.log(currentI);
//   //   }
//   // }()), 0);

//   // var cb = function (currentI) {
//   //   console.log(this.i, currentI);
//   // }.bind({ i: i }, i);

//   // setTimeout(cb, 0);

//   setTimeout(function (a) { console.log(a); }, 0, i);
// }

Promise.resolve().then(function () {
  console.log('Promise.resolve().then');
});

process.nextTick(function () {
  console.log('nextTick');
});

setImmediate(function () {
  console.log('setImmediate');
});

setTimeout(function () {
  console.log('setTimeout');
});

console.log('Main file');



// setTimeout(function () {
//   console.log('HELLO!');
// }, 1000);


// console.log('Main file');
// var content = fs.readFileSync('./test.txt', { encoding: 'utf-8' });
// console.log(content);

var path = require('path');
var studentsPath = path.resolve('week4/lecture/students.txt');
var gradesPath = path.resolve('week4/lecture/grades.txt');

var resPath = path.resolve('week4/lecture/res.txt');

// fs.readFile(studentsPath, {}, function (err, studentsBuffer) {
//   if (err) { console.error('error reading students: ', err); return; }
//   var studentsStr = studentsBuffer.toString();
//   var studentStrings = studentsStr.split('\n');

//   var names = studentStrings.reduce(function (acc, curr) {
//     var splitGradeStr = curr.split(' ');
//     var id = +splitGradeStr[0];
//     var name = splitGradeStr[1];
//     return { ...acc, [id]: { name } };
//   }, {});

//   fs.readFile(gradesPath, { encoding: 'utf-8' }, function (err, gradesStr) {
//     if (err) { console.error('error reading grades: ', err); return; }
//     var gradeStrings = gradesStr.split('\n');
//     var grades = gradeStrings.reduce(function (acc, curr) {
//       var splitGradeStr = curr.split(' ');
//       var name = +splitGradeStr[0];
//       var grade = +splitGradeStr[1];
//       // const data = { name: name, grade: grade };
//       return { ...acc, [name]: grade };
//     }, {});

//     var res = Object.keys(names).map(function (id) {
//       var name = names[id].name;
//       var grade = grades[id]
//       return id + ' ' + name + ' ' + grade;
//     }).join('\n');

//     console.log(res);

//     fs.writeFile(resPath, res, { encoding: 'utf-8' }, function (err, writeResult) {
//       if (err) { console.error('error writing result: ', err); return; }
//       console.log(writeResult);
//       // Callback hell 😬
//     });
//   });
// });


function writeResult(data) {
  fs.writeFile(resPath, data, { encoding: 'utf-8' }, function (err, writeResult) {
    if (err) { console.error('error writing result: ', err); return; }
    console.log(writeResult);
  });
}

var readResultStore = {
  names: null,
  grades: null
}

function parseData() {
  var res = Object.keys(readResultStore.names).map(function (id) {
    var name = readResultStore.names[id];
    var grade = readResultStore.grades[id]
    return id + ' ' + name + ' ' + grade;
    // return [id, name, grade].join(' ');
    // return `${id} ${name} ${grade}`;
  }).join('\n');

  writeResult(res);
}

function readNames() {
  setTimeout(function () {
    fs.readFile(studentsPath, {}, function (err, studentsBuffer) {
      if (err) { console.error('error reading students: ', err); return; }
      var studentsStr = studentsBuffer.toString();
      var studentStrings = studentsStr.split('\n');

      var names = studentStrings.reduce(function (acc, curr) {
        var splitNameStr = curr.split(' ');
        var id = +splitNameStr[0];
        var name = splitNameStr[1];
        // var [id, name] = splitNameStr;
        acc[id] = name;
        return acc;
        // return { ...acc, [id]: name };
      }, {});

      readResultStore.names = names;
      if (!readResultStore.grades) { return; }
      parseData();
    });
  }, 1000);
}

function readGrades() {
  fs.readFile(gradesPath, { encoding: 'utf-8' }, function (err, gradesStr) {
    if (err) { console.error('error reading grades: ', err); return; }
    var gradeStrings = gradesStr.split('\n');
    var grades = gradeStrings.reduce(function (acc, curr) {
      var splitGradeStr = curr.split(' ');
      var id = +splitGradeStr[0];
      var grade = +splitGradeStr[1];
      // var [id, grade] = splitGradeStr;
      acc[id] = grade;
      return acc;
      // return { ...acc, [id]: grade };
    }, {});

    readResultStore.grades = grades;
    if (!readResultStore.names) { return; }
    parseData();
  });
}

readNames();
readGrades();
