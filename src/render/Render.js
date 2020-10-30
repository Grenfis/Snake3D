import * as ThreeJs from "three";
import {Vector3} from "three";
import Rotation from "./animation/Rotation";

export default class Render {
    constructor(camera) {
        this.renderer = new ThreeJs.WebGLRenderer();
        this.camera = camera;

        this.renderQueue = [];
        this.animationQueue = [];

        this.light = new ThreeJs.DirectionalLight(0xffffff, .5);
        this.sky = new ThreeJs.AmbientLight(0xffffff, 3);

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    /**
     * Основная функция отрисоввки
     * @param {Number} dt
     */
    render(dt) {
        this.light.position.copy(this.camera.getCamera().position);

        const scene = new ThreeJs.Scene();

        scene.add(this.light);
        scene.add(this.light.target);
        scene.add(this.sky);
        scene.add(this.camera.getPivot());

        this.renderAnimation(dt);

        this.renderQueue.forEach(obj => {
            if (obj instanceof ThreeJs.Object3D) {
                scene.add(obj);
            } else {
                scene.add(obj.getMesh());
            }
        });

        this.renderer.render(scene, this.camera.getCamera());
        this.renderQueue = [];
    }

    renderAnimation(dt) {
        const idxs = [];
        this.animationQueue.forEach((anim, idx) => {
            if (anim.tick(dt)) {
                idxs.push(idx);
            }
        });

        idxs.forEach(idx => {
            this.animationQueue[idx].callOnComplete();
            this.animationQueue.splice(idx, 1);
        });
    }

    pushToRender(object) {
        this.renderQueue.push(object);
    }

    pushAnimation(anim) {
        this.animationQueue.push(anim);
    }
}