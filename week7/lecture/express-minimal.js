const express = require('express');
const bodyParser = require('./body-parser');

const urlencodedMiddleware = bodyParser.urlencoded();

const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(urlencodedMiddleware);

const port = 3000;

function renderBody(params) {
    return `
    <html><body>
    <h1>Hello, ${params['name']}!</h1>
    <form method='post' name='myform' action='/submart'/>
        <span>Enter your name, yo :</span> <input type='text' name='name'/>
        <br/>
        <input type='hidden' name='hval' value = '#jiquieqw' />
        <input type='hidden' name='bval' value = '#!!!!!!!!' />
        <input type='hidden' name='cval' value = '🚀👩🏼‍🚀👨🏼‍🚀👩🏼‍🎤🥌' />
        <input type='hidden' name='dval' value = 'wow bob!' />
        <input type='submit' name='submitButton' value='hidden val' /> 
    </form>
    </body></html>
    `
}

// service
// f(x,y) = ax^2 + by + c
app.get('/:a/:b/:c', (req, res) => {
    const { a, b, c } = req.params;     // parameters
    const { x, y } = req.query;        // arguments

    res.send(
        a * x * x + b * y + c
    );
});

app.get('/', (req, res) => {
    res.send(renderBody({ name: 'Default' }));
});

app.get('/:personName/', (req, res) => {
    let personName = req.params['personName'];
    res.send(renderBody({ name: personName }));
});

/*

POST /submort HTTP/2
Host: localhost
User-Agent: curl/7.54.0

*/

// Model - structure of the data
// View - view to the data 
// Controller - the logic that puts data from the model together so that it is shown in some view

app.post('/subm(o|a)rt', urlencodedMiddleware, (req, res) => {
    // const body = [];
    // req.on("data", (chunk) => {
    //     console.log(chunk);
    //     body.push(chunk);
    // });
    // req.on("end", () => {
    // });
    res.send('okay - received it!!');
    // middleware - посредник
});

app.use(function (err, req, res, next) {
    if (err.message === 'BODY PARSER ERROR') {
        res.status(400).send('BAD REQUEST!');
        return;
    }
    res.status(500).end('SERVER ERROR');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})