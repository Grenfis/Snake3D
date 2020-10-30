export default Object.freeze({
    render: {
        frameRate: 60,
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        viewport: {
            near: 0.1,
            far: 1000,
        },
        width: window.innerWidth,
        height: window.innerHeight,
        camera: {
            zPosition: 7,
        },
    },
    world: {
        gap: 0.2,
        block: 1,
        snake: 0.7,
    }
});