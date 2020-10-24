import * as ThreeJs from "three";
import Drawable from "./Drawable";
import {Vector3} from "three";

export default class Cube extends Drawable {
    constructor() {
        super();

        this.geometry = new ThreeJs.BoxGeometry(10,10,10);
        this.material = new ThreeJs.MeshBasicMaterial({color: 0x00ff00});
        this.position = new Vector3(0, 0, 0);
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