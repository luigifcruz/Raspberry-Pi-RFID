var express = require('express'),
    app = express();
    io = require('socket.io').listen("8500");
var rc522 = require("rc522-rfid");
	
console.log("App successfully launched!");

// Create a sample login page @ http://localhost:8000
app.get('/', function(req, res){
	res.sendFile(__dirname + '/rfid2.html');
});

// Everytime you tag in this will be triggered.
rc522(function(rfidSerialNumber){
	io.sockets.emit("rfid", rfidSerialNumber); // Sends the RFID Serial Number through Socket.IO
  	console.log(rfidSerialNumber);
});

app.use('/rfid.png', express.static(__dirname + '/rfid.png')); 

app.listen(8000); // Setup your server port.
