import authRequest from '../authRequest.js';
import api from '../apiCalls.js';
import { ProductCard } from '../components/productCard.js';

const btnLogout = document.getElementById('logout');
const usernameSpan = document.getElementById('username');
const productContainer = document.getElementById('product-container');
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await authRequest.validateSession();
    usernameSpan.innerHTML = user.username;
    const products = await api.getAllProducts();
    for (const product of products){
      productContainer.innerHTML += ProductCard(product)
    }
  } catch (error) {
    console.log(error);
    document.location.href = './login.html';  
  }
});

btnLogout.addEventListener('click', async () => {
  await authRequest.logout();
});
