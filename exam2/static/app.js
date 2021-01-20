(function () {
  const apiURL = 'http://localhost:3000/api';
  const userList = document.getElementById('user-list');
  const userDetail = document.getElementById('user-detail');

  const loadingLi = document.createElement('li');
  loadingLi.innerText = 'Loading...';

  const loadUsers = () => {
    //...
  }
  const loadUserPosts = () => {
    //...
  }

  const loadAndRenderUsers = () => {
    userList.innerHTML = '';
    userList.appendChild(loadingLi);
    loadUsers().then(() => {
      // ...
    });
  }


  const loadAndRenderUserDetails = (user) => {
    userDetail.innerHTML = '';
    userDetail.appendChild(loadingLi);
    loadUserPosts(user.id).then(() => {
      // ...
    });
  }

  function userListClickHandler(event) {
    // ...
  }

  function init() {
    loadAndRenderUsers();
  }

  init();
}());
