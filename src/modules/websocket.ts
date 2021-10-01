import {WebSocket} from 'ws';
import settings from '../game-settings';

export enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    PLAYER_UPDATE,
    NEW_PLAYER
}

export const decode = (msg: ArrayBuffer): any[] => {
    const dv = new DataView(msg);
    const type = dv.getUint8(0);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            const utf8decoder = new TextDecoder();
            const username = utf8decoder.decode((new Uint8Array(msg.slice(1, msg.byteLength-1))));
            return [MESSAGE_TYPE.INIT, username];
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