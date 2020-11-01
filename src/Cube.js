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
     */
    constructor(data) {

        this.geometry = new ThreeJs.BoxGeometry(
            data.w, data.w, data.w
        );
        this.material = new ThreeJs.MeshPhongMaterial({
            map: data.texture,
        });
        this.position = new Vector3(
            data.x * (Config.world.block + Config.world.gap),
            data.y * (Config.world.block + Config.world.gap),
            data.z * (Config.world.block + Config.world.gap)
        );
        this.mesh = null;

        this.createMesh();
    }

    /**
     * Следует вызывать в конце конструктора имплементации
     * @returns {null|Mesh<*, *>}
     */
    createMesh() {
        const mesh = new ThreeJs.Mesh(this.geometry, this.material);
        mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh = mesh;
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

    /**
     * @param {Cube} obj объект с которым произошла коллизия
     */
    onCollision(obj) {
    }

    /**
     * @return {Vector3 | null}
     */
    getPhysicsPosition() {
        return null;
    }
}