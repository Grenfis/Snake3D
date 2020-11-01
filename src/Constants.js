import {Vector3} from "three";

export const DIRECTION = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
});

export const DIRECTIONS = Object.freeze({
    [DIRECTION.UP]: new Vector3(0, 1, 0),
    [DIRECTION.DOWN]: new Vector3(0, -1, 0),
    [DIRECTION.LEFT]: new Vector3(-1, 0, 0),
    [DIRECTION.RIGHT]: new Vector3(1, 0, 0),
});

export const SIDES_AXES = Object.freeze([
    ['x', 'y', 'z'],
    ['y', 'z', 'x'],
    ['x', 'z', 'y']
]);

export const OBJECT_TYPES = Object.freeze({
    FIELD: 0,
    SNAKE_HEAD: 1,
    SNAKE_BODY: 2,
    APPLE: 3
});