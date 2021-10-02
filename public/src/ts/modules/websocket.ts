enum MESSAGE_TYPE {
    NULL = 0,
    INIT,
    PLAYER_UPDATE,
    NEW_PLAYER,
    CHAT_MESSAGE
}

export const decode = (msg: ArrayBuffer) => {
    const dv = new DataView(msg);
    const type = dv.getUint8(0);

    switch(type) {
        case MESSAGE_TYPE.INIT:
            console.log(`Got INIT from server! Map size: ${dv.getUint16(1)}`);
            break;
        case MESSAGE_TYPE.CHAT_MESSAGE:
            console.log(`Got chat message from server!`);
            break;
    }
}

export const initPlayer = (socket: WebSocket, name: string) => {
    sendMessage(socket, MESSAGE_TYPE.INIT, name);
}

export const sendChatMessage = (socket: WebSocket, msg: string) => {
    sendMessage(socket, MESSAGE_TYPE.CHAT_MESSAGE, msg);
}

export const sendMessage = (socket: WebSocket, msgType: number, msg: string) => {
    const message = new ArrayBuffer(1+msg.length);
    const dv = new DataView(message);

    dv.setUint8(0, msgType);

    for(let i = 0; i < msg.length; i++) {
        dv.setUint8(i+1, msg.charCodeAt(i));
    }

    console.log("One");
    socket.send(message);
    console.log("Two");
}