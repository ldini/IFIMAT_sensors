const express = require('express');
const socketIo = require('socket.io');
const http = require('http');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function(socket){
    console.log('un nuevo cliente conectado');
})

app.get('/', (req,res,next) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/chartjs-plugin-zoom.min.js', (req,res,next) => {
    res.sendFile(__dirname + '/chartjs-plugin-zoom.min.js');
});


const { SerialPort, ReadlineParser } = require('serialport') // Serial port
const port = new SerialPort({ path:'COM9', baudRate:9600 }) // config serial port
const parser = new ReadlineParser() // nuevo puerto

port.on('open', () => { //preguntamos si esta conectado al puerto
    console.log('Puerto Conectado')
})

port.pipe(parser)

let data = [];


app.get('/export', (req,res,next) => {
    res.type('text/csv')
    let str = 'tiempo,sensor1,sensor2,sensor3,sensor4\n'
    for (let index = 0; index < data.length; index++) {
        const e = data[index];
        str += `${e.time},${e.sensor1},${e.sensor2},${e.sensor3},${e.sensor4}\n`
    }
    res.send(str);
});

//parser.on('data', console.log) // mostramos los datos simplificado
parser.on('data',function(serialData){
    let val = JSON.parse(serialData);
    val.time = data.length;
    data.push(val);
    console.log(val);
    io.emit('arduino:data', data.slice(-10))
})

port.on('err',console.log) // mostramos error

server.listen(3000, () => {
    console.log('server on port ',3000);
})