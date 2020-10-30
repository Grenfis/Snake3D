import Animation from "./Animation";
import {Vector3, MathUtils, Quaternion} from "three";

export default class Rotation extends Animation {
    /**
     *
     * @param {object} object
     * @param {Vector3} direction
     * @param {number} angle
     * @param {number} speed
     * @param {function} cb on complete
     */
    constructor(object, direction, angle, speed = 1, cb = null) {
        super(cb);

        this.object = object;
        this.direction = direction;
        this.sign = angle >= 0 ? 1 : -1;
        this.totalAngle = Math.abs(angle);
        this.speed = speed;
    }

    /**
     *
     * @param {number} dt
     */
    tickImplementation(dt) {
        const step = this.speed;
        this.object.rotateOnAxis(this.direction, MathUtils.degToRad( this.sign * step));
        this.totalAngle -= step;
        if (this.totalAngle <= 0) {
            // откручиваем лишнее
            this.animationComplete();
        }
    }
}