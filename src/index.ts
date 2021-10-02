import express from 'express';
import ws from 'ws';
import {join} from 'path'
import Player from './modules/player'
import {sendInitMessage, decode, MESSAGE_TYPE} from './modules/websocket';

const app = express();

const players: Player[] = [];

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

    socket.on('message', msg => {
        const [type, data] = decode((msg as ArrayBuffer));
        switch (type) {
            case MESSAGE_TYPE.INIT:
                console.log(`Got INIT from ${req.socket.remoteAddress} (${data})`);
                const player = new Player(socket, data);
                players.push(player);
                break;
            case MESSAGE_TYPE.CHAT_MESSAGE:
                console.log(`got CHAT_MESSAGE from ${req.socket.remoteAddress} (${data})`)

                break;
        }
    });
});