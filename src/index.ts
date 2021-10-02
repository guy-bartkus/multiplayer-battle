import express from 'express';
import {join} from 'path'
import {init} from './modules/websocket';

const app = express();

app.use(express.static(join(__dirname, '..', 'public', 'public')));

const server = app.listen(6969, '0.0.0.0', () => {
    console.log("Webserver up!");
});

init(server);

setInterval(() => {
    
}, 50);