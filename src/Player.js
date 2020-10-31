import DrawableFactory from "./render/DrawableFactory";
import {Vector3} from "three";
import {throttle} from "throttle-debounce";
import Config from "./Config";

export default class Player {
    /**
     *
     * @param {DrawableFactory} drawableFactory
     */
    constructor(drawableFactory) {
        this.drawableFactory = drawableFactory;
        this.body = [
            this.drawableFactory.getSnakeHead(0, 0, 2),
        ];
        this.direction = new Vector3(1, 0, 0);
    }

    draw(render) {
        this.body.forEach(bodyPart => {
            render.pushToRender(bodyPart);
        });
    }

    update() {
        if (!this.updateFunction) {
            this.updateFunction = throttle(
                Config.game.snake.speed,
                () => {
                    this.applyMovement();
                }
            );
        }
        this.updateFunction();
    }

    applyMovement() {
        this.body.forEach(bodyPart => {
            bodyPart.move(this.direction);
        });
    }

    /**
     *
     * @param {String} key
     */
    handleInput(key) {
        switch (key) {
            case 'ArrowUp':
                this.direction = new Vector3(0, 1, 0);
                break;
            case 'ArrowDown':
                this.direction = new Vector3(0, -1, 0);
                break;
            case 'ArrowLeft':
                this.direction = new Vector3(-1, 0, 0);
                break;
            case 'ArrowRight':
                this.direction = new Vector3(1, 0, 0);
                break;
        }
    }
}