const express = require('express');
const http = require('http');
const path  = require('path');

// create express app
const app = express();
// extend the express app 
// with WS functionality 
require('express-ws')(app);

// denote the static folder
app.use(express.static(
    path.join(__dirname, 'public')))

//initialize a simple http server
// and tell it to direct traffic 
// to the express app
const server = http.createServer(app);

app.ws('/wspath', (ws, req) => {
    console.log('new connection set up');
    //connection is up, now setup event handling
    ws.on('message', (message) => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`just got a message [ ${message} ]`);
    });

    //send immediatly a feedback to the incoming connection    
    ws.send('Hey, BABA!');
});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
