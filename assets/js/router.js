export default class Router {
    constructor(appInstance) {
        this.app = appInstance;
        this.menu = [
            { "hash": "front-pessoas/pessoas", "name": "MFE 1 - Gestão de Usuários" },
            { "hash": "front-produtos/produtos", "name": "MFE 2 - Gestão de Produtos" }
        ];
        this.routes = {
            'front-pessoas': {
                'pessoas': '../../front-pessoas/js/app.js',
                'url': 'http://localhost:8080'
            },
            'front-produtos': {
                'produtos': '../../front-produtos/js/app.js',
                'url': 'http://localhost:8080'
            }
        };
    }

    init() {
        window.addEventListener("hashchange", () => this.navegar());
        this.navegar(); 
    }

    async navegar() {
        const hash = window.location.hash.substring(2); 
        const [modulo, route] = hash.split('/');

        if (modulo && this.routes[modulo]) {
            await this.carregaSPA(modulo, route || 'pessoas');
        } else {
            await this.carregaSPA('front-pessoas', 'pessoas');
        }
    }

    async carregaSPA(modulo, route) {
        const caminhoComponente = this.routes[modulo][route] || this.routes[modulo]['home'];
        try {
            const appContainer = document.getElementById('app');
            appContainer.innerHTML = '';
            const appSPAModulo = await import(`../${caminhoComponente}`);
            
            if (typeof appSPAModulo.init === 'function') {
                appSPAModulo.init('app');
            } else if (appSPAModulo.default && typeof appSPAModulo.default.prototype.init === 'function') {
                const mfeInstance = new appSPAModulo.default(appContainer,this.routes[modulo].url);
                mfeInstance.init();
            } else {
                console.error(`O módulo ${modulo} não possui uma exportação válida.`);
            }
        } catch (error) {
            console.error(`Erro ao carregar o MFE: ${modulo}`, error);
            document.getElementById('app').innerHTML = `<p>Erro ao carregar a funcionalidade: ${modulo}</p>`;
        }
    }

    render() {
        const navLinksHtml = this.menu.map(link => `
            <li><a href="#/${link.hash}" data-nav-link data-target="#/${link.hash}">${link.name}</a></li>
        `).join('');

        return `
            <ul>
                ${navLinksHtml}
            </ul>
        `;
    }

    afterRender() {
        const navLinks = document.querySelectorAll("[data-nav-link]");
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                const linkNav = link.getAttribute('data-target');
                if (window.location.hash === linkNav) {
                    this.navegar();
                } 
            });
        });
    }
}
