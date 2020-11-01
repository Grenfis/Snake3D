import * as ThreeJs from 'three';

export default class Drawable {
    constructor(props) {
        this.mesh = null;
    }


    getGeometry() {
        return null;
    }

    getMaterial() {
        return null;
    }

    getPosition() {
        return null;
    }

    /**
     * Следует вызывать в конце конструктора имплементации
     * @returns {null|Mesh<*, *>}
     */
    createMesh() {
        const geometry = this.getGeometry();
        const material = this.getMaterial();
        const position = this.getPosition();
        if (geometry === null || material === null || position === null) {
            return null;
        }
        const mesh = new ThreeJs.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        this.mesh = mesh;
    }

    /**
     *
     * @return {null | Mesh<*,*>>}
     */
    getMesh() {
        return this.mesh;
    }
}