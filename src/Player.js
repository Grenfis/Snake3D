import DrawableFactory from "./render/DrawableFactory";
import {Vector3} from "three";
import {throttle} from "throttle-debounce";
import Config from "./Config";

const SIDES = Object.freeze({
    SIDE_1: 0,
    SIDE_2: 1,
    SIDE_3: 2,
    SIDE_4: 3,
    SIDE_5: 4,
    SIDE_6: 5,
});

const DIRECTIONS = Object.freeze({
    [SIDES.SIDE_1]: {
        up: new Vector3(0, 1, 0),
        down: new Vector3(0, -1, 0),
        left: new Vector3(-1, 0, 0),
        right: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_2]: {
        up: new Vector3(0, 0, -1),
        down: new Vector3(0, 0, 1),
        left: new Vector3(-1, 0, 0),
        right: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_3]: {
        up: new Vector3(0, -1, 0),
        down: new Vector3(0, 1, 0),
        left: new Vector3(-1, 0, 0),
        right: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_4]: {
        up: new Vector3(0, 0, 1),
        down: new Vector3(0, 0, -1),
        left: new Vector3(-1, 0, 0),
        right: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_5]: {
        up: new Vector3(0, 0, 1),
        down: new Vector3(0, 0, -1),
        left: new Vector3(0, -1, 0),
        right: new Vector3(0, 1, 0),
    },
    [SIDES.SIDE_6]: {
        up: new Vector3(0, 0, 1),
        down: new Vector3(0, 0, -1),
        left: new Vector3(0, 1, 0),
        right: new Vector3(0, -1, 0),
    },
});

const RELATIONS = Object.freeze({
    [SIDES.SIDE_1]: {
        up: SIDES.SIDE_2,
        down: SIDES.SIDE_4,
        left: SIDES.SIDE_6,
        right: SIDES.SIDE_5,
    },
    [SIDES.SIDE_2]: {
        up: SIDES.SIDE_3,
        down: SIDES.SIDE_1,
        left: SIDES.SIDE_6,
        right: SIDES.SIDE_5,
    },
    [SIDES.SIDE_3]: {
        up: SIDES.SIDE_4,
        down: SIDES.SIDE_2,
        left: SIDES.SIDE_6,
        right: SIDES.SIDE_5,
    },
    [SIDES.SIDE_4]: {
        up: SIDES.SIDE_1,
        down: SIDES.SIDE_3,
        left: SIDES.SIDE_6,
        right: SIDES.SIDE_5,
    },
    [SIDES.SIDE_5]: {
        up: SIDES.SIDE_2,
        down: SIDES.SIDE_4,
        left: SIDES.SIDE_3,
        right: SIDES.SIDE_1,
    },
    [SIDES.SIDE_6]: {
        up: SIDES.SIDE_2,
        down: SIDES.SIDE_4,
        left: SIDES.SIDE_1,
        right: SIDES.SIDE_3,
    },
});

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
        this.firstRun = true; //является ли итерация перемещения первой в игре
        this.side = SIDES.SIDE_1;
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
                    // пропускаем первую итерацию перемещения
                    if (this.firstRun) {
                        this.firstRun = false;
                        return;
                    }
                   this.applyMovement();
                }
            );
        }
        this.updateFunction();
    }

    applyMovement() {
        const bound = Config.world.field.size - 1;
        const position = this.body[0].position;

        const axesY = DIRECTIONS[this.side].up.y !== 0 ? 'y' : 'z'; // название оси по вертикали
        const axesX = DIRECTIONS[this.side].left.y !== 0 ? 'y' : 'x'; // название оси по горизонтали

        if (Math.abs(position[axesX]) >= bound) {
            //todo: поворот по горизонтали
            return;
        }

        if (Math.abs(position[axesY]) >= bound) {
            //todo: поворот по вертикали
            return;
        }

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