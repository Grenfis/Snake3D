import DrawableFactory from "./render/DrawableFactory";
import {Vector3} from "three";
import {throttle} from "throttle-debounce";
import Config from "./Config";
import Camera from "./render/Camera";
import Render from "./render/Render";
import Rotation from "./render/animation/Rotation";

const DIRECTION = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
});

const DIRECTIONS = Object.freeze({
    [DIRECTION.UP]: new Vector3(0, 1, 0),
    [DIRECTION.DOWN]: new Vector3(0, -1, 0),
    [DIRECTION.LEFT]: new Vector3(-1, 0, 0),
    [DIRECTION.RIGHT]: new Vector3(1, 0, 0),
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
        this.head = this.drawableFactory.getSnakeHead(0, 0, 2);
        this.body = [];
        this.firstRun = true; //является ли итерация перемещения первой в игре
        this.direction = DIRECTION.RIGHT;
        this.render = render;
        this.camera = camera;

        this.camera.getPivot().add(this.head.getMesh());
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
        const localPosition = this.head.getMesh().position;
        let position = localPosition.clone();
        this.camera.getPivot().localToWorld(position);
        //убираем погрешности вычислений
        position = new Vector3(
            Math.floor(position.x),
            Math.floor(position.y),
            Math.floor(position.z)
        );

        this.head.move(DIRECTIONS[this.direction]);

        if (Math.abs(localPosition.x) >= bound || Math.abs(localPosition.y) >= bound) {
            this.rotateCamera(this.direction);
            const dir = DIRECTIONS[this.direction];
            const axis = dir.x === 0 ? 'y' : 'x';
            this.head.getMesh().position[axis] = dir[axis] > 0 ? -1 : 1;
        }
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