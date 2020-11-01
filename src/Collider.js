import Cube from "./Cube";
import Config from "./Config";

export default class Collider {
    /**
     *
     * @param {Cube[]} objects
     */
    checkCollisions(objects) {
        const worldInfo = objects.reduce((accum, obj, idx) => {
            accum.push({
                idx,
                position: obj.getPosition(),
            });
            return accum;
        }, []);
        for (let i = 0; i < (worldInfo.length - 1); i++) {
            for (let j = i + 1; j < (worldInfo.length); j++) {
                const pA = worldInfo[i].position;
                const pB = worldInfo[j].position;
                const dist = Math.sqrt(
                    Math.pow(pA.x - pB.x, 2) +
                    Math.pow(pA.y - pB.y, 2) +
                    Math.pow(pA.z - pB.z, 2)
                );
                if (dist <= Config.game.collisions.minDistance) {
                    const a = objects[worldInfo[i].idx];
                    const b = objects[worldInfo[j].idx];
                    a.onCollision(b);
                    b.onCollision(a);
                }
            }
        }
    }
}