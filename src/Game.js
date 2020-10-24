import Render from "./render/Render";
import Cube from "./render/Cube";

export default class Game {
    constructor() {
        this.render = new Render();
        this.run = true;

        this.initField();
    }

    initField() {
        this.field = [
            new Cube(-1, -1, 1), new Cube(0, -1, 1), new Cube(1, -1, 1),
            new Cube(-1, 0, 1), new Cube(0, 0, 1), new Cube(1, 0, 1),
            new Cube(-1, 1, 1), new Cube(0, 1, 1), new Cube(1, 1, 1),
            new Cube(-1, 1, 0), new Cube(0, 1, 0), new Cube(1, 1, 0),
            new Cube(-1, 1, -1), new Cube(0, 1, -1), new Cube(1, 1, -1),
            new Cube(-1, 0, -1), new Cube(0, 0, -1), new Cube(1, 0, -1),
            new Cube(-1, -1, -1), new Cube(0, -1, -1), new Cube(1, -1, -1),
            new Cube(-1, -1, 0), new Cube(0, -1, 0), new Cube(1, -1, 0),
            new Cube(-1, 0, 0), new Cube(1, 0, 0),
        ];
    }

    tick() {
        if (!this.run) {
            return;
        }

        this.field.forEach(cube => {
            this.render.pushToRender(cube);
        });
        this.render.render();
        window.requestAnimationFrame(() => this.tick());
    }
}