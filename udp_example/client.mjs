import dgram from 'dgram';
import readline from 'readline';
const client = dgram.createSocket('udp4');
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'send message to server\n',
});

client.send('Hello from client', 3500, 'localhost', (err) => {
    console.log('Message sent to server');
    read.prompt();
});

client.on('message', (data) => {
    console.log('Msg from server:', data.toString());
});

client.on('end', () => {
    console.log('disconnected from server');
});

read.on('line', (line) => {
    client.send(line, 3500, 'localhost', (err) => {
        console.log('Message sent to server');
        read.prompt();
    });
});
