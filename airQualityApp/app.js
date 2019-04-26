var express = require('express');
var app = express();
var server = app.listen(4000 , () => { //Start the server, listening on port 4000.
console.log("Listening to requests on port 4000...");
});
var io = require('socket.io').listen(server);

// app.use(express.static('public'));  //Send index.html page on GET /
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// var moment = require('moment');

// moment().format();
const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('/dev/cu.usbmodemFD121');  //add my port here
const parser = port.pipe(new Readline({delimiter: '\r\n'}));


parser.on('data', (pm) => { //use variable for pm data
    var today = new Date();
     console.log(pm);
  io.emit('pm',
  {date: today.getDate()+"-"+today.getMonth()+1+"-"+
  today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()),
  pm: pm });

  });

// io.on('pm25', function (data) {
// console.log(data);
//
// });

io.on('connection', (socket)=> {
    console.log("Someone connected."); //show a log as a new client connects.

});



// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
//
//
//
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// var app = require('http').createServer(handler);
// var io = require('socket.io')(app);
// var fs = require('fs');
//
// app.listen(8080);
//
// function handler (req, res) {
//   fs.readFile(__dirname + '/public/index.html',
//   function (err, data) {
//     if (err) {
//       res.writeHead(500);
//       return res.end('Error loading index.html');
//     }
//
//     res.writeHead(200);
//     res.end(data);
//   });
// }
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });


// var http = require('http');
// var fs = require('fs');
//
// // Loading the index file . html displayed to the client
// var server = http.createServer(function(req, res) {
//     fs.readFile('./index.html', 'utf-8', function(error, content) {
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(content);
//     });
// });
//
// // Loading socket.io
// var io = require('socket.io').listen(server);
//
// // When a client connects, we note it in the console
// io.sockets.on('connection', function (socket) {
//     console.log('A client is connected!');
// });
//
//
// server.listen(8080);
