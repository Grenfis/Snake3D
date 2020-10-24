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

        this.light = new ThreeJs.DirectionalLight(0xffffff, .5);
        this.sky = new ThreeJs.AmbientLight(0xffffff, 3);

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = Config.render.camera.zPosition;
    }

    render() {
        this.light.position.copy(this.camera.position);

        const scene = new ThreeJs.Scene();
        scene.add(this.light);
        scene.add(this.light.target);
        scene.add(this.sky);
        this.renderQueue.forEach(obj => scene.add(obj.getMesh()));

        this.renderer.render(scene, this.camera);
        this.renderQueue = [];
    }

    pushToRender(object) {
        this.renderQueue.push(object);
    }
}