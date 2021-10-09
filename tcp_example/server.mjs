import net from 'net';
import redline from 'readline';

const server = net.createServer();
const port = 3500;

const read = redline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'write something to the client\n',
});

server.on('connection', (socket) => {
    console.log(
        `Connection established from client at hostname: ${socket.remoteAddress} port:${socket.remotePort}`
    );
    socket.write('Hello from the server');

    socket.on('data', (data) => {
        console.log(`message from client : ${data.toString()}`);
        socket.write('data received to server');
    });

    socket.on('close', (err) => {
        if (err) {
            console.log('Client disconnected due to error');
        } else {
            console.log('Client disconnected');
        }
    });

    read.prompt();
    read.on('line', (line) => {
        socket.write(line);
        read.prompt();
    });
});

server.on('listening', function () {
    console.log('Server is listening on port', port);
});

server.listen(port);
