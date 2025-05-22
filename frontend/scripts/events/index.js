import authRequest from '../authRequest.js';

const btnLogout = document.getElementById('logout');
const usernameSpan = document.getElementById('username');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await authRequest.validateSession();
    usernameSpan.innerHTML = user.username
  } catch (error) {
    document.location.href = './login.html';
  }
});


btnLogout.addEventListener('click', async () => {
  await authRequest.logout();
});


