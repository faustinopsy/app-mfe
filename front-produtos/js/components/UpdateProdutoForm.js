class UpdateProdutoForm {
    constructor(fetchService, refreshProdutosList) {
        this.fetchService = fetchService;
        this.refreshProdutosList = refreshProdutosList;
    }

    render() {
        return `
            <div id="updateProdutoModal" class="modal" style="display: none;">
                <div class="modal-content">
                    <span id="closeModal" class="close">&times;</span>
                    <h4>Atualizar Produto</h4>
                    <label>ID:</label>
                    <input type="text" id="updateId" readonly><br>
                    <label>Nome:</label>
                    <input type="text" id="updateNome"><br>
                    <label>Preço:</label>
                    <input type="number" id="updatePreco" step="0.01"><br>
                    <label>Quantidade:</label>
                    <input type="number" id="updateQuantidade"><br>
                    <button id="updateButton">Atualizar Produto</button>
                </div>
            </div>
        `;
    }

    afterRender() {
        document.getElementById('updateButton').addEventListener('click', () => this.updateProduto());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    }

    open(produto) {
        document.getElementById('updateId').value = produto.id;
        document.getElementById('updateNome').value = produto.nome;
        document.getElementById('updatePreco').value = produto.preco;
        document.getElementById('updateQuantidade').value = produto.quantidade;
        document.getElementById('updateProdutoModal').style.display = 'block';
    }

    closeModal() {
        document.getElementById('updateProdutoModal').style.display = 'none';
    }

    async updateProduto() {
        const id = document.getElementById('updateId').value;
        const nome = document.getElementById('updateNome').value;
        const preco = parseFloat(document.getElementById('updatePreco').value);
        const quantidade = parseInt(document.getElementById('updateQuantidade').value, 10);

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

        await this.fetchService.fetch(`/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, preco, quantidade }),
        });

        alert('Produto atualizado com sucesso.');
        this.closeModal();
        this.refreshProdutosList(); 
    }

    async deleteProduto(id) {
        await this.fetchService.fetch(`/produtos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Produto deletado com sucesso.');
        this.refreshProdutosList(); 
    }
}

export default UpdateProdutoForm;
