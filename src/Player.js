import DrawableFactory from "./render/DrawableFactory";

export default class Player {
    /**
     *
     * @param {DrawableFactory} drawableFactory
     */
    constructor(drawableFactory) {
        this.drawableFactory = drawableFactory;
        this.body = [
            this.drawableFactory.getSnakeHead(0, 0, 2),
        ];
    }

    draw(render) {
        this.body.forEach(section => {
            render.pushToRender(section);
        });
    }
}