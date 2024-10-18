<?php
namespace App\Controllers;

use App\Model\Produtos;

class ProdutoController {
    private $produto;

    public function __construct() {
        $this->produto = new Produtos();
    }
    public function create() {
        $data = json_decode(file_get_contents('php://input'));
        if (!isset($data->nome, $data->preco, $data->quantidade)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do produto."]);
            return;
        }

        if (strlen($data->nome) < 4) {
            http_response_code(400);
            echo json_encode(["error" => "O nome do produto deve ter pelo menos 4 caracteres."]);
            return;
        }

        if ($data->preco < 0) {
            http_response_code(400);
            echo json_encode(["error" => "O preço do produto não pode ser inferior a zero."]);
            return;
        }

        if ($data->quantidade < 0) {
            http_response_code(400);
            echo json_encode(["error" => "A quantidade do produto não pode ser inferior a zero."]);
            return;
        }

        $this->produto->setNome($data->nome)
                      ->setPreco($data->preco)
                      ->setQuantidade($data->quantidade);

        if ($this->produto->insertProduto($this->produto)) {
            http_response_code(201);
            echo json_encode(["message" => "Produto criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar produto."]);
        }
    }

    public function read($id = null) {
        if ($id) {
            $result = $this->produto->getProdutoById($id);
            $status = $result ? 200 : 404;
        } else {
            $result = $this->produto->getAllProdutos();
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum produto encontrado."]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents('php://input'));
        if (!isset($id, $data->nome, $data->preco, $data->quantidade)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do produto."]);
            return;
        }

        if (strlen($data->nome) < 4) {
            http_response_code(400);
            echo json_encode(["error" => "O nome do produto deve ter pelo menos 4 caracteres."]);
            return;
        }

        if ($data->preco < 0) {
            http_response_code(400);
            echo json_encode(["error" => "O preço do produto não pode ser inferior a zero."]);
            return;
        }

        if ($data->quantidade < 0) {
            http_response_code(400);
            echo json_encode(["error" => "A quantidade do produto não pode ser inferior a zero."]);
            return;
        }

        $this->produto->setId($id)
                      ->setNome($data->nome)
                      ->setPreco($data->preco)
                      ->setQuantidade($data->quantidade);

        if ($this->produto->updateProduto($this->produto)) {
            http_response_code(200);
            echo json_encode(["message" => "Produto atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar produto."]);
        }
    }

    public function delete($id) {
        if ($this->produto->deleteProduto($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Produto excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir produto."]);
        }
    }
}
