import * as ThreeJs from "three";

export default class Render {
    constructor(camera) {
        this.renderer = new ThreeJs.WebGLRenderer();
        this.camera = camera;
        this.axesHelper = new ThreeJs.AxesHelper( 5 );

        this.renderQueue = [];
        this.animationQueue = [];

        this.sky = new ThreeJs.AmbientLight(0xffffff, 0.6);

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
        const scene = new ThreeJs.Scene();

        scene.add(this.sky);
        scene.add(this.camera.getPivot());
        scene.add(this.axesHelper);

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