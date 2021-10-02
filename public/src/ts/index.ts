import {prepareStartForm, loginOverlay} from './startup';
import {generatePlayerName, randInt} from './helpers';
import {MESSAGE_TYPE, initPlayer, sendChatMessage, decode, sendRotUpdate} from './modules/websocket';

const siteLoader = document.getElementById('loader')!;

const camera = document.querySelector('canvas')!;
const map_canvas = document.createElement('canvas');
const camera_ctx = camera.getContext('2d')!;
const map_ctx = camera.getContext('2d')!;

const mouse = {
    x: 0,
    y: 0,
    d: 0,
    dC: false
};

let renderBubbles = true;

const ws = new WebSocket(`ws://${window.location.host}`);

ws.addEventListener('message', e => {
    (e.data as Blob).arrayBuffer().then(arrayBuffer => {
        const [type, ...data] = decode(arrayBuffer);

        switch(type) {
            case MESSAGE_TYPE.NEW_PLY: 
            {
                
            }
        }
    });
});

setInterval(() => {
    if(mouse.dC) {
        mouse.dC = false;

        sendRotUpdate(ws, mouse.d);
    }
}, 50);

camera.addEventListener('mousemove', e => {
    const rect = camera.getBoundingClientRect();

    mouse.dC = true;

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.d = Math.atan2(mouse.y - camera.height/2, mouse.x - camera.width/2)
});

window.addEventListener('resize', () => {
    resize();
});

loginOverlay.addEventListener('click', e => {
    addDot(e.clientX, e.clientY, 0, 0);
});

function resize() {
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;
}

const dots: [number, number, number, number, number, number][] = [];

function addDot(x: number = randInt(0, 1920), y: number = randInt(0, 1080), xV: number = randInt(-2, 3), yV: number = randInt(-2, 3)) {
    dots.push([
        x, //x
        y, //y
        xV,
        yV,
        randInt(0, 360), //HSL hue
        1 //Current size
    ]);
}

setInterval(addDot, 100);

function render() {
    camera_ctx.fillStyle = "#444";

    camera_ctx.fillRect(0, 0, camera.width, camera.height);

    if(renderBubbles) {
        for(let i = 0; i < dots.length; i++) {
            const dot = dots[i];
    
            camera_ctx.fillStyle = `hsl(${dot[4]}, 100%, 50%, ${0.013333 * (50 - dot[5])})`;
    
            camera_ctx.beginPath();
            camera_ctx.arc(dot[0], dot[1], dot[5], 0, Math.PI * 2);
            camera_ctx.closePath();
            camera_ctx.fill();
    
            dot[0] += dot[2];
            dot[1] += dot[3];
            dot[5] += 0.5;
    
            if(dot[5] > 50) {
                dots.splice(i, 1);
            }
        }
    } else {
        camera_ctx.fillStyle = "#37bd37";

        camera_ctx.beginPath();
        camera_ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
        camera_ctx.fill();
        camera_ctx.closePath();

        camera_ctx.save();
        camera_ctx.setTransform(1, 0, 0, 1, camera.width/2, camera.height/2);
        camera_ctx.rotate(Math.atan2(mouse.y - camera.height/2, mouse.x - camera.width/2));
        camera_ctx.fillRect(-35, -15, 70, 30);
        camera_ctx.restore();
    }

    requestAnimationFrame(render);
}

function initGameHandlers() {
    camera.addEventListener('click', e => {
        console.log('mouseClick', mouse);
    });
}

export function startGame(username:string) {
    renderBubbles = false;
    initPlayer(ws, username);
    initGameHandlers();
}
export function sendChat(msg:string) {
    sendChatMessage(ws, msg);
}

prepareStartForm();
resize();
render();
setTimeout(function(){
    siteLoader.classList.add('hidden');
}, 500);
