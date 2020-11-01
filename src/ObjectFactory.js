import {TextureLoader} from "three";
import Cube from "./Cube";
import Config from "./Config";
import {OBJECT_TYPES} from "./Constants";

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
            id: OBJECT_TYPES.FIELD,
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
            id: OBJECT_TYPES.SNAKE_BODY,
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
            id: OBJECT_TYPES.SNAKE_HEAD,
        });
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
            id: OBJECT_TYPES.APPLE,
        });
    }
}