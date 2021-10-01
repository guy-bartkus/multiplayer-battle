import express from 'express';
import ws from 'ws';
import {join} from 'path'
import {sendInitMessage, decode, MESSAGE_TYPE} from './modules/websocket';

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
    socket.binaryType = "arraybuffer";
    
    console.log(`${req.socket.remoteAddress} connected!`);

    socket.on('close', () => {
        console.log(`${req.socket.remoteAddress} disconnected!`);
    });

    sendInitMessage(socket);
    console.log(`Sent init message to ${req.socket.remoteAddress}`);

    socket.on('message', data => {
        const [type, username] = decode((data as ArrayBuffer));

        if(type == MESSAGE_TYPE.INIT) {
            console.log(`Got INIT from ${req.socket.remoteAddress} (${username})`);
        }
    });
});