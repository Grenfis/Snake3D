import {Vector3} from "three";
import {throttle} from "throttle-debounce";
import Config from "./Config";
import Rotation from "./render/animation/Rotation";
import {DIRECTION, DIRECTIONS, OBJECT_TYPES} from "./Constants";

export default class Player {
    /**
     *
     * @param {Game} game
     */
    constructor(game) {
        this.objectFactory = game.objectFactory;
        this.render = game.render;
        this.camera = game.camera;
        this.game = game;

        this.head = this.objectFactory.getSnakeHead(0, 0, 2, this.camera);
        this.body = [];
        this.nextBodyPart = null; //сюда добавляются части тела в следующем цикле, для предотвращения триггера коллизий
        this.firstRun = true; //является ли итерация перемещения первой в игре
        this.direction = DIRECTION.RIGHT;
        this.score = 0;

        this.camera.getPivot().add(this.head.getMesh());
        this.head.setOnCollision(obj => this.collision(obj));
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

        this.head.move(DIRECTIONS[this.direction]);

        if (Math.abs(localPosition.x) >= bound || Math.abs(localPosition.y) >= bound) {
            this.rotateCamera(this.direction);
            const dir = DIRECTIONS[this.direction];
            const axis = dir.x === 0 ? 'y' : 'x';
            this.head.getMesh().position[axis] = dir[axis] > 0 ? -1 : 1;
        }

        this.body.forEach(bodyPart => {
            const oldPos = bodyPart.getMesh().position.clone();
            bodyPart.getMesh().position.copy(position);
            position = oldPos;
        });
        if (this.nextBodyPart) {
            this.nextBodyPart.getMesh().position.copy(position);
            this.body.push(this.nextBodyPart);
            this.nextBodyPart = null;
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

        let dir = null;
        switch (direction) {
            case DIRECTION.UP:
                dir = new Vector3(-1, 0, 0);
                break;
            case DIRECTION.DOWN:
                dir = new Vector3(1, 0, 0);
                break;
            case DIRECTION.LEFT:
                dir = new Vector3(0, -1, 0);
                break;
            case DIRECTION.RIGHT:
                dir = new Vector3(0, 1, 0);
                break;
        }
        this.camera.setPlayingAnimation(true);
        this.render.pushAnimation(
            (new Rotation(
                this.camera.getPivot(),
                dir,
                90,
                Config.render.camera.speed,
            )).onComplete(() => {
                this.camera.setPlayingAnimation(false);
            })
        );
    }

    /**
     *
     * @return {Cube[]}
     */
    getBodyParts() {
        return [
            this.head,
            ...this.body
        ];
    }

    /**
     *
     * @return {number}
     */
    printScore() {
        document.querySelector('.score-label').innerHTML = this.score;
    }

    collision(obj) {
        switch (obj.getType()) {
            case OBJECT_TYPES.APPLE:
                this.game.removeObject(obj);
                this.game.addApple();
                this.nextBodyPart = this.objectFactory.getSnakeBody(0,0,0);
                this.score += 1;
                break;
            case OBJECT_TYPES.SNAKE_BODY:
                // если пересеклись во время поворота поля
                if (this.camera.isPlayingAnimation()) {
                    return;
                }
                this.body.splice(0, this.body.length);
                this.score = 0;
                break;
        }
        this.printScore();
    }
}