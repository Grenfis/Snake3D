import {TextureLoader} from "three";
import Cube from "./Cube";
import Config from "../Config";

export default class DrawableFactory {
    constructor() {
        this.loader = new TextureLoader();
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    getFieldBox(x, y, z) {
        return new Cube({
            x, y, z,
            texture: this.loader.load('/asstes/box.jpg'),
            w: Config.world.block,
        });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    getSnakeBody(x, y, z) {
        return new Cube({
            x, y, z,
            texture: this.loader.load('/asstes/snake_body.jpg'),
            w: Config.world.snake,
        });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    getSnakeHead(x, y, z) {
        return new Cube({
            x, y, z,
            texture: this.loader.load('/asstes/snake_head.jpg'),
            w: Config.world.snake,
        });
    }

}