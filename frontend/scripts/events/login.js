import authRequest from '../authRequest.js';
import { modal } from '../components/modal.js';
document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('alertModal').innerHTML = modal()
  try{
    await authRequest.validateSession();
    document.location.href = './index.html';
  }catch(error){
    console.error('Session not valid')
  }
});

const login = document.getElementById('login');
const signUp = document.getElementById('signup');

login.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value.trim();
  try {
    await authRequest.loginUser({ username, password });
    document.location.href = './index.html';
  } catch (error) {
    showAlert(error.message || 'An unknown error occurred');
  }
});
signUp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('suPassword').value;
  const username = document.getElementById('suUsername').value.trim();
  try {
    const data = await authRequest.signup({ username, password });
    showAlert(data.message);
    clearInput('suPassword')
    clearInput('suUsername')
  } catch (error) {
    showAlert(error.message || 'An unknown error occurred');
  }
});

export function showAlert(message) {
  const modalBody = document.getElementById('alertModalBody');
  modalBody.textContent = message;

  const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
  alertModal.show();
}

function clearInput(element){
    document.getElementById(element).value = ''
}