import Render from "./render/Render";
import * as ThreeJs from "three";
import Config from "./Config";
import Camera from "./render/Camera";
import Player from "./Player";
import ObjectFactory from "./ObjectFactory";
import Collider from "./Collider";
import {Vector3} from "three";
import {SIDES_AXES} from "./Constants";

export default class Game {
    constructor() {
        this.camera = new Camera();
        this.render = new Render(this.camera);
        this.clock = new ThreeJs.Clock();
        this.deltaTime = 0;
        this.frameRate = 1 / Config.render.frameRate;
        this.objectFactory = new ObjectFactory();
        this.player = new Player(this);
        this.collider = new Collider();
        this.objects = [];
        this.run = false; // статус состояния игры (запущена, окончена)

        this.initField();
        this.addApple();

        document.body.addEventListener('keydown', e => this.handleInput(e));
    }

    initField() {
        this.field = [
            this.objectFactory.getFieldBox(-1, -1, 1), this.objectFactory.getFieldBox(0, -1, 1),
            this.objectFactory.getFieldBox(1, -1, 1), this.objectFactory.getFieldBox(-1, 0, 1),
            this.objectFactory.getFieldBox(0, 0, 1), this.objectFactory.getFieldBox(1, 0, 1),
            this.objectFactory.getFieldBox(-1, 1, 1), this.objectFactory.getFieldBox(0, 1, 1),
            this.objectFactory.getFieldBox(1, 1, 1), this.objectFactory.getFieldBox(-1, 1, 0),
            this.objectFactory.getFieldBox(0, 1, 0), this.objectFactory.getFieldBox(1, 1, 0),
            this.objectFactory.getFieldBox(-1, 1, -1), this.objectFactory.getFieldBox(0, 1, -1),
            this.objectFactory.getFieldBox(1, 1, -1), this.objectFactory.getFieldBox(-1, 0, -1),
            this.objectFactory.getFieldBox(0, 0, -1), this.objectFactory.getFieldBox(1, 0, -1),
            this.objectFactory.getFieldBox(-1, -1, -1), this.objectFactory.getFieldBox(0, -1, -1),
            this.objectFactory.getFieldBox(1, -1, -1), this.objectFactory.getFieldBox(-1, -1, 0),
            this.objectFactory.getFieldBox(0, -1, 0), this.objectFactory.getFieldBox(1, -1, 0),
            this.objectFactory.getFieldBox(-1, 0, 0), this.objectFactory.getFieldBox(1, 0, 0),
        ];
    }

    /**
     * Основной цикл игры
     */
    tick() {
        const delta = this.clock.getDelta();
        this.deltaTime += delta;

        if (this.deltaTime > this.frameRate) {
            this.field.forEach(cube => {
                this.render.pushToRender(cube);
            });

            this.player.draw(this.render);
            if (this.run) {
                this.player.update();
                this.collider.checkCollisions([
                    ...this.player.getBodyParts(),
                    ...this.objects,
                ]);
            }

            this.objects.forEach(obj => {
                this.render.pushToRender(obj);
            });

            this.render.render(delta);
            this.deltaTime = this.deltaTime % this.frameRate;
        }
        window.requestAnimationFrame(() => this.tick());
    }

    /**
     * Добавляет яблоко на игровое поле, туда где нет тела змеи
     */
    addApple() {
        const snake = this.player.getBodyParts();
        const apple = this.objectFactory.getApple(0,0,0);
        let correctPosition = false;
        do {
            const size = Config.world.field.size - 1;
            const x = Math.floor(Math.random() * Config.world.field.size) - Math.floor(size / 2);
            const y = Math.floor(Math.random() * Config.world.field.size) - Math.floor(size / 2);
            const axis = SIDES_AXES[Math.floor(Math.random() * SIDES_AXES.length)]; //выбираем плоскость
            const pos = new Vector3(0,0,0);

            pos[axis[0]] = x;
            pos[axis[1]] = y;
            pos[axis[2]] = size;

            correctPosition = snake.every(bodyPart => {
                const p = bodyPart.getPosition();
                return !this.collider.checkCollision(pos, p);
            });

            apple.setPosition(pos.x, pos.y, pos.z);
        } while(!correctPosition);
        this.objects.push(apple);
    }

    /**
     * @param {Cube} obj
     */
    removeObject(obj) {
        const idx = this.objects.findIndex(o => obj === o);
        if (idx >= 0) {
            this.objects.splice(idx, 1);
        }
    }

    /**
     * Обработка ввода пользователя
     * @param e
     */
    handleInput(e) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.player.handleInput(e.key);
        }
        if (e.key === 'Escape') {
            this.runGame();
        }
    }

    /**
     * Запускает игру
     */
    runGame() {
        if (this.run) {
            return;
        }

        document.querySelector('.new-game').style.cssText = 'display: none;';
        this.run = true;
        this.objects.splice(0, this.objects.length);
        this.addApple();
    }

    gameOver() {
        this.run = false;
        document.querySelector('.new-game').style.cssText = 'display: block;';
    }
}