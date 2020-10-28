"use strict" // against woorookeee

function readFile(fname, parser) {
    /* read file data */
    /* clear file data from comments */
    // call parser with the prepared data

    var data = [
        'Edgar Allan Poe 32322',
        'Proval Provansalov PRovenski 6666',
        'Yordan Moyat Kolega от_Офиса 342', 
    ];
    parser(data);
}

var marks = {
    students: {},
    marks: {},
    credits:{}
};

function parseStudents(data) {
    for (var line of data) {
        var res = line.match(/\w+/g);
        var fn = res.pop();
        this.students[fn] = res.join(' ')
    }
}

readFile('students.txt', parseStudents.bind(marks));
readFile('marks.txt', parseMarks.bind(marks));
readFile('credits.txt', parseCredits.bind(marks));

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