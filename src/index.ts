import express from 'express';
import {join} from 'path';
import {init} from './modules/websocket';
import {Server} from 'http';

const app = express();

app.use(express.static(join(__dirname, '..', 'public', 'public')));

const test: number | undefined = 5;

let server: Server;

if (process.env.NODE_ENV === 'production') {
    server = app.listen(process.env.PORT, () => {
		console.log("Webserver up!");
	});
} else {
	server = app.listen(6969, '0.0.0.0', () => {
		console.log("Webserver up!");
	});
}

init(server);

setInterval(() => {

}, 50);