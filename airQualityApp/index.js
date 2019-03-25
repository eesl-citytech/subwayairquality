var app = express();
var server = app.listen(4000, callback)

var io = require(‘socket.io’)(server);

const SerialPort = require(‘serialport’);
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort(‘COM3’);  //add my port here
const parser = port.pipe(new Readline({delimiter: ‘\r\n’}));

parser.on(‘data’, callback);


parser.on('data', (temp) => { //use variable for pm data
    var today = new Date();
    io.sockets.emit('temp', {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), temp:temp});
});

io.on('connection', (socket) => {
    console.log("Someone connected."); //show a log as a new client connects.
}) 
