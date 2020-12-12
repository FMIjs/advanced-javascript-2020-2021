import { html, render, directive } from '/lit-html/lit-html.js';
import { repeat } from '/lit-html/directives/repeat.js';

const iff = directive((cond, html) => (part) => {
  part.setValue(cond ? html : '');
});

const appTemplate = context => html`
  <div>${context.title}</div>
  ${iff(context.isLoading, 'LOADING...')}
  <ul>
    ${repeat(
      context.users || [], 
      user => user._id, 
      (user, index) => html`<li>${index}: ${user.firstName}</li>`)
    }
  </ul>
  <button @click=${context.reloadHandler.bind(context)}>Reload</button>
`;


const state = new WeakMap();
class AppComponent extends HTMLElement {

  set title(title) {
    this.updateState({ title });
  }

  get title() {
    const { title } = state.get(this);
    return title;
  }

  set isLoading(isLoading) {
    this.updateState({ isLoading });
  }

  get isLoading() {
    const { isLoading } = state.get(this);
    return isLoading;
  }

  set users(users) {
    this.updateState({ users });
  }

  get users() {
    const { users } = state.get(this);
    return users;
  }

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.isUpdateScheduled = false;

    this.updateTemplate = function () {
      if (this.isUpdateScheduled) { return; }
      this.isUpdateScheduled = true;
      Promise.resolve().then(() => {
        render(appTemplate(this), this.shadowRoot);
        this.isUpdateScheduled = false;
      })
    }.bind(this);

    this.title = 'TESTING 123';
    this.isLoading = false;

    this.updateTemplate();
  }

  updateState(updates) {
    const currentState = state.get(this);
    state.set(this, { ...currentState, ...updates });
    this.updateTemplate();
  }

  loadUsers() {
    this.users = null;
    this.isLoading = true;
    fetch('/api/users').then(res => res.json()).then(users => {
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

customElements.define('app-root', AppComponent);

