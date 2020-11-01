import {TextureLoader} from "three";
import Cube from "./Cube";
import Config from "./Config";
import {OBJECT_TYPES} from "./Constants";
import SnakeHead from "./SnakeHead";

export default class ObjectFactory {
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
            type: OBJECT_TYPES.FIELD,
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
            type: OBJECT_TYPES.SNAKE_BODY,
        });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {Camera} camera
     */
    getSnakeHead(x, y, z, camera) {
        return new SnakeHead({
            x, y, z,
            texture: this.loader.load('/asstes/snake_head.jpg'),
            w: Config.world.snake,
            type: OBJECT_TYPES.SNAKE_HEAD,
        }, camera);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    getApple(x, y, z) {
        return new Cube({
            x, y, z,
            texture: this.loader.load('/asstes/apple.jpg'),
            w: Config.world.apple,
            type: OBJECT_TYPES.APPLE,
        });
    }
}