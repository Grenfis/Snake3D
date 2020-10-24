export default {
    render: {
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        viewport: {
            near: 0.1,
            far: 1000,
        },
        width: window.innerWidth,
        height: window.innerHeight,
        camera: {
            zPosition: 25,
        }
    }
}