import express from 'express';
import ws from 'ws';
import {join} from 'path'

const app = express();

app.use(express.static(join(__dirname, '..', 'public', 'public')));

const server = app.listen(6969, '0.0.0.0', () => {
    console.log("Webserver up!");
});

const wss = new ws.Server({server: server, maxPayload: 1 * 1024});

wss.on('listening', () => {
    console.log("Websocket server up!");
});

wss.on('connection', (socket, req) => {
    console.log(`${req.socket.remoteAddress} connected!`);

    socket.on('close', () => {
        console.log(`${req.socket.remoteAddress} disconnected!`);
    });
});