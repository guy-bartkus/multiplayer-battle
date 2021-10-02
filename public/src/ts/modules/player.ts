import Entity from './entity';
import {Vec2} from './math';

export default class Player extends Entity {
    name: string;
    id: number;

    static players: Player[] = [];

    constructor(name: string = "", position: Vec2 = new Vec2()) {
        super(position);

        this.name = name;
        this.id = Player.players.length;

        Player.players.push(this);
    }

    removePlayer() {
        Player.players.splice(this.id, 1);
    }
}