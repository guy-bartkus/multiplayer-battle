import {WebSocket} from 'ws';
import settings from '../game-settings';

export enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    PLAYER_UPDATE,
    NEW_PLAYER,
    CHAT_MESSAGE
}

export const decode = (msg: ArrayBuffer): any[] => {
    const dv = new DataView(msg);
    const type = dv.getUint8(0);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            {
                const utf8decoder = new TextDecoder();
                const username = utf8decoder.decode((new Uint8Array(msg.slice(1, msg.byteLength))));
                return [MESSAGE_TYPE.INIT, username];
            }
            break;
        case MESSAGE_TYPE.CHAT_MESSAGE:
            {
                const utf8decoder = new TextDecoder();
                const chatMessage = utf8decoder.decode((new Uint8Array(msg.slice(1, msg.byteLength))));
                return [MESSAGE_TYPE.CHAT_MESSAGE, chatMessage];
            }
            
            break;
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

    dv.setUint8(0, MESSAGE_TYPE.CHAT_MESSAGE);
    for(let i = 0; i < msg.length; i++) {
        dv.setUint8(i+1, msg.charCodeAt(i));
    }
    dv.setUint16(1, settings.mapSize);

    socket.send(message);
}