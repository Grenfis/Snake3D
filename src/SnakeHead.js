import Cube from "./Cube";

export default class SnakeHead extends Cube {
    /**
     *
     * @param {Object} data
     * @param {Camera} camera
     */
    constructor(data, camera) {
        super(data);
        this.camera = camera;
    }

    /**
     * Переопределение Cube.getPosition, тк голова в другой системе координат
     * @return {Vector3}
     */
    getPosition() {
        const localPosition = this.mesh.position;
        let position = localPosition.clone();
        this.camera.getPivot().localToWorld(position);

        return position;
    }
}