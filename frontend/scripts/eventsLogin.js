import authRequest from './authRequest.js';

const login = document.getElementById('login');
const signUp = document.getElementById('signup');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  try {
    await authRequest.loginUser({ username, password });
  } catch (error) {
    alert(error.message);
  }
});
signUp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('suPassword').value;
  const username = document.getElementById('suUsername').value;
  try {
    const data = await authRequest.signup({ username, password });
    alert(data.message)
  } catch (error) {
    alert(error.message);
  }
});
