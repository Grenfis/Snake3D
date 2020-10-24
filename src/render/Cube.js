import * as ThreeJs from "three";
import Drawable from "./Drawable";
import {Vector3} from "three";
import Config from "../Config";

export default class Cube extends Drawable {
    /**
     * Координаты, выравненые на сетку
     * @param x
     * @param y
     * @param z
     */
    constructor(x = 0, y = 0, z = 0) {
        super();

        this.geometry = new ThreeJs.BoxGeometry(
            Config.world.block.size,
            Config.world.block.size,
            Config.world.block.size
        );
        this.material = new ThreeJs.MeshPhongMaterial({color: 0x101010});
        this.position = new Vector3(
            x * (Config.world.block.size + Config.world.block.gap / 2),
            y * (Config.world.block.size + Config.world.block.gap / 2),
            z * (Config.world.block.size + Config.world.block.gap / 2)
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