import ws, {WebSocket} from 'ws';
import settings from '../game-settings';
import {Server} from 'http';
import Player from './player';

export enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    ROTATE,
    MOVE,
    CHAT,
    NEW_PLY,
    DEL_PLY
}

export const init = (server: Server) => {
    const wss = new ws.Server({server: server, maxPayload: 1 * 1024});

    wss.on('listening', () => {
        console.log("Websocket server up!");
    });

    wss.on('connection', (socket, req) => {
        socket.binaryType = "arraybuffer";

        const player = new Player(socket, "");
        const id = player.id;
        
        console.log(`${req.socket.remoteAddress} connected!`);

        socket.on('close', () => {
            console.log(`${req.socket.remoteAddress} disconnected!`);
        });

        sendInitMessage(socket);

        socket.on('message', msg => {
            const [type, ...data] = decode((msg as ArrayBuffer));
            switch (type) {
                case MESSAGE_TYPE.INIT:
                    {
                        console.log(`Got INIT from ${req.socket.remoteAddress} (${data})`);
                        player.name = data[0];
                    }
                    break;
                case MESSAGE_TYPE.ROTATE:
                    {
                        Player.players[id].angle = data[0];
                        console.log(`${player.name}'s rotation is ${player.angle}'`);
                    }
                    break;
                case MESSAGE_TYPE.CHAT:
                    {
                        console.log(`got CHAT_MESSAGE from ${req.socket.remoteAddress} (${data})`)
                    }
                    break;
                default:
                    break;
            }
        });
    });
}

export const decode = (payload: ArrayBuffer): any[] => {
    const type = (new DataView(payload)).getUint8(0);
    const msg = payload.slice(1, payload.byteLength)
    const dv = new DataView(msg);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            {
                const utf8decoder = new TextDecoder();
                const username = utf8decoder.decode((new Uint8Array(msg)));
                return [type, username];
            }
            break;
        case MESSAGE_TYPE.CHAT:
            {
                const utf8decoder = new TextDecoder();
                const chatMessage = utf8decoder.decode((new Uint8Array(msg)));
                return [type, chatMessage];
            }
            break;
        case MESSAGE_TYPE.ROTATE:
            {
                const rad = dv.getFloat32(0);

                return [type, rad]
            }
        default:
            return [MESSAGE_TYPE.NULL];
            break;
    }
}

export const sendInitMessage = (socket: WebSocket) => { //MESSAGE_TYPE: Uint8, MapSize: Uint16
    const message = new ArrayBuffer(3);
    const dv = new DataView(message);

    dv.setUint8(0, MESSAGE_TYPE.INIT);
    dv.setUint16(1, settings.mapSize);

    socket.send(message);
}

export const relayChatMessage = (socket: WebSocket, msg:string) => { //MESSAGE_TYPE: Uint8, MapSize: Uint16
    const message = new ArrayBuffer(3);
    const dv = new DataView(message);

    dv.setUint8(0, MESSAGE_TYPE.CHAT);
    for(let i = 0; i < msg.length; i++) {
        dv.setUint8(i+1, msg.charCodeAt(i));
    }
    dv.setUint16(1, settings.mapSize);

    socket.send(message);
}