import { html } from '/lit-html/lit-html.js';
import { ifThen } from './directives/if-then.js';
import { repeat } from '/lit-html/directives/repeat.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

const userListTemplate = (context) => html`
  ${ifThen(context.isLoading, 'LOADING USERS...')}
  <ul>
    ${repeat(
      context.users || [], 
      user => user._id, 
      (user, index) => html`<li>${index}: ${user.firstName}</li>`)
    }
  </ul>
  <button @click=${context.reloadHandler.bind(context)}>Reload</button>
`;


export class UserListComponent extends HTMLElement {

  static selector = 'app-user-list';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    decorateAsComponent(this, userListTemplate);

    decorateAsStateProperty(this, 'isLoading', false);
    decorateAsStateProperty(this, 'users', null);
  }

  loadUsers() {
    this.users = null;
    this.isLoading = true;
    fetch('/api/users', { credentials: 'include' }).then(res => res.json()).then(users => {
      this.users = users;
      this.isLoading = false;
    });
  }

  connectedCallback() {
    this.loadUsers();
  }

  reloadHandler() {
    this.loadUsers();
  }
  
}

customElements.define(UserListComponent.selector, UserListComponent);