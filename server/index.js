const express = require('express');
const socketIo = require('socket.io');
const http = require('http');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const { SerialPort, ReadlineParser } = require('serialport') // Serial port
const port = new SerialPort({ path:'COM9', baudRate:9600 }) // config serial port
const parser = new ReadlineParser() // nuevo puerto

port.on('open', () => { //preguntamos si esta conectado al puerto
    console.log('Puerto Conectado')
})

port.pipe(parser)

parser.on('data', console.log) // mostramos los datos

port.on('err',console.log) // mostramos error

server.listen(3000, () => {
    console.log('server on port ',3000)
})