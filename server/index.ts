import { SerialPort } from 'serialport';

const serialport = new SerialPort({ path: 'COM9', baudRate: 9600 });
serialport.write('ROBOT POWER ON');