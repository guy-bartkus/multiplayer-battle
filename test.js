const userList = ["CrippledGeezer69", "DistantCat2069", "WeirdCat2012", "DerpyToast4069"];

var enc = new TextEncoder();
var dec = new TextDecoder('ascii');

let len = userList.length;

for(let user of userList) {
    len += user.length;
}

const combined = new Uint8Array(len);

let i = 0;
let i2 = 0;

while(i < len) {
    const username = enc.encode(userList[i2]);
    combined.set([username.byteLength], i);
    combined.set(username, i+1);

    i2++;
    i += username.byteLength+1;
}

const arrayBuffer = combined.buffer;

const dv = new DataView(arrayBuffer);

i = 0;

while(i < arrayBuffer.byteLength) {
    const uLen = dv.getUint8(i);

    const username = dec.decode(arrayBuffer.slice(i+1, i+uLen+1));

    console.log(username);

    i += uLen+1;
}