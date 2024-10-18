<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Produtos {
    private $conn;
    private $table = "produtos";
    private $id;
    private $nome;
    private $preco;
    private $quantidade;

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function insertProduto($produto) {
        $nome = $produto->getNome();
        $preco = $produto->getPreco();
        $quantidade = $produto->getQuantidade();
        $query = "INSERT INTO $this->table (nome, preco, quantidade) VALUES (:nome, :preco, :quantidade)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":preco", $preco);
        $stmt->bindParam(":quantidade", $quantidade);

        return $stmt->execute();
    }

    public function getAllProdutos() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProdutoById($id) {
        $query = "SELECT * FROM $this->table WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateProduto($produto) {
        $id = $produto->getId();
        $nome = $produto->getNome();
        $preco = $produto->getPreco();
        $quantidade = $produto->getQuantidade();
        $query = "UPDATE $this->table SET nome = :nome, preco = :preco, quantidade = :quantidade WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":preco", $preco);
        $stmt->bindParam(":quantidade", $quantidade);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    public function deleteProduto($id) {
        $query = "DELETE FROM $this->table WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id): self {
        $this->id = $id;
        return $this;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($nome): self {
        $this->nome = $nome;
        return $this;
    }

    public function getPreco() {
        return $this->preco;
    }

    public function setPreco($preco): self {
        $this->preco = $preco;
        return $this;
    }

    public function getQuantidade() {
        return $this->quantidade;
    }

    public function setQuantidade($quantidade): self {
        $this->quantidade = $quantidade;
        return $this;
    }
}
