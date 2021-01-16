// TODO should be a complete class 
// to encapsulate all functions 

var sendMessage;

function openConnection() {
    // note - do not mistake ws:// with wss:// - it is for SSL connections
    wsloc = document.getElementById('wsloc').nodeValue;
    wspipe = new WebSocket("ws://localhost:3000", "protocolX");
    wspipe.onopen = function(evt) {
        // debugger;
        sendMessage = function() {
            wspipe.send("a message going to the back-end!");
        }    
    }
}
