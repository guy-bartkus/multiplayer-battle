import {Vec2} from './math'
import {decodePlayerList} from './helpers'; 

export enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    ROTATE,
    MOVE,
    CHAT,
    NEW_PLY,
    DEL_PLY
}

export const decode = (payload: ArrayBuffer): any[] => {
    const type = (new DataView(payload)).getUint8(0);
    const msg = payload.slice(1, payload.byteLength)
    const dv = new DataView(msg);

    console.log(msg);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            {
                const mapSize = dv.getUint16(0);
                const userList = decodePlayerList(msg.slice(2, msg.byteLength));
                return [type, mapSize, userList];
            }
            break;
        case MESSAGE_TYPE.CHAT:
            return [type];
            break;
        case MESSAGE_TYPE.NEW_PLY:
            {
                const utf8decoder = new TextDecoder();
                const id = dv.getUint8(0);
                const username = utf8decoder.decode((new Uint8Array(msg.slice(1, msg.byteLength))));
                return [type, id, username];
            }
            break;
        case MESSAGE_TYPE.DEL_PLY:
            {
                const playerID = dv.getUint8(0);
                return [type, playerID];
            }
            break;
        default:
            return [MESSAGE_TYPE.NULL];
            break;
    }
}

export const initPlayer = (socket: WebSocket, name: string) => {
    sendMessage(socket, MESSAGE_TYPE.INIT, name);
}

export const sendChatMessage = (socket: WebSocket, msg: string) => {
    sendMessage(socket, MESSAGE_TYPE.CHAT, msg);
}

export const sendRotUpdate = (socket: WebSocket, rad: number) => {
    const payload = new ArrayBuffer(5);
    const dv = new DataView(payload);

    dv.setUint8(0, MESSAGE_TYPE.ROTATE);
    dv.setFloat32(1, rad);

    socket.send(payload);
}

// export const sendAbilityCast = (socket: WebSocket, )

export const sendPosUpdate = (socket: WebSocket, pos: Vec2) => {
    // const payload = new ArrayBuffer(5);
    // const dv = new DataView(payload);

    // dv.setUint8(0, MESSAGE_TYPE.ROTATE);
    // dv.setFloat32(1, rad);

    // socket.send(payload);
}

export const sendMessage = (socket: WebSocket, msgType: number, msg: string) => {
    const payload = new ArrayBuffer(1+msg.length);
    const dv = new DataView(payload);

    dv.setUint8(0, msgType);

    for(let i = 0; i < msg.length; i++) {
        dv.setUint8(i+1, msg.charCodeAt(i));
    }

    socket.send(payload);
}