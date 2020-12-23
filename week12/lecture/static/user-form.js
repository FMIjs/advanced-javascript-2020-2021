import { html } from '/lit-html/lit-html.js';
import { ifThen } from './directives/if-then.js';

import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

const userFormTemplate = (context) => html`
  ${ifThen(context.isLoading, 'LOADING USERS...')}
  <form @submit=${context.submitHandler.bind(context)}>
    <div class="form-group">
      <label for="first-name">First name:</label>
      <input type="text" id="first-name" name="firstName">
    </div>
    <div class="form-group">
      <label for="last-name">Last name:</label>
      <input type="text" id="last-name" name="lastName">
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input type="number" id="age" name="age">
    </div>
    <button>Save</button>
  </form>
`;


export class UserFormComponent extends HTMLElement {

  static selector = 'app-user-form';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    decorateAsComponent(this, userFormTemplate);

    decorateAsStateProperty(this, 'isLoading', false);
    decorateAsStateProperty(this, 'users', null);
  }

  // loadUsers() {
  //   this.users = null;
  //   this.isLoading = true;
  //   fetch('/api/users').then(res => res.json()).then(users => {
  //     this.users = users;
  //     this.isLoading = false;
  //   });
  // }

  submitHandler(event) {
    event.preventDefault();
    const formFields = Array.from(this.shadowRoot.querySelectorAll('div.form-group *[name]'));
    const body = formFields.reduce((acc, currField) => {
      acc[currField.name] = currField.value;
      return acc;
    }, {});

    fetch('/api/users', {
      headers: {
        'x-access-token': '',
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }).then(() => {
      window.location = '/';
    });
  }

  // connectedCallback() {
  //   this.loadUsers();
  // }

  // reloadHandler() {
  //   this.loadUsers();
  // }

}

customElements.define(UserFormComponent.selector, UserFormComponent);