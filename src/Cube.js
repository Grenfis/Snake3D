import * as ThreeJs from "three";
import {Vector3, Texture} from "three";
import Config from "./Config";

export default class Cube {
    /**
     * Координаты, выравненые на сетку
     * @param {Number} data.x
     * @param {Number} data.y
     * @param {Number} data.z
     * @param {Number} data.w
     * @param {Texture} data.texture
     * @param {Number} data.id
     */
    constructor(data) {
        this.collisionCB = null;

        const geometry = new ThreeJs.BoxGeometry(
            data.w, data.w, data.w
        );
        const material = new ThreeJs.MeshPhongMaterial({
            map: data.texture,
        });
        const position = new Vector3(
            data.x * (Config.world.block + Config.world.gap),
            data.y * (Config.world.block + Config.world.gap),
            data.z * (Config.world.block + Config.world.gap)
        );

        this.mesh = new ThreeJs.Mesh(geometry, material);
        this.mesh.position.set(position.x, position.y, position.z);
        this.id = data.id;
    }

    /**
     *
     * @return {null | Mesh<*,*>>}
     */
    getMesh() {
        return this.mesh;
    }

    /**
     *
     * @param {Vector3} dir
     */
    move(dir) {
        this.mesh.position.add(dir);
    }

    setOnCollision(cb) {
        this.collisionCB = cb;
    }

    /**
     * @param {Cube} obj объект с которым произошла коллизия
     */
    onCollision(obj) {
        if (typeof this.collisionCB === 'function') {
            this.collisionCB(obj);
        }
    }

    /**
     * @return {Vector3}
     */
    getPosition() {
        return this.mesh.position;
    }
}