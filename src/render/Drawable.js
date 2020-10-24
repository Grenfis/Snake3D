import * as ThreeJs from 'three';

export default class Drawable {
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
     *
     * @returns {null|Mesh<*, *>}
     */
    getMesh() {
        const geometry = this.getGeometry();
        const material = this.getMaterial();
        const position = this.getPosition();
        if (geometry === null || material === null || position === null) {
            return null;
        }
        const mesh = new ThreeJs.Mesh(geometry, material);
        mesh.position.set(position.x, position.y, position.z);
        return mesh;
    }
}