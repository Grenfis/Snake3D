import * as ThreeJs from "three";
import Config from "../Config";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default class Render {
    constructor() {
        this.camera = new ThreeJs.PerspectiveCamera(
            Config.render.fov,
            Config.render.aspect,
            Config.render.viewport.near,
            Config.render.viewport.far);
        this.renderer = new ThreeJs.WebGLRenderer();
        this.renderQueue = [];
        this.gridHelper = new ThreeJs.GridHelper(100, 10);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.light = new ThreeJs.DirectionalLight(0xffffff, 1);
        this.sky = new ThreeJs.AmbientLight(0xffffff, 2);

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.camera.position.z = Config.render.camera.zPosition;
    }

    render() {
        this.light.position.set(
            this.camera.position.x,
            this.camera.position.y,
            this.camera.position.z
        );

        const scene = new ThreeJs.Scene();
        scene.add(this.gridHelper);
        scene.add(this.light);
        scene.add(this.light.target);
        scene.add(this.sky);
        this.renderQueue.forEach(obj => scene.add(obj.getMesh()));

        this.controls.update();
        this.renderer.render(scene, this.camera);
        this.renderQueue = [];
    }

    pushToRender(object) {
        this.renderQueue.push(object);
    }
}