import FetchService from './components/FetchService.js';
import ProdutoForm from './components/ProdutoForm.js';
import UpdateProdutoForm from './components/UpdateProdutoForm.js';
import ProdutosList from './components/ProdutosList.js';

export default class App {
    constructor(element, url) {
        this.apiBaseUrl = url;
        this.appElement = element;
        this.fetchService = new FetchService(this.apiBaseUrl);

        this.listProdutos = this.renderProdutosList.bind(this);

        this.updateProdutoForm = new UpdateProdutoForm(this.fetchService, this.listProdutos);
        this.produtoForm = new ProdutoForm(this.fetchService, this.listProdutos);
        this.produtosList = new ProdutosList(this.fetchService, this.updateProdutoForm, this.listProdutos);
    }

    init() {
        this.render();
    }

    async render() {
        this.appElement.innerHTML = `
            <div class="panel">
                <h1>Gerenciador de Produtos</h1>
                <div id="produtoFormContainer"></div>
                <button id="fetchProdutosButton">Buscar Todos os Produtos</button>
                <div id="produtosListContainer"></div>
                <div id="updateProdutoFormContainer"></div>
            </div>
        `;

        document.getElementById('produtoFormContainer').innerHTML = this.produtoForm.render();
        this.produtoForm.afterRender();

        document.getElementById('updateProdutoFormContainer').innerHTML = this.updateProdutoForm.render();
        this.updateProdutoForm.afterRender();

        document.getElementById('fetchProdutosButton').addEventListener('click', async () => {
            await this.renderProdutosList();
        });

        await this.renderProdutosList();
    }

    async renderProdutosList() {
        const produtosListHtml = await this.produtosList.render();
        document.getElementById('produtosListContainer').innerHTML = produtosListHtml;
        this.produtosList.afterRender();
    }
}
// const app = new App(document.getElementById("app"),"http://localhost:8080")
// app.init()