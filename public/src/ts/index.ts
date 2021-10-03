import {prepareStartForm, loginOverlay} from './startup';
import {generatePlayerName, randInt} from './modules/helpers';
import {MESSAGE_TYPE, initPlayer, sendChatMessage, decode, sendRotUpdate, sendPosUpdate} from './modules/websocket';
import Player from './modules/player';
import {Vec2} from './modules/math';

const siteLoader = document.getElementById('loader')!;
const playerList = document.getElementById('player-list')!;
const imageBucket = document.getElementById('asset-bucket')!;


const camera = document.querySelector('canvas')!;
const map_canvas = document.createElement('canvas');
const camera_ctx = camera.getContext('2d')!;
const map_ctx = camera.getContext('2d')!;

const mouse = {
    pos: new Vec2(),
    d: 0,
    dC: false,
    down: false
};

let middle = new Vec2(camera.width/2, camera.height/2);

let renderBackgroundAnimation = true;

let uList: string[] = [];

function renderUserList() {
    playerList.innerHTML = "";

    for (let item of uList) {
        playerList.innerHTML += `<li>${item}</li>`;
    }
}

function initUserList(fuck: string[]) {
    uList = fuck;

    renderUserList();
}

function deleteUser(user: number) {
    uList.splice(user, 1);

    renderUserList();
}

function addUser(user: string) {
    uList.push(user);

    renderUserList();
}

const ws = new WebSocket(`${(window.location.protocol === 'http:' ? 'ws' : 'wss')}://${window.location.host}`);

ws.addEventListener('message', e => {
    (e.data as Blob).arrayBuffer().then(arrayBuffer => {
        const [type, ...data] = decode(arrayBuffer);

        switch(type) {
            case MESSAGE_TYPE.INIT: 
            {
                const mapSize = data[0];
                const userList = data[1];

                console.log("Got INIT!");
                
                for(let username of userList) {
                    new Player(username);
                }

                initUserList(userList);
            }
                break;
            case MESSAGE_TYPE.NEW_PLY:
                {
                    const username = data[0];
                    addUser(username);
                    console.log(`Add player with name ${username}`);
                    new Player(username);
                }
                break;
            case MESSAGE_TYPE.DEL_PLY:
                {
                    const playerID = data[0];
                    deleteUser(playerID);
                    console.log(`Remove player with ID ${playerID}`);
                    Player.players[playerID].removePlayer();
                }
                break;
            default:
                {
                    console.log(`Got some other kind of message. ${type}`);
                }
                break;
        }
    });
});

function calcMousePos(clientPos: Vec2): Vec2 {
    const rect = camera.getBoundingClientRect();
    const rectVec = new Vec2(rect.left, rect.top);

    return clientPos.sub(rectVec);
}


window.addEventListener('resize', () => {
    resize();
});

loginOverlay.addEventListener('click', e => {
    addDot(e.clientX, e.clientY, 0, 0);
});

function resize() {
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;

    middle = new Vec2(camera.width/2, camera.height/2);
}

const dots: [number, number, number, number, number, number][] = [];

function addDot(x: number = randInt(0, 1920), y: number = randInt(0, 1080), xV: number = randInt(-2, 3), yV: number = randInt(-2, 3)) {
    if (!document.hasFocus()) return;
    dots.push([
        x, //x
        y, //y
        xV,
        yV,
        randInt(0, 360), //HSL hue
        1 //Current size
    ]);
}

const bullets: {pos: Vec2, dir: Vec2, traveled: number}[] = [];

const dotsInterval = setInterval(addDot, 100);

function render() {
    camera_ctx.fillStyle = "#444";

    camera_ctx.fillRect(0, 0, camera.width, camera.height);

    if(renderBackgroundAnimation) {
        renderDots();
        if (imageLoaded) {
            renderImages();
        }
    } else {
        camera_ctx.fillStyle = "#37bd37AA";

        camera_ctx.beginPath();
        camera_ctx.arc(mouse.pos.x, mouse.pos.y, 5, 0, Math.PI * 2);
        camera_ctx.fill();
        camera_ctx.closePath();

        camera_ctx.save();
        camera_ctx.setTransform(1, 0, 0, 1, camera.width/2, camera.height/2);
        camera_ctx.rotate(Math.atan2(mouse.pos.y - camera.height/2, mouse.pos.x - camera.width/2));
        camera_ctx.fillRect(-35, -15, 70, 30);
        camera_ctx.restore();
        
        camera_ctx.fillRect(imageTarget.x, imageTarget.y, 50, 50);

        camera_ctx.fillStyle = "#37bd37";
        
        for(let bullet of bullets) {
            camera_ctx.beginPath();
            camera_ctx.arc(bullet.pos.x, bullet.pos.y, 5, 0, Math.PI * 2);
            camera_ctx.fill();
            camera_ctx.closePath();
        }
    }

    requestAnimationFrame(render);
}



