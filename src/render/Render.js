import * as ThreeJs from "three";
import Config from "../Config";

export default class Render {
    constructor() {
        this.camera = new ThreeJs.PerspectiveCamera(
            Config.render.fov,
            Config.render.aspect,
            Config.render.viewport.near,
            Config.render.viewport.far);
        this.renderer = new ThreeJs.WebGLRenderer();
        this.renderQueue = [];

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = Config.render.camera.zPosition;
    }

    render() {
        const scene = new ThreeJs.Scene();
        this.renderQueue.forEach(obj => scene.add(obj.getMesh()));
        this.renderer.render(scene, this.camera);
        this.renderQueue = [];
    }

    pushToRender(object) {
        this.renderQueue.push(object);
    }
}