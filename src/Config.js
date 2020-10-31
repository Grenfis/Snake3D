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
            zPosition: 7, //удаленность камеры
        },
    },
    world: {
        gap: 0.2,
        block: 1, //размер блока поля
        snake: 0.7, //размер блока змеи
        field: {
            size: 3, //количество блоков поля прим. 3х3х3
        }
    },
    game: {
        snake: {
            speed: 1000, //как часто делается шаг
        }
    }
});