function renderDots() {
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
}

const images: string[] = ["shia1.png","shia2.png"];
let imageLoaded: Boolean = false;
let imageTime: number = 0;
let currentImageTime: number = 0;
let imageTarget = {
    x:0,
    y:0
}
let currentImage = {
    i:0,
    pos: new Vec2(),
    dir: new Vec2(),
    v: 2
};

function loadImages() {
    for(let i = 0; i < images.length; i++) {
        const img = document.createElement('img');
        img.src = `/assets/${images[i]}`;
        img.width = 200;
        imageBucket.appendChild(img);

        if (i == 0) {
            img.onload = function() {
                imageLoaded = true;
            }
        }
        
    }   
}


function renderImages() {

    currentImageTime++;
    if (currentImageTime >= imageTime) { // init new image
        currentImage.i = (currentImage.i + 1 > images.length -1) ? 0 : currentImage.i + 1;

        if (Math.random() > 0.5) { //fixed y, random x
            currentImage.pos.y = Math.random() > 0.5 ? camera.height : - 200;
            currentImage.pos.x = randInt(0, camera.width);
            imageTarget.y = currentImage.pos.y > 0 ? 0 : camera.height;
            imageTarget.x = randInt(0, camera.width);
        } else { //fixed x, random y
            currentImage.pos.x = Math.random() > 0.5 ? camera.width : -200;
            currentImage.pos.y = randInt(0, camera.height);
            imageTarget.x = currentImage.pos.y > 0 ? 0 : camera.width
            imageTarget.y = randInt(0, camera.height);
        }
        currentImage.dir = (new Vec2(imageTarget.x, imageTarget.y).sub(currentImage.pos)).normalize();
        currentImage.v = randInt(5, 20);

        imageTime = currentImage.pos.distance(new Vec2(imageTarget.x, imageTarget.y)) / currentImage.v;
        console.log(`it: ${imageTime}`);
        currentImageTime = 0;
    }
    currentImage.pos = currentImage.pos.add(currentImage.dir.mul(currentImage.v));
    let imgEl: HTMLImageElement = (imageBucket.children[currentImage.i] as HTMLImageElement);
    camera_ctx.drawImage(imgEl,currentImage.pos.x, currentImage.pos.y, 200, 200); 
}

function initGameHandlers() {
    camera.addEventListener('mousemove', e => {
        mouse.dC = true;
    
        mouse.pos = calcMousePos(new Vec2(e.clientX, e.clientY));
        mouse.d = Math.atan2(mouse.pos.y - camera.height/2, mouse.pos.x - camera.width/2)
    });

    camera.addEventListener('click', e => {
        const pos = calcMousePos(new Vec2(e.clientX, e.clientY));

        sendPosUpdate(ws, new Vec2(pos.x, pos.y));
    });
    
    camera.addEventListener('mousedown', e => {
        const pos = calcMousePos(new Vec2(e.clientX, e.clientY));
        const dir = pos.sub(middle).normalize();

        bullets.push({
            pos: middle.add(dir.mul(30)),
            dir: dir,
            traveled: 0
        });
        
        mouse.down = true;
    });

    camera.addEventListener('mouseup', e => {
        mouse.down = false;
    });

    setInterval(() => {
        for(let i = 0; i < bullets.length; i++) {
            const bullet = bullets[i];

            if(bullet.traveled > 1101) {
                bullets.splice(i, 1);
                continue;
            }

            bullet.pos = bullet.pos.add(bullet.dir.mul(10));
            bullet.traveled += 10;
        }
    }, 20);

    setInterval(() => {
        if(mouse.dC) {
            mouse.dC = false;
            sendRotUpdate(ws, mouse.d);
        }
        if(mouse.down) {
            sendPosUpdate(ws, new Vec2(mouse.pos.x, mouse.pos.y));
        }
    }, 50);

}

export function startGame(username:string) {
    renderBackgroundAnimation = false;
    clearInterval(dotsInterval);
    initPlayer(ws, username);
    initGameHandlers();
}
export function sendChat(msg:string) {
    sendChatMessage(ws, msg);
}

prepareStartForm();
resize();
loadImages();
render();

setTimeout(function(){
    siteLoader.classList.add('hidden');
}, 500);
