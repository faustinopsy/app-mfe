import FetchService from './components/FetchService.js';
import UserForm from './components/UserForm.js';
import UpdateUserForm from './components/UpdateUserForm.js';
import UsersList from './components/UsersList.js';

export default class App {
    constructor(element, url) {
        this.apiBaseUrl = url;
        this.appElement =  element;
        this.fetchService = new FetchService(this.apiBaseUrl);

        this.listUsers = this.renderUsersList.bind(this);

        this.updateUserForm = new UpdateUserForm(this.fetchService, this.listUsers);
        this.userForm = new UserForm(this.fetchService, this.listUsers);
        this.usersList = new UsersList(this.fetchService, this.updateUserForm, this.listUsers);

        this.render();
    }
    init() {
        this.render();
    }
    async render() {
        this.appElement.innerHTML = `
            <div class="card-panel">
                <h1>Gerenciador de Usuários</h1>
                <div id="userFormContainer"></div>
                <button id="fetchUsersButton">Buscar Todos os Usuários</button>
                <div id="usersListContainer"></div>
                <div id="updateUserFormContainer"></div>
            </div>
        `;

        document.getElementById('userFormContainer').innerHTML = this.userForm.render();
        this.userForm.afterRender();

        document.getElementById('updateUserFormContainer').innerHTML = this.updateUserForm.render();
        this.updateUserForm.afterRender();

        document.getElementById('fetchUsersButton').addEventListener('click', async () => {
            await this.renderUsersList();
        });

        await this.renderUsersList();
    }

    async renderUsersList() {
        const usersListHtml = await this.usersList.render();
        document.getElementById('usersListContainer').innerHTML = usersListHtml;
        this.usersList.afterRender();
    }
}
// const app = new App(document.getElementById("app"),"http://localhost:8080")
// app.init()