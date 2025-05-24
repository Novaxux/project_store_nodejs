import authRequest from '../authRequest.js';
import { toast, showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.body.insertAdjacentHTML('beforeend', toast());
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
    showToast(error.message || 'An unknown error occurred', 'danger');
  }
});
signUp.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('suPassword').value;
  const username = document.getElementById('suUsername').value.trim();
  try {
    const data = await authRequest.signup({ username, password });
    showToast(data.message, 'info');
    clearInput('suPassword')
    clearInput('suUsername')
  } catch (error) {
    showToast(error.message || 'An unknown error occurred', 'danger');
  }
});

function clearInput(element){
    document.getElementById(element).value = ''
}