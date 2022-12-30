import http from 'http';
import webSocket from 'ws';
import express from 'express';
import { type } from 'os';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.render('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new webSocket.Server({ server });

function onSocketClose() {
  console.log('Disconnected from the Browser X');
}

const sockets = [];

function handleConnection(socket) {
  sockets.push(socket);
  console.log('connected to Brower ok!');
  socket.on('close', onSocketClose);
  socket.on('message', (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
    // socket.send(message.toString('ascii'));
    // console.log(message.toString('ascii'));
  });
  socket.send('hello');
}

wss.on('connection', handleConnection);

server.listen(3000, handleListen);
