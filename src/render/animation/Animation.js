export default class Animation {
    constructor() {
        this.complete = false;
        this.onCompleteCb = null;
    }

    /**
     * Обновление кадра
     * @param {number} dt delta-time
     * @returns {bool} true - если анимация завершена
     */
    tick(dt) {
        if (!this.complete) {
            this.tickImplementation(dt);
        }
        return this.complete;
    };

    /**
     * Реализация пользовательского кода
     * @param {number} dt delta-time
     */
    tickImplementation(dt) {}

    /**
     * Завершение анимации
     */
    animationComplete() {
        this.complete = true;
    }

    callOnComplete() {
        if (typeof this.onCompleteCb === 'function') {
            this.onCompleteCb();
        }
    }

    onComplete(cb) {
        this.onCompleteCb = cb;
        return this;
    }
}