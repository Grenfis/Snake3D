import Cube from "./Cube";
import Config from "./Config";
import {Vector3} from "three";

export default class Collider {
    /**
     *
     * @param {Cube[]} objects
     */
    checkCollisions(objects) {
        for (let i = 0; i < (objects.length - 1); i++) {
            for (let j = i + 1; j < (objects.length); j++) {
                const objectA = objects[i];
                const objectB = objects[j];
                if (this.checkCollision(objectA.getPosition(), objectB.getPosition())) {
                    objectA.onCollision(objectB);
                    objectB.onCollision(objectA);
                }
            }
        }
    }

    /**
     * @param {Vector3} pB
     * @param {Vector3} pA
     * @return {boolean}
     */
    checkCollision(pA, pB) {
        const dist = Math.sqrt(
            Math.pow(pA.x - pB.x, 2) +
            Math.pow(pA.y - pB.y, 2) +
            Math.pow(pA.z - pB.z, 2)
        );
        return dist <= Config.game.collisions.minDistance;
    }
}