import dgram from 'dgram';
import readline from 'readline';

const server = dgram.createSocket('udp4');
const port = 3500;
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'send message to client\n',
});
let clientPort = 0;
let clientAddress = '';
server.on('message', (data, rinfo) => {
    console.log(`Msg from client at port: ${rinfo.port}: ${data}`);
    server.send('Hello from server', rinfo.port, rinfo.address, (err) => {
        read.prompt();
    });
    clientPort = rinfo.port;
    clientAddress = rinfo.address;
});

server.on('listening', () => {
    console.log('Server is listening on port', port);
});

server.on('close', (err) => {
    if (err) {
        console.log('Client disconnected due to error');
    } else {
        console.log('Client disconnected');
    }
    server.close();
});

read.on('line', (line) => {
    server.send(line, clientPort, clientAddress, (err) => {
        console.log('message sent to client');
        read.prompt();
    });
});

server.bind(port);
