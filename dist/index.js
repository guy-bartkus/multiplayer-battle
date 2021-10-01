"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ws_1 = __importDefault(require("ws"));
var path_1 = require("path");
var websocket_1 = require("./modules/websocket");
var app = (0, express_1.default)();
app.use(express_1.default.static((0, path_1.join)(__dirname, '..', 'public', 'public')));
var server = app.listen(6969, '0.0.0.0', function () {
    console.log("Webserver up!");
});
var wss = new ws_1.default.Server({ server: server, maxPayload: 1 * 1024 });
wss.on('listening', function () {
    console.log("Websocket server up!");
});
wss.on('connection', function (socket, req) {
    socket.binaryType = "arraybuffer";
    console.log(req.socket.remoteAddress + " connected!");
    socket.on('close', function () {
        console.log(req.socket.remoteAddress + " disconnected!");
    });
    (0, websocket_1.sendInitMessage)(socket);
    console.log("Sent init message to " + req.socket.remoteAddress);
    socket.on('message', function (data) {
        var _a = (0, websocket_1.decode)(data), type = _a[0], username = _a[1];
        if (type == websocket_1.MESSAGE_TYPE.INIT) {
            console.log("Got INIT from " + req.socket.remoteAddress + " (" + username + ")");
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBOEI7QUFDOUIsMENBQW9CO0FBQ3BCLDZCQUF5QjtBQUN6QixpREFBMEU7QUFFMUUsSUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbkUsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFNLEdBQUcsR0FBRyxJQUFJLFlBQUUsQ0FBQyxNQUFNLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFDLENBQUMsQ0FBQztBQUVsRSxHQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRTtJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQU0sRUFBRSxHQUFHO0lBQzdCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLGdCQUFhLENBQUMsQ0FBQztJQUV0RCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLG1CQUFnQixDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFBLDJCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFlLENBQUMsQ0FBQztJQUVoRSxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFBLElBQUk7UUFDZixJQUFBLEtBQW1CLElBQUEsa0JBQU0sRUFBRSxJQUFvQixDQUFDLEVBQS9DLElBQUksUUFBQSxFQUFFLFFBQVEsUUFBaUMsQ0FBQztRQUV2RCxJQUFHLElBQUksSUFBSSx3QkFBWSxDQUFDLElBQUksRUFBRTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsVUFBSyxRQUFRLE1BQUcsQ0FBQyxDQUFDO1NBQzFFO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgd3MgZnJvbSAnd3MnO1xyXG5pbXBvcnQge2pvaW59IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7c2VuZEluaXRNZXNzYWdlLCBkZWNvZGUsIE1FU1NBR0VfVFlQRX0gZnJvbSAnLi9tb2R1bGVzL3dlYnNvY2tldCc7XHJcblxyXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XHJcblxyXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKGpvaW4oX19kaXJuYW1lLCAnLi4nLCAncHVibGljJywgJ3B1YmxpYycpKSk7XHJcblxyXG5jb25zdCBzZXJ2ZXIgPSBhcHAubGlzdGVuKDY5NjksICcwLjAuMC4wJywgKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJXZWJzZXJ2ZXIgdXAhXCIpO1xyXG59KTtcclxuXHJcbmNvbnN0IHdzcyA9IG5ldyB3cy5TZXJ2ZXIoe3NlcnZlcjogc2VydmVyLCBtYXhQYXlsb2FkOiAxICogMTAyNH0pO1xyXG5cclxud3NzLm9uKCdsaXN0ZW5pbmcnLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIldlYnNvY2tldCBzZXJ2ZXIgdXAhXCIpO1xyXG59KTtcclxuXHJcbndzcy5vbignY29ubmVjdGlvbicsIChzb2NrZXQsIHJlcSkgPT4ge1xyXG4gICAgc29ja2V0LmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICBcclxuICAgIGNvbnNvbGUubG9nKGAke3JlcS5zb2NrZXQucmVtb3RlQWRkcmVzc30gY29ubmVjdGVkIWApO1xyXG5cclxuICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYCR7cmVxLnNvY2tldC5yZW1vdGVBZGRyZXNzfSBkaXNjb25uZWN0ZWQhYCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzZW5kSW5pdE1lc3NhZ2Uoc29ja2V0KTtcclxuICAgIGNvbnNvbGUubG9nKGBTZW50IGluaXQgbWVzc2FnZSB0byAke3JlcS5zb2NrZXQucmVtb3RlQWRkcmVzc31gKTtcclxuXHJcbiAgICBzb2NrZXQub24oJ21lc3NhZ2UnLCBkYXRhID0+IHtcclxuICAgICAgICBjb25zdCBbdHlwZSwgdXNlcm5hbWVdID0gZGVjb2RlKChkYXRhIGFzIEFycmF5QnVmZmVyKSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGUgPT0gTUVTU0FHRV9UWVBFLklOSVQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYEdvdCBJTklUIGZyb20gJHtyZXEuc29ja2V0LnJlbW90ZUFkZHJlc3N9ICgke3VzZXJuYW1lfSlgKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7Il19