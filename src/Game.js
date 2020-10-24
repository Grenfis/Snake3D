import Render from "./render/Render";

export default class Game {
    constructor() {
        this.render = new Render();
        this.run = true;
    }

    tick() {
        if (!this.run) {
            return;
        }

        this.render.render();
        window.requestAnimationFrame(() => this.tick());
    }
}