import DrawableFactory from "./render/DrawableFactory";
import {Vector3} from "three";
import {throttle} from "throttle-debounce";
import Config from "./Config";
import Camera from "./render/Camera";
import Render from "./render/Render";
import Rotation from "./render/animation/Rotation";

const SIDES = Object.freeze({
    SIDE_1: 0,
    SIDE_2: 1,
    SIDE_3: 2,
    SIDE_4: 3,
    SIDE_5: 4,
    SIDE_6: 5,
});

const DIRECTION = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
})

const DIRECTIONS = Object.freeze({
    [SIDES.SIDE_1]: {
        [DIRECTION.UP]: new Vector3(0, 1, 0),
        [DIRECTION.DOWN]: new Vector3(0, -1, 0),
        [DIRECTION.LEFT]: new Vector3(-1, 0, 0),
        [DIRECTION.RIGHT]: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_2]: {
        [DIRECTION.UP]: new Vector3(0, 0, -1),
        [DIRECTION.DOWN]: new Vector3(0, 0, 1),
        [DIRECTION.LEFT]: new Vector3(-1, 0, 0),
        [DIRECTION.RIGHT]: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_3]: {
        [DIRECTION.UP]: new Vector3(0, -1, 0),
        [DIRECTION.DOWN]: new Vector3(0, 1, 0),
        [DIRECTION.LEFT]: new Vector3(1, 0, 0),
        [DIRECTION.RIGHT]: new Vector3(-1, 0, 0),
    },
    [SIDES.SIDE_4]: {
        [DIRECTION.UP]: new Vector3(0, 0, 1),
        [DIRECTION.DOWN]: new Vector3(0, 0, -1),
        [DIRECTION.LEFT]: new Vector3(-1, 0, 0),
        [DIRECTION.RIGHT]: new Vector3(1, 0, 0),
    },
    [SIDES.SIDE_5]: {
        [DIRECTION.UP]: new Vector3(0, 1, 0),
        [DIRECTION.DOWN]: new Vector3(0, -1, 0),
        [DIRECTION.LEFT]: new Vector3(0, 0, 1),
        [DIRECTION.RIGHT]: new Vector3(0, 0, -1),
    },
    [SIDES.SIDE_6]: {
        [DIRECTION.UP]: new Vector3(0, 1, 0),
        [DIRECTION.DOWN]: new Vector3(0, -1, 0),
        [DIRECTION.LEFT]: new Vector3(0, 0, -1),
        [DIRECTION.RIGHT]: new Vector3(0, 0, 1),
    },
});

const RELATIONS = Object.freeze({
    [SIDES.SIDE_1]: {
        [DIRECTION.UP]: SIDES.SIDE_2,
        [DIRECTION.DOWN]: SIDES.SIDE_4,
        [DIRECTION.LEFT]: SIDES.SIDE_6,
        [DIRECTION.RIGHT]: SIDES.SIDE_5,
    },
    [SIDES.SIDE_2]: {
        [DIRECTION.UP]: SIDES.SIDE_3,
        [DIRECTION.DOWN]: SIDES.SIDE_1,
        [DIRECTION.LEFT]: SIDES.SIDE_6,
        [DIRECTION.RIGHT]: SIDES.SIDE_5,
    },
    [SIDES.SIDE_3]: {
        [DIRECTION.UP]: SIDES.SIDE_4,
        [DIRECTION.DOWN]: SIDES.SIDE_2,
        [DIRECTION.LEFT]: SIDES.SIDE_5,
        [DIRECTION.RIGHT]: SIDES.SIDE_6,
    },
    [SIDES.SIDE_4]: {
        [DIRECTION.UP]: SIDES.SIDE_1,
        [DIRECTION.DOWN]: SIDES.SIDE_3,
        [DIRECTION.LEFT]: SIDES.SIDE_6,
        [DIRECTION.RIGHT]: SIDES.SIDE_5,
    },
    [SIDES.SIDE_5]: {
        [DIRECTION.UP]: SIDES.SIDE_2,
        [DIRECTION.DOWN]: SIDES.SIDE_4,
        [DIRECTION.LEFT]: SIDES.SIDE_1,
        [DIRECTION.RIGHT]: SIDES.SIDE_3,
    },
    [SIDES.SIDE_6]: {
        [DIRECTION.UP]: SIDES.SIDE_2,
        [DIRECTION.DOWN]: SIDES.SIDE_4,
        [DIRECTION.LEFT]: SIDES.SIDE_3,
        [DIRECTION.RIGHT]: SIDES.SIDE_1,
    },
});

export default class Player {
    /**
     *
     * @param {DrawableFactory} drawableFactory
     * @param {Render} render
     * @param {Camera} camera
     */
    constructor(drawableFactory, render, camera) {
        this.drawableFactory = drawableFactory;
        this.body = [
            this.drawableFactory.getSnakeHead(0, 0, 2),
        ];
        this.firstRun = true; //является ли итерация перемещения первой в игре
        this.side = SIDES.SIDE_1;
        this.direction = DIRECTION.RIGHT;
        this.face = new Vector3(1, 0, 0);
        this.render = render;
        this.camera = camera;
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

        const axesY = DIRECTIONS[this.side][DIRECTION.UP].y !== 0 ? 'y' :
            DIRECTIONS[this.side][DIRECTION.UP].x !== 0 ?  'x' : 'z'; // название оси по вертикали
        const axesX = DIRECTIONS[this.side][DIRECTION.LEFT].y !== 0 ? 'y' :
            DIRECTIONS[this.side][DIRECTION.LEFT].x !== 0 ? 'x' : 'z'; // название оси по горизонтали

        if (Math.abs(position[axesX]) >= bound || Math.abs(position[axesY]) >= bound) {
            this.rotateCamera(this.direction);
            this.side = RELATIONS[this.side][this.direction];
        }

        this.body.forEach(bodyPart => {
           bodyPart.move(DIRECTIONS[this.side][this.direction]);
        });
    }

    /**
     *
     * @param {String} key
     */
    handleInput(key) {
        switch (key) {
            case 'ArrowUp':
                this.direction = DIRECTION.UP;
                break;
            case 'ArrowDown':
                this.direction = DIRECTION.DOWN;
                break;
            case 'ArrowLeft':
                this.direction = DIRECTION.LEFT;
                break;
            case 'ArrowRight':
                this.direction = DIRECTION.RIGHT;
                break;
        }
    }

    rotateCamera(direction) {
        if (this.camera.isPlayingAnimation()) {
            return;
        }

        let angle = 0;
        let dir = null;

        switch (direction) {
            case DIRECTION.UP:
                dir = new Vector3(1, 0, 0);
                angle = -90;
                break;
            case DIRECTION.DOWN:
                dir = new Vector3(1, 0, 0);
                angle = 90;
                break;
            case DIRECTION.LEFT:
                dir = new Vector3(0, 1, 0);
                angle = -90;
                break;
            case DIRECTION.RIGHT:
                dir = new Vector3(0, 1, 0);
                angle = 90;
                break;
        }
        this.camera.setPlayingAnimation(true);
        this.render.pushAnimation(
            (new Rotation(
                this.camera.getPivot(),
                dir,
                angle,
                Config.render.camera.speed,
            )).onComplete(() => {
                this.camera.setPlayingAnimation(false);
            })
        );
    }
}