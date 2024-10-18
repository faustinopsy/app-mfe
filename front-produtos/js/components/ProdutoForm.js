class ProdutoForm {
    constructor(fetchService, renderCallback) {
        this.fetchService = fetchService;
        this.refreshProdutosList = renderCallback;
    }

    render() {
        return `
            <form id="addForm">
                Nome: <input type="text" id="nome"><br>
                Preço: <input type="number" id="preco" step="0.01"><br>
                Quantidade: <input type="number" id="quantidade"><br>
                <button type="submit">Adicionar Produto</button>
            </form>
        `;
    }

    afterRender() {
        document.getElementById('addForm').addEventListener('submit', (e) => this.addItem(e));
    }

    async addItem(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const quantidade = parseInt(document.getElementById('quantidade').value, 10);

        if (nome.length < 4) {
            alert("O nome do produto deve ter pelo menos 4 caracteres.");
            return;
        }

        if (preco < 0) {
            alert("O preço do produto não pode ser inferior a zero.");
            return;
        }

        if (quantidade < 0) {
            alert("A quantidade do produto não pode ser inferior a zero.");
            return;
        }

        await this.fetchService.fetch('/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, quantidade }),
        });

        alert('Produto adicionado com sucesso.');
        document.getElementById('nome').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('quantidade').value = '';
        this.refreshProdutosList();
    }
}

export default ProdutoForm;
