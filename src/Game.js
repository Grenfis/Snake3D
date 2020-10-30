import Render from "./render/Render";
import * as ThreeJs from "three";
import Config from "./Config";
import Camera from "./render/Camera";
import Rotation from "./render/animation/Rotation";
import {Vector3} from "three";
import DrawableFactory from "./render/DrawableFactory";
import Player from "./Player";

export default class Game {
    constructor() {
        this.camera = new Camera();
        this.render = new Render(this.camera);
        this.clock = new ThreeJs.Clock();
        this.deltaTime = 0;
        this.frameRate = 1 / Config.render.frameRate;
        this.player = new Player();

        this.initField();

        document.body.addEventListener('keydown', e => this.handleInput(e));
    }

    initField() {
        const factory = new DrawableFactory();
        this.field = [
            factory.getFieldBox(-1, -1, 1), factory.getFieldBox(0, -1, 1), 
            factory.getFieldBox(1, -1, 1), factory.getFieldBox(-1, 0, 1),
            factory.getFieldBox(0, 0, 1), factory.getFieldBox(1, 0, 1),
            factory.getFieldBox(-1, 1, 1), factory.getFieldBox(0, 1, 1),
            factory.getFieldBox(1, 1, 1), factory.getFieldBox(-1, 1, 0),
            factory.getFieldBox(0, 1, 0), factory.getFieldBox(1, 1, 0),
            factory.getFieldBox(-1, 1, -1), factory.getFieldBox(0, 1, -1),
            factory.getFieldBox(1, 1, -1), factory.getFieldBox(-1, 0, -1),
            factory.getFieldBox(0, 0, -1), factory.getFieldBox(1, 0, -1),
            factory.getFieldBox(-1, -1, -1), factory.getFieldBox(0, -1, -1),
            factory.getFieldBox(1, -1, -1), factory.getFieldBox(-1, -1, 0),
            factory.getFieldBox(0, -1, 0), factory.getFieldBox(1, -1, 0),
            factory.getFieldBox(-1, 0, 0), factory.getFieldBox(1, 0, 0),
        ];
    }

    tick() {
        const delta = this.clock.getDelta();
        this.deltaTime += delta;

        if (this.deltaTime > this.frameRate) {
            this.field.forEach(cube => {
                this.render.pushToRender(cube);
            });

            this.player.draw(this.render);

            this.render.render(delta);
            this.deltaTime = this.deltaTime % this.frameRate;
        }
        window.requestAnimationFrame(() => this.tick());
    }

    handleInput(e) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.rotateCamera(e.key);
        }
    }

    rotateCamera(key) {
        if (this.camera.isPlayingAnimation()) {
            return;
        }

        let angle = 0;
        let dir = null;

        switch (key) {
            case 'ArrowUp':
                dir = new Vector3(1, 0, 0);
                angle = -90;
                break;
            case 'ArrowDown':
                dir = new Vector3(1, 0, 0);
                angle = 90;
                break;
            case 'ArrowLeft':
                dir = new Vector3(0, 1, 0);
                angle = -90;
                break;
            case 'ArrowRight':
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
            )).onComplete(() => {
                this.camera.setPlayingAnimation(false);
            })
        );
    }
}