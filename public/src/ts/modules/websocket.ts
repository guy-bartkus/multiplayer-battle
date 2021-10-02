enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    PLAYER_UPDATE,
    NEW_PLAYER,

}

export const decode = (msg: ArrayBuffer) => {
    const dv = new DataView(msg);
    const type = dv.getUint8(0);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            console.log(`Got INIT from server! Map size: ${dv.getUint16(1)}`);
            break;
    }
}

export const initPlayer = (socket: WebSocket, name: string) => {
    const message = new ArrayBuffer(1+name.length);
    const dv = new DataView(message);

    dv.setUint8(0, MESSAGE_TYPE.INIT);

    for(let i = 0; i < name.length; i++) {
        dv.setUint8(i+1, name.charCodeAt(i));
    }

    socket.send(message);
}