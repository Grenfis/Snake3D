import Cube from "./Cube";

export default class SnakeHead extends Cube {
    constructor(data, camera) {
        super(data);
        this.camera = camera;
    }

    getPosition() {
        const localPosition = this.mesh.position;
        let position = localPosition.clone();
        this.camera.getPivot().localToWorld(position);

        return position;
    }
}