<?php
namespace App\Rotas;

use App\Controllers\UsuarioController;
use App\Controllers\ProdutoController;

class Rotas {
    public static function fastRotas(){
        return [
            'GET' => [
                '/users' => [UsuarioController::class, 'read'],
                '/users/{id}' => [UsuarioController::class, 'read'],
                '/produtos' => [ProdutoController::class, 'read'],
                '/produtos/{id}' => [ProdutoController::class, 'read'],
            ],
            'POST' => [
                '/users' => [UsuarioController::class, 'create'],
                '/produtos' => [ProdutoController::class, 'create'],
                '/login' => [UsuarioController::class, 'login'],
            ],
            'PUT' => [
                '/users/{id}' => [UsuarioController::class, 'update'],
               '/produtos/{id}' => [ProdutoController::class, 'update'],
            ],
            'DELETE' => [
                '/users/{id}' => [UsuarioController::class, 'delete'],
                '/produtos/{id}' => [ProdutoController::class, 'delete'],
            ],
        ];
    }
}

