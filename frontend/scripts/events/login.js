import authRequest from '../authRequest.js';

document.addEventListener('DOMContentLoaded', async () => {
  try{
    const response = await authRequest.validateSession();
    console.log(response)
    if (response.ok) document.location.href = './index.html';
  }catch(error){
    console.error('Session not valid')
  }
});

const login = document.getElementById('login');
const signUp = document.getElementById('signup');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;
  try {
    const response = await authRequest.loginUser({ username, password });
    document.location.href = './index.html';
  } catch (error) {
    showAlert(error.message || 'An unknown error occurred');
  }
});
signUp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('suPassword').value;
  const username = document.getElementById('suUsername').value;
  try {
    const data = await authRequest.signup({ username, password });
    showAlert(data.message);
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
