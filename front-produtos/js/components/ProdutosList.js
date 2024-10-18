class ProdutosList {
    constructor(fetchService, updateProdutoForm, refreshProdutosList) {
        this.fetchService = fetchService;
        this.updateProdutoForm = updateProdutoForm;
        this.refreshProdutosList = refreshProdutosList;
    }

    async render() {
        const produtos = await this.fetchService.fetch('/produtos');
        let produtosHtml = '<h2>Produtos Disponíveis</h2>';
        produtosHtml += '<div class="produtos-list">';
        produtos.forEach(produto => {
            produtosHtml += `
                <div class="produto-item collection">
                    ${produto.id} - ${produto.nome} - R$ ${produto.preco} - Quantidade: ${produto.quantidade}
                    <div class="grupo"> 
                        <button class="button update" data-id="${produto.id}">Editar</button>
                        <button class="button delete" data-id="${produto.id}">Deletar</button>
                    </div>
                </div>
            `;
        });
        produtosHtml += '</div>';
        return produtosHtml;
    }

    afterRender() {
        const editButtons = document.querySelectorAll('.update');
        editButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const produto = await this.fetchService.fetch(`/produtos/${id}`);
                this.updateProdutoForm.open(produto);
            });
        });

        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('Tem certeza que deseja deletar este produto?')) {
                    await this.updateProdutoForm.deleteProduto(id);
                }
            });
        });
    }
}

export default ProdutosList;
