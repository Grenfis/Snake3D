import Config from "../Config";
import * as ThreeJs from "three";

export default class Camera {
    constructor() {
        this.camera = new ThreeJs.PerspectiveCamera(
            Config.render.fov,
            Config.render.aspect,
            Config.render.viewport.near,
            Config.render.viewport.far);
        this.cameraPivot = new ThreeJs.Object3D();
        this.cameraPivot.add(this.camera);
        this.playingAnimation = false;

        this.camera.position.z = Config.render.camera.zPosition;
        this.camera.rotation.order = "YXZ"
    }

    getCamera() {
        return this.camera;
    }

    getPivot() {
        return this.cameraPivot;
    }

    isPlayingAnimation() {
        return this.playingAnimation;
    }

    setPlayingAnimation(status) {
        this.playingAnimation = status;
    }
}