import Entity from './entity';
import {Vec2} from './math';

export default class Player extends Entity {
    name: string;
    id: number;

    static players: Map<number, Player> = new Map(); //id: Player

    constructor(id: number, name: string = "", position: Vec2 = new Vec2()) {
        super(position);

        this.name = name;
        this.id = id;

        Player.players.set(id, this);
    }

    removePlayer() {
        Player.players.delete(this.id);
    }
}