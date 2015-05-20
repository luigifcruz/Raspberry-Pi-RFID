var express = require('express'),
    app = express();
    io = require('socket.io').listen("8500");
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var rc522 = require("rc522-rfid");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Create a sample login page @ http://localhost:8000
app.get('/', function(req, res){
	res.sendfile(__dirname + '/rfid2.html');
});

// Everytime you tag in this will be triggered.
rc522(function(rfidSerialNumber){
	io.sockets.emit("rfid", rfidSerialNumber); // Sends the RFID Serial Number through Socket.IO
  console.log(rfidSerialNumber);
});

app.listen(8000); // Setup your server port.
