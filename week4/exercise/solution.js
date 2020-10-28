"use strict" // against woorookeee

var fs = require('fs');

// var deffered = new Promise(function (res, rej) {
//     setTimeout(function () {
//         res('SUPER!')
//     }, 1000);
// }).then(function (res) {
//     return new Promise(function (res, rej) {
//         fs.readFile(
//             'week4/exercise/students.txt', { encoding: 'utf-8' },
//             function (err, data) {
//                 if (err) { rej(err); return; }
//                 res(data);
//             }
//         );
//     }).then(function (data) {
//         console.log(data);
//         return { data };
//     }).catch(function (err) {
//         console.error(err);
//     });
// }).then(function (data) {
//     console.log(data);
// });


function readFile(fname, parser, cont) {
    // read data with continuation...
    fs.readFile(
        fname,
        { encoding: 'utf-8' },
        // ...continue here, when data is read
        function (err, rawData) {
            if (err) { console.error(err); return; }
            // split the lines by new line
            var data = rawData.split(/[\r\n]+/).filter(
                // filter out all line starting with #
                function (line) {
                    return !line.startsWith('#');
                });
            parser(data);
            // call this pseudo-continuation
            cont();
        }
    );
}

function readFilePromise(fname, parser) {
    return new Promise(function (res, rej) {
        fs.readFile(
            fname,
            { encoding: 'utf-8' },
            // callback here
            function (err, rawData) {
                if (err) { rej(err); return; }
                var data = rawData.split(/[\r\n]+/).filter(
                    function (line) {
                        return !line.startsWith('#');
                    }
                );
                parser(data);
                // call this pseudo-continuation
                return res(data);
            }
        );
    });
}

var marks = {
    students: {},
    marks: {},
    credits: []
};

function parseStudents(data) {
    for (var line of data) {
        var res = line.match(/\w+/g);
        var fn = res.pop();
        this.students[fn] = res.join(' ')
    }
}

function parseMarks(data) {
    for (var line of data) {
        var res = line.match(/[\w.]+/g);
        var fn = res.shift();
        this.marks[fn] = res;
    }
}

function parseCredits(data) {
    var cnames = data[0].split('\s+');
    var cvals = data[1].split('\s+');
    for (var v in cnames) { // iterate index
        this.credits[v] = [cnames[v], cvals[v]];
    }
}

function calcData() {
    // sanity check - does our structure looko to be complete 
    // with the data that is needed to run the calculation
    for (var i of Object.getOwnPropertyNames(this)) {
        if (!Object.keys(this[i]).length) {
            return;
        }
    }

    // sanity checked, we are good

    console.log('we do calculation here');
}

// we don't want to parse everthing all the time
// non concurrency here, best we can do is
// always check result for sanity (or count... doh) 
// readFile(
//     'week4/exercise/students.txt',
//     parseStudents.bind(marks),
//     calcData.bind(marks)
// );
// readFile(
//     'week4/exercise/marks.txt',
//     parseMarks.bind(marks),
//     calcData.bind(marks)
// );
// readFile(
//     'week4/exercise/credits.txt',
//     parseCredits.bind(marks),
//     calcData.bind(marks)
// );

// concurrent execution of all file reads

Promise.all([
    readFilePromise(
        'week4/exercise/students.txt',
        parseStudents.bind(marks)
    ),
    readFilePromise(
        'week4/exercise/marks.txt',
        parseMarks.bind(marks)
    ),
    readFilePromise(
        'week4/exercise/credits.txt',
        parseCredits.bind(marks)
    )]
).then(calcData.bind(marks))

// sequential call

// Promise.resolve()
//     .then(readFilePromise.bind(null,'week4/exercise/students.txt',parseStudents.bind(marks)))
//     .then(readFilePromise.bind(null,'week4/exercise/marks.txt',parseMarks.bind(marks)))
//     .then(readFilePromise.bind(null,'week4/exercise/credits.txt',parseCredits.bind(marks)))
//     .then(calcData.bind(marks))


// RegEx basics
// symbol class
// .   - any char
// \s  - whitespace
// \d  - digits
// \w  - alpha-numeric

// modifier
// +        - one or more  - greedy
// *        - zero or more - greedy
// {m,n}    - in between m and n
// ?        - don't be greedy

// (something here)  - group


