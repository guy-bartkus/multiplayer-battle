import Entity from './entity';
import {Vec2} from './math';
import {WebSocket} from 'ws';

export default class Player extends Entity {
    name: string;
    id: number = -1;
    socket: WebSocket;
    inList: boolean = false;

    static players: Map<number, Player> = new Map(); //id: Player
    static reusableIDs: number[] = []; //When player leaves, add their id to list of usable ids

    constructor(socket: WebSocket, name: string = "Unnamed", position: Vec2 = new Vec2()) {
        super(position);

        this.socket = socket;
        this.name = name;
    }

    addToList() {
        if(Player.reusableIDs.length > 0) { //Are there any reusable IDs available? If so, use that ID for this new player and remove from reusable IDs list.
            this.id = Player.reusableIDs[0];
            Player.reusableIDs.splice(0, 1);
        } else { //Otherwise make a new ID equal to the size of the players list.
            this.id = Player.players.size;
        }

        Player.players.set(this.id, this);
        this.inList = true;
    }

    removePlayer() {
        Player.reusableIDs.push(this.id);
        Player.players.delete(this.id);
    }

    static broadcastMessage(payload: ArrayBuffer) {
        let value = Player.players.values().next();

        while(!value.done) {
            const player = value.value;

            player.socket.send(payload);

            console.log(`Broadcast to ${player.name}`);

            value = Player.players.values().next();
        }

        console.log("Broadcast the message to all players!");
    }
}