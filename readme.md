
# Microfrontend Projeto

## O que é Microfrontend?

Microfrontend é uma abordagem arquitetural que aplica os conceitos de microserviços ao desenvolvimento frontend. Em vez de criar um frontend monolítico, o projeto é dividido em pequenas partes independentes (microfrontends), cada uma responsável por um conjunto específico de funcionalidades e que podem ser desenvolvidas, implantadas e atualizadas de forma autônoma.

Essa abordagem permite que diferentes equipes trabalhem em componentes distintos sem se preocupar com conflitos de código ou deploys que afetem outras partes do sistema.

### Importância e Vantagens:

-   **Desenvolvimento Independente**: Equipes podem trabalhar em diferentes partes do projeto sem interferir umas nas outras.
-   **Deploy Independente**: Atualizações e correções podem ser feitas sem afetar todo o sistema.
-   **Escalabilidade**: Melhor gerenciamento de recursos e escalabilidade ao dividir funcionalidades.
-   **Manutenção Simplificada**: Mais fácil de manter e atualizar partes específicas do sistema sem interromper o funcionamento geral.

## Estrutura do Projeto Atual

O projeto atual é composto por um backend único e dois microfrontends:

1.  **Backend**:
    
    -   Desenvolvido para gerenciar as operações de dados comuns, como CRUD para usuários e produtos.
    -   Deve ser iniciado na porta `8080`.
    -   Antes de iniciar o backend, é necessário instalar as dependências via Composer para que o PHP entenda os namespaces. Isso significa que o Composer é uma dependência obrigatória para o backend.
2.  **Microfrontend 1 - front-pessoas**:
    
    -   Um frontend dedicado ao CRUD de usuários.
    -   Se comunica diretamente com o backend para operações específicas de usuários.
3.  **Microfrontend 2 - front-produtos**:
    
    -   Um frontend dedicado ao CRUD de produtos.
    -   Se comunica diretamente com o backend para operações específicas de produtos.
4.  **Frontend Geral**:
    
    -   Localizado na raiz do projeto, serve como o ponto de entrada principal para os microfrontends.
    -   Inclui a configuração e roteamento para interagir com os microfrontends de maneira integrada.

## Como Iniciar o Projeto

### Backend

1.  Certifique-se de ter o Composer instalado em sua máquina.
2.  Na raiz e instale as dependências:

```
composer install
```
3. Inicie o servidor backend na porta `8080` :
```
cd backend 
php -S localhost:8080 
```
### Frontend Geral e Microfrontends

1.  Certifique-se de estar na raiz do projeto para iniciar o frontend geral.
2.  Recomendado subir o servidor na porta `5500` (em outro terminal):
```
php -S localhost:5500
```
1.  As  pastas `front-pessoas`, e  `front-produtos`, serão importadas automaticamente pelo arquivo de routas principal (assets/js/router.js) o qual importará as aplicações independentes pessoas e produtos que podem ter sido criadas por equipes diferentes.

### Servidor da Raiz e Backend

-   **Servidor da Raiz**: Suba um servidor na raiz do projeto na porta `5500` para servir o frontend geral.
-   **Servidor Backend**: Suba outro servidor dentro da pasta `backend` na porta `8080`. Se necessário, pode configurar para funcionar na porta `80` para um acesso mais padrão.