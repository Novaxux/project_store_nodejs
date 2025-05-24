// Importaciones necesarias
import authRequest from '../authRequest.js';
import api from '../apiCalls.js';
import { ProductCard } from '../components/productCard.js';
import { cartItem } from '../components/cartItem.js';
import { showToast, toast } from '../components/toast.js';
import { modal, showAlert, showConfirm } from '../components/modal.js';
import { orderCard } from '../components/orderCard.js';
import { orderDetails } from '../components/orderDetails.js';

// Referencias a elementos del DOM
const btnLogout = document.getElementById('logout');
const cartArticles = document.getElementById('cart-articles');
const inputSearch = document.getElementById('inputSearch');
const productContainer = document.getElementById('product-container');
const cartBtn = document.getElementById('cartBtn');
const messageContainer = document.getElementById('main-container-message');
const summarySection = document.getElementById('summarySection');
const index = document.getElementById('index');
const acceptOrder = document.getElementById('accept-btn');
const btnOrders = document.getElementById('getOrders');
const orderContainer = document.getElementById('order-container');

// Variables globales
window.cart = [];
window.username = '';

// Evento principal: carga inicial del contenido
document.addEventListener(
  'DOMContentLoaded',
  async () => {
    document.body.insertAdjacentHTML('beforeend', toast());
    document.body.insertAdjacentHTML('beforeend', modal());

    try {
      const user = await authRequest.validateSession();
      username = user.username;
      localStorage.setItem('user', JSON.stringify(username));

      const usernameSpan = document.getElementById('username');
      if (usernameSpan) usernameSpan.innerHTML = username;

      window.cart = loadCart(username);
      updateCartDisplay(false);

      await generateAllProducts();
    } catch (error) {
      console.error('Auth failed or another error occurred:', error);
      document.location.href = './login.html';
    }
  },
  { once: true }
);

// Carga y muestra todos los productos disponibles
async function generateAllProducts() {
  const products = await api.getAllProducts();
  if (productContainer) {
    productContainer.innerHTML = products.map(ProductCard).join('');
  }
}

// Carga el carrito desde localStorage
function loadCart(username) {
  const key = `cart_${username}`;
  const storedCart = localStorage.getItem(key);
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}

// Agrega un producto al carrito
window.addToCart = function (id) {
  const amount = parseInt(document.getElementById(`qty-${id}`)?.value || '1');
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.amount += amount;
  } else {
    cart.push({ id, amount });
  }

  saveCart();
  updateCartDisplay(false);
  showToast('Product added', 'info');
};

// Elimina un producto del carrito
window.removeFromCart = function (id) {
  showConfirm('Do you want to remove this item?', () => {
    cart = cart.filter((product) => product.id !== id);
    saveCart();
    loadItems();
    updateCartDisplay();
    showToast('Item removed', 'warning');
    sumTotalItems();
  });
};

// Actualiza la cantidad de un producto
window.updateQuantity = function (id, inputElement) {
  const newQty = parseInt(inputElement.value);
  if (isNaN(newQty) || newQty < 1) return;

  const item = cart.find((product) => product.id === id);
  if (item) {
    item.amount = newQty;
    saveCart();
    showToast('Updated amount', 'info');
  }

  updateCartDisplay();
  sumTotalItems();
};

// Guarda el carrito en localStorage
function saveCart() {
  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
}

// Actualiza la visualización del total de artículos
function updateCartDisplay(showSummary = true) {
  const total = getTotalItems();
  cartArticles.hidden = total === 0;
  cartArticles.innerHTML = total;
  messageContainer.hidden = total > 0 || !showSummary;
  summarySection.hidden = total === 0 || !showSummary;
}

// Devuelve el total de productos en el carrito
function getTotalItems() {
  return cart.reduce((acc, item) => acc + item.amount, 0);
}

// Calcula y muestra el total monetario de los artículos del carrito
async function sumTotalItems() {
  let totalAmount = 0;
  for (const { id, amount } of cart) {
    const { price } = await api.getProduct(id);
    totalAmount += price * amount;
  }

  document.getElementById('total-amount').innerHTML = totalAmount.toFixed(2);
  document.getElementById('total-items').innerHTML = getTotalItems();
}

// Carga y muestra los artículos del carrito
async function loadItems() {
  productContainer.innerHTML = '';
  for (const { id, amount } of cart) {
    const product = await api.getProduct(id);
    productContainer.innerHTML += cartItem(product, amount);
  }
}

// Botón para aceptar el pedido
acceptOrder.addEventListener('click', async () => {
  showConfirm('Do you want to proceed with the operation?', sendOrder);
});

// Enviar pedido
async function sendOrder() {
  try {
    const data = await api.postOrder(cart);
    cart = [];
    saveCart();
    productContainer.innerHTML = '';
    showToast(data.message);
    updateCartDisplay();
  } catch (error) {
    showToast(error.message, 'danger');
  }
}

// Búsqueda de productos
inputSearch.addEventListener('keyup', async (e) => {
  e.preventDefault();
  orderContainer.innerHTML = '';
  const name = inputSearch.value.trim();
  if (!name) return generateAllProducts();

  try {
    const products = await api.searchProduct(name);
    productContainer.innerHTML = products.map(ProductCard).join('');
  } catch (error) {
    console.error(error);
  }
});

// Botón de cerrar sesión
btnLogout.addEventListener('click', async () => {
  await authRequest.logout();
  location.href = './login.html';
});

// Botón para ver el carrito
cartBtn.addEventListener('click', async () => {
  orderContainer.innerHTML = '';
  try {
    await loadItems();
    updateCartDisplay();
    await sumTotalItems();
  } catch (error) {
    console.log(error.message);
    cart = [];
    saveCart();
    updateCartDisplay();
  }
});

// Botón para volver al índice
index.addEventListener('click', async () => {
  orderContainer.innerHTML = '';
  try {
    await generateAllProducts();
    messageContainer.hidden = true;
    summarySection.hidden = true;
  } catch (error) {
    showAlert(error.message, 'danger');
  }
});

//cargar ordenes
btnOrders.addEventListener('click', async () => {
  try {
    const orders = await api.getOrders();
    orderContainer.innerHTML = orders.map(orderCard).join('');
    productContainer.innerHTML = '';
    summarySection.hidden = true;
  } catch (error) {
    showToast(error.message, 'danger');
  }
});

window.toggleOrderDetails = async function (id) {
  const details = document.getElementById('orderDetails' + id);
  const button = document.getElementById(`toggle-details-${id}`);

  const isHidden = button.innerText === 'View Details';
  isHidden ? showOrderDetails(id) : details.innerHTML = '' 
  button.innerText = isHidden ? 'Hide Details' : 'View Details';
};

async function showOrderDetails(id) {
  const orderDetailsContainer = document.getElementById('orderDetails' + id);
  const details = await api.getOrderDetails(id);
  orderDetailsContainer.innerHTML = details.map(orderDetails).join('');
}
