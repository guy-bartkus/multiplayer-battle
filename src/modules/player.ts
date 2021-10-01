import Entity from './entity';
import {Vec2} from './math';
import {WebSocket} from 'ws';

export default class Player extends Entity {
    name: string;
    socket: WebSocket;

    constructor(socket: WebSocket, name: string = "Unnamed", position: Vec2 = new Vec2()) {
        super(position);

        this.socket = socket;
        this.name = name;
    }
}