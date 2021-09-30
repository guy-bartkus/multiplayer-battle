const camera = document.querySelector('canvas')!;
const map_canvas = document.createElement('canvas');
const camera_ctx = camera.getContext('2d')!;
const map_ctx = camera.getContext('2d')!;

const mouse = {
    x: 0,
    y: 0
}

camera.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    resize();
});

function resize() {
    camera.width = window.innerWidth;
    camera.height = window.innerHeight;
}

function render() {
    camera_ctx.fillStyle = "#444";

    camera_ctx.fillRect(0, 0, camera.width, camera.height);

    camera_ctx.fillStyle = "#0F0";

    camera_ctx.beginPath();
    camera_ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
    camera_ctx.closePath();
    camera_ctx.fill();

    requestAnimationFrame(render);
}

resize();
render();

const ws = new WebSocket(`ws://${window.location.host}`);