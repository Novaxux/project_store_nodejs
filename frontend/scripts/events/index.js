import authRequest from '../authRequest.js';
import api from '../apiCalls.js';
import { ProductCard } from '../components/productCard.js';

const btnLogout = document.getElementById('logout');
const usernameSpan = document.getElementById('username');
const productContainer = document.getElementById('product-container');
const cartArticles = document.getElementById('cart-articles');

let cart = [];
let username;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const user = await authRequest.validateSession();
    username = user.username;
    usernameSpan.innerHTML = username;

    // Cargar carrito desde localStorage
    try {
      const storedCart = localStorage.getItem(`cart_${username}`);
      cart = storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Invalid cart data in localStorage:', error);
      cart = [];
    }

    // Si no existe carrito, crear uno vacío
    if (!localStorage.getItem(`cart_${username}`)) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    }

    cartArticles.innerHTML = updateArticles();

    // Cargar productos
    const products = await api.getAllProducts();
    for (const product of products) {
      productContainer.innerHTML += ProductCard(product);
    }
  } catch (error) {
    console.log(error);
    document.location.href = './login.html';
  }
});

window.addToCart = function (id) {
  const amount = parseInt(document.getElementById('qty-' + id).value) || 1;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.amount += amount;
  } else {
    cart.push({ id, amount });
  }

  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
  cartArticles.innerHTML = updateArticles(); // actualiza la interfaz
};

btnLogout.addEventListener('click', async () => {
  await authRequest.logout();
  localStorage.removeItem(`cart_${username}`);
  location.href = './login.html';
});

function updateArticles() {
  let totalArticles = 0;
  for (const article of cart) {
    totalArticles += article.amount;
  }

  cartArticles.hidden = totalArticles === 0;
  return totalArticles;
}
