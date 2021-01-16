import { html } from '/lit-html/lit-html.js';
import { decorateAsComponent } from './utils/decorate-as-component.js';
import { decorateAsStateProperty } from './utils/decorate-as-state-property.js';

import { UserListComponent } from './user-list.js';
import { UserFormComponent } from './user-form.js';

const appTemplate = context => html`
  <div>${context.title}</div>
  <nav>
    <a href="/">User List</a>
    <a href="/user/add">Add New User</a>
  </nav>
  <div id="outlet"></div>
`;

class AppComponent extends HTMLElement {
  routes = [
    { path: '/', component: UserListComponent.selector },
    { path: '/user/add', component: UserFormComponent.selector },
    { path: '/user/edit/:user', component: UserFormComponent.selector },
  ];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    decorateAsComponent(this, appTemplate);

    decorateAsStateProperty(this, 'title', 'TESTING 123');

    Promise.resolve().then(() => {
      const outlet = this.shadowRoot.getElementById('outlet');
      const router = new Vaadin.Router(outlet);

      router.setRoutes(this.routes);
    });
  }

}

customElements.define('app-root', AppComponent);

