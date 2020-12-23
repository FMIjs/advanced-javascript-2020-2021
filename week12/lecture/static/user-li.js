export class UserLi extends HTMLLIElement {
  constructor({ _id, firstName, lastName, age }) {
    super();
    this.id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    const firstNameSpan = document.createElement('span');
    firstNameSpan.textContent = this.firstName;
    const lastNameSpan = document.createElement('span');
    lastNameSpan.textContent = this.lastName;
    const ageSpan = document.createElement('span');
    ageSpan.textContent = this.age;

    const delBtn = document.createElement('button');

    delBtn.addEventListener('click', this.deleteBtnClickHandler.bind(this));
    delBtn.textContent = 'DELETE';

    this.append(firstNameSpan, lastNameSpan, ageSpan, delBtn);
  }

  deleteBtnClickHandler(e) {
    this.dispatchEvent(new CustomEvent('delete', { detail: { id: this.id } }));
  }
}

customElements.define('user-li', UserLi, { extends: 'li' });
export const a = 123;

export default a; 