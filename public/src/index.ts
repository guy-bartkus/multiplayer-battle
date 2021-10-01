import {generatePlayerName, randInt} from './helpers';
import {initPlayer, decode} from './modules/websocket';

const camera = document.querySelector('canvas')!;
const map_canvas = document.createElement('canvas');
const camera_ctx = camera.getContext('2d')!;
const map_ctx = camera.getContext('2d')!;

const siteLoader = document.getElementById('loader')!;

const loginOverlay = document.getElementById('login-overlay')!;
const startButton = document.getElementById('start-game')!;
const generateNameButton = document.getElementById('generate-name')!;
const username = document.getElementById('username') as HTMLInputElement;

const gameChatContainer = document.getElementById('game-chat')!;
const gameChatMessage = document.getElementById('message') as HTMLTextAreaElement;
const sendMessageButton = document.getElementById('send-message')!;

const errorDisplayContainer = document.getElementById('error-display')!;
let errorList = [];


const mouse = {
    x: 0,
    y: 0
}

let renderBubbles = true;

function prepareStartForm() {
    startButton?.addEventListener('click', handleStart);
    generateNameButton?.addEventListener('click', generateName);
}

function generateName() {
    username.value = generatePlayerName();
    username.classList.remove();
}

function hideStartForm() {
    loginOverlay.classList.add('hidden');
}
function showGameChat() {
    gameChatContainer.classList.remove('hidden');
    sendMessageButton.addEventListener('click', sendMessage);
}

function sendMessage() {
    if (!gameChatMessage.value.trim().length) {
        return
    }
    let msg = gameChatMessage.value.trim();
    console.log('sending msg', msg);

    gameChatMessage.value = "";
}

function handleStart() {
    username.classList.remove();
    if (!username.value.trim().length) {
        username.value = generatePlayerName();
    } else if (username.value.trim().length > 20) {
        username.classList.add("error");
        return;
    }
    startGame()
    hideStartForm();
    showGameChat();
    renderBubbles = false;
}

const ws = new WebSocket(`ws://${window.location.host}`);

ws.addEventListener('message', e => {
    (e.data as Blob).arrayBuffer().then(arrayBuffer => {
        decode(arrayBuffer);
    });
});

function startGame() {
    initPlayer(ws, username.value);
    
    return true
}

camera.addEventListener('mousemove', e => {
    const rect = camera.getBoundingClientRect();

    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top;
});

window.addEventListener('resize', () => {
    resize();
});

function resize() {
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;
}

const dots: [number, number, number, number, number, number][] = [];

function addDot() {
    dots.push([
        randInt(0, 1920), //x
        randInt(0, 1080), //y
        randInt(-2, 3),
        randInt(-2, 3),
        randInt(0, 360), //HSL hue
        1 //Current size
    ]);

    if(renderBubbles) setTimeout(addDot, randInt(50, 200));
}

addDot();

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

prepareStartForm();
resize();
render();
setTimeout(function(){
    siteLoader.classList.add('hidden');
}, 500);
