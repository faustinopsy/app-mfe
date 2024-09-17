import Router from './router.js';

class App {
    constructor() {
        this.router = new Router(this);
        this.init();
    }

    async init() {
        const nav = document.getElementById("nav");
        nav.innerHTML = this.router.render();
        this.router.afterRender();
        this.router.init();
    }

}

const app = new App();
