import {Vec2} from './math'

export default class {
    position: Vec2;

    constructor(position: Vec2 = new Vec2(0, 0)) {
        this.position = position;
    }
}