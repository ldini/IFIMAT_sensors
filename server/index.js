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

const { SerialPort, ReadlineParser } = require('serialport') // Serial port
const port = new SerialPort({ path:'COM9', baudRate:9600 }) // config serial port
const parser = new ReadlineParser() // nuevo puerto

port.on('open', () => { //preguntamos si esta conectado al puerto
    console.log('Puerto Conectado')
})

port.pipe(parser)

//parser.on('data', console.log) // mostramos los datos simplificado
parser.on('data',function(data){
    console.log(JSON.parse(data));
    io.emit('arduino:data',{
        value: [JSON.parse(data).sensor1,JSON.parse(data).sensor2,JSON.parse(data).sensor3,JSON.parse(data).sensor4]
    })
})

port.on('err',console.log) // mostramos error

server.listen(3000, () => {
    console.log('server on port ',3000);
})