import Render from "./render/Render";
import Cube from "./render/Cube";
import * as ThreeJs from "three";
import Config from "./Config";
import Camera from "./render/Camera";
import Rotation from "./render/animation/Rotation";
import {Vector3} from "three";

export default class Game {
    constructor() {
        this.camera = new Camera();
        this.render = new Render(this.camera);
        this.clock = new ThreeJs.Clock();
        this.deltaTime = 0;
        this.frameRate = 1 / Config.render.frameRate;

        this.initField();

        document.body.addEventListener('keydown', e => this.handleInput(e));
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
        this.field.forEach(cube => {
            this.render.pushToRender(cube);
        });

        const delta = this.clock.getDelta();
        this.deltaTime += delta;

        if (this.deltaTime > this.frameRate) {
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