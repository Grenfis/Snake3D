import Render from "./render/Render";
import * as ThreeJs from "three";
import Config from "./Config";
import Camera from "./render/Camera";
import Rotation from "./render/animation/Rotation";
import {Vector3} from "three";
import Player from "./Player";
import DrawableFactory from "./render/DrawableFactory";

export default class Game {
    constructor() {
        this.camera = new Camera();
        this.render = new Render(this.camera);
        this.clock = new ThreeJs.Clock();
        this.deltaTime = 0;
        this.frameRate = 1 / Config.render.frameRate;
        this.drawableFactory = new DrawableFactory();
        this.player = new Player(this.drawableFactory);

        this.initField();

        document.body.addEventListener('keydown', e => this.handleInput(e));
    }

    initField() {
        this.field = [
            this.drawableFactory.getFieldBox(-1, -1, 1), this.drawableFactory.getFieldBox(0, -1, 1), 
            this.drawableFactory.getFieldBox(1, -1, 1), this.drawableFactory.getFieldBox(-1, 0, 1),
            this.drawableFactory.getFieldBox(0, 0, 1), this.drawableFactory.getFieldBox(1, 0, 1),
            this.drawableFactory.getFieldBox(-1, 1, 1), this.drawableFactory.getFieldBox(0, 1, 1),
            this.drawableFactory.getFieldBox(1, 1, 1), this.drawableFactory.getFieldBox(-1, 1, 0),
            this.drawableFactory.getFieldBox(0, 1, 0), this.drawableFactory.getFieldBox(1, 1, 0),
            this.drawableFactory.getFieldBox(-1, 1, -1), this.drawableFactory.getFieldBox(0, 1, -1),
            this.drawableFactory.getFieldBox(1, 1, -1), this.drawableFactory.getFieldBox(-1, 0, -1),
            this.drawableFactory.getFieldBox(0, 0, -1), this.drawableFactory.getFieldBox(1, 0, -1),
            this.drawableFactory.getFieldBox(-1, -1, -1), this.drawableFactory.getFieldBox(0, -1, -1),
            this.drawableFactory.getFieldBox(1, -1, -1), this.drawableFactory.getFieldBox(-1, -1, 0),
            this.drawableFactory.getFieldBox(0, -1, 0), this.drawableFactory.getFieldBox(1, -1, 0),
            this.drawableFactory.getFieldBox(-1, 0, 0), this.drawableFactory.getFieldBox(1, 0, 0),
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
            this.player.update();

            this.render.render(delta);
            this.deltaTime = this.deltaTime % this.frameRate;
        }
        window.requestAnimationFrame(() => this.tick());
    }

    handleInput(e) {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
           //this.rotateCamera(e.key);
           this.player.handleInput(e.key);
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
                Config.render.camera.speed,
            )).onComplete(() => {
                this.camera.setPlayingAnimation(false);
            })
        );
    }
}