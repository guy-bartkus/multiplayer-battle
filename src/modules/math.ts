export class Vec2 {
    x;
    y;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(vec2: Vec2): Vec2 {
        return new Vec2(this.x + vec2.x, this.y + vec2.y);
    }

    sub(vec2: Vec2): Vec2 {
        return new Vec2(this.x - vec2.x, this.y - vec2.y);
    }

    mul(mul: number): Vec2 {
        return new Vec2(this.x * mul, this.y * mul);
    }

    div(vec2: Vec2): Vec2 {
        return new Vec2(this.x / vec2.x, this.y / vec2.y);
    }

    normalize(): Vec2 {
        const m = Math.sqrt(this.x**2 + this.y**2);

        return new Vec2(this.x/m, this.y/m);
    }

    distance(vec2: Vec2): number {
        const lX = Math.abs(this.x - vec2.x);
        const lY = Math.abs(this.y - vec2.y);

        return Math.sqrt(lX**2 + lY**2);
    }
}