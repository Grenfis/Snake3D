import * as ThreeJs from "three";
import Drawable from "./Drawable";
import {Vector3, Texture} from "three";
import Config from "../Config";

export default class Cube extends Drawable {
    /**
     * Координаты, выравненые на сетку
     * @param {Number} data.x
     * @param {Number} data.y
     * @param {Number} data.z
     * @param {Number} data.w
     * @param {Texture} data.texture
     */
    constructor(data) {
        super();

        this.geometry = new ThreeJs.BoxGeometry(
            data.w,data.w,data.w
        );
        this.material = new ThreeJs.MeshPhongMaterial({
            map: data.texture,
        });
        this.position = new Vector3(
            data.x * (Config.world.block + Config.world.gap / 2),
            data.y * (Config.world.block + Config.world.gap / 2),
            data.z * (Config.world.block + Config.world.gap / 2)
        );
    }

    getGeometry() {
        return this.geometry;
    }

    getMaterial() {
        return this.material;
    }

    getPosition() {
        return this.position;
    }

    setPosition(x, y, z) {
        this.position.set(x, y, z);
    }
}