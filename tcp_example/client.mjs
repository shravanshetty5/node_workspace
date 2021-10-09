import net from 'net';
import readline from 'readline';

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'write something to server\n',
});
const client = net.connect({ port: 3500 }, () => {
    console.log('Connection established');
    client.write('Hello from client');
});

client.on('data', (data) => {
    console.log('Msg from server:', data.toString());
});

client.on('end', () => {
    console.log('disconnected from server');
});

read.prompt();
read.on('line', (line) => {
    client.write(line);
    read.prompt();
});
