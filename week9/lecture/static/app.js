(function () {
  const apiURL = 'http://localhost:3000/api';
  const userForm = document.getElementById('user-form');
  const userList = document.getElementById('user-list');

  const loadingLi = document.createElement('li');
  loadingLi.innerText = 'Loading...';

  function loadUsers() {
    return fetch(`${apiURL}/users`).then(res => res.json());
  }

  function deleteUser(id) {
    return fetch(`${apiURL}/users/${id}`, { method: 'DELETE' }).then(res => res.json());
  }

  function loadAndRenderUsers() {
    userList.innerHTML = '';
    userList.appendChild(loadingLi);
    loadUsers().then(users => {
      userList.removeChild(loadingLi);

      for (const user of users) {
        const li = document.createElement('li');
        li.setAttribute('data-id', user._id);

        const firstName = document.createElement('span');
        firstName.textContent = user.firstName;

        const lastName = document.createElement('span');
        lastName.textContent = user.lastName;

        const age = document.createElement('span');
        age.textContent = user.age;

        li.append(firstName, lastName, age);
        userList.appendChild(li);
      }
    });
  }

  function userFormSubmitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    const inputs = Array.from(userForm.getElementsByTagName('input'));
    const data = inputs.reduce(function (acc, currInput) {
      let { value, name, type } = currInput;
      if (type === 'number') {
        value = currInput.valueAsNumber;
      } else if (type === 'date') {
        value = currInput.valueAsDate;
      } else if (type === 'checkbox') {
        value = currInput.checked;
      }
      acc[name] = value;
      return acc;
    }, {});

    if (!data.firstName || !data.lastName || !data.age) {
      alert('All data is required!');
      return;
    }

    fetch(`${apiURL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  function userListClickHandler(event) {
    const target = event.target;
    const parent = target.parentElement;
    if (!target.hasAttribute('data-id') && !parent.hasAttribute('data-id')) { return; }
    userList.innerHTML = '';
    userList.appendChild(loadingLi);
    const userId = target.getAttribute('data-id') || parent.getAttribute('data-id');
    deleteUser(userId).then(() => { loadAndRenderUsers(); });
  }

  function init() {
    loadAndRenderUsers();
    userForm.addEventListener('submit', userFormSubmitHandler);
    userList.addEventListener('click', userListClickHandler);
  }

  init();
}());
