import { html, render } from '/lit-html/lit-html.js';
import { UserLi } from './user-li.js';

const appComponentTemplate = document.getElementById('app-template');

class AppComponent extends HTMLElement {

  static get observedAttributes() {
    return ['data-test'];
  }

  constructor() {
    super();

    const showRoot = this.attachShadow({ mode: 'open' });

    showRoot.appendChild(appComponentTemplate.content.cloneNode(true));

    this.userList = showRoot.getElementById('user-list');
    this.loader = showRoot.getElementById('loader');

    // const testValue = this.getAttribute('data-test');
    // console.log(testValue);
  }

  connectedCallback() {
    this.loader.classList.remove('hidden');
    fetch('/api/users').then(res => res.json()).then(users => {
      this.loader.classList.add('hidden');
      this.userList.append(
        ...users.map((user) => {
          const li = new UserLi(user);
          li.addEventListener('delete', this.deleteUserHandler.bind(this));
          return li;
        })
      );
    });
  }

  disconnectedCallback() {
    console.log('Clean up');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
  }

  deleteUserHandler(e) {
    const { detail: { id } } = e;
    console.log('DELETE USER WITH ID: ', id);
  }

}

customElements.define('app-root', AppComponent);
