"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ws_1 = __importDefault(require("ws"));
var path_1 = require("path");
var app = express_1.default();
app.use(express_1.default.static(path_1.join(__dirname, '..', 'public', 'public')));
var server = app.listen(6969, '0.0.0.0', function () {
    console.log("Webserver up!");
});
var wss = new ws_1.default.Server({ server: server, maxPayload: 1 * 1024 });
wss.on('listening', function () {
    console.log("Websocket server up!");
});
wss.on('connection', function (socket, req) {
    console.log(req.socket.remoteAddress + " connected!");
    socket.on('close', function () {
        console.log(req.socket.remoteAddress + " disconnected!");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsMENBQW9CO0FBQ3BCLDZCQUF5QjtBQUV6QixJQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRW5FLElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBTSxHQUFHLEdBQUcsSUFBSSxZQUFFLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBQyxDQUFDLENBQUM7QUFFbEUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUU7SUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFNLEVBQUUsR0FBRztJQUM3QixPQUFPLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxnQkFBYSxDQUFDLENBQUM7SUFFdEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUU7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxtQkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IHdzIGZyb20gJ3dzJztcclxuaW1wb3J0IHtqb2lufSBmcm9tICdwYXRoJ1xyXG5cclxuY29uc3QgYXBwID0gZXhwcmVzcygpO1xyXG5cclxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhqb2luKF9fZGlybmFtZSwgJy4uJywgJ3B1YmxpYycsICdwdWJsaWMnKSkpO1xyXG5cclxuY29uc3Qgc2VydmVyID0gYXBwLmxpc3Rlbig2OTY5LCAnMC4wLjAuMCcsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiV2Vic2VydmVyIHVwIVwiKTtcclxufSk7XHJcblxyXG5jb25zdCB3c3MgPSBuZXcgd3MuU2VydmVyKHtzZXJ2ZXI6IHNlcnZlciwgbWF4UGF5bG9hZDogMSAqIDEwMjR9KTtcclxuXHJcbndzcy5vbignbGlzdGVuaW5nJywgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJXZWJzb2NrZXQgc2VydmVyIHVwIVwiKTtcclxufSk7XHJcblxyXG53c3Mub24oJ2Nvbm5lY3Rpb24nLCAoc29ja2V0LCByZXEpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGAke3JlcS5zb2NrZXQucmVtb3RlQWRkcmVzc30gY29ubmVjdGVkIWApO1xyXG5cclxuICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7cmVxLnNvY2tldC5yZW1vdGVBZGRyZXNzfSBkaXNjb25uZWN0ZWQhYCk7XHJcbiAgICB9KTtcclxufSk7Il19