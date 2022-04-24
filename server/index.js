const { SerialPort, ReadlineParser } = require('serialport')
const port = new SerialPort({ path:'COM9', baudRate:9600 })
const parser = new ReadlineParser()
port.pipe(parser)
parser.on('data', console.log)

