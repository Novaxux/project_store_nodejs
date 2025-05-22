import authRequest from '../authRequest.js';

document.addEventListener('DOMContentLoaded', async () => {
  const response = await authRequest.validateSession();
  if (response) document.location.href = './index.html';
});

const login = document.getElementById('login');
const signUp = document.getElementById('signup');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  try {
    const response = await authRequest.loginUser({ username, password });
    console.log(response)
    document.location.href = './index.html';
  } catch (error) {
    console.log(error.message)
    showAlert(error.message || 'An unknown error occurred');
  }
});
signUp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('suPassword').value;
  const username = document.getElementById('suUsername').value;
  try {
    const data = await authRequest.signup({ username, password });
    alert(data.message);
  } catch (error) {
    showAlert(error.message || 'An unknown error occurred');
  }
});

function showAlert(message) {
  const modalBody = document.getElementById('alertModalBody');
  modalBody.textContent = message;

  const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
  alertModal.show();
}
