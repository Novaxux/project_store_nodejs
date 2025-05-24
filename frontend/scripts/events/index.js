import authRequest from '../authRequest.js';
import api from '../apiCalls.js';
import { ProductCard } from '../components/productCard.js';
import { cartItem } from '../components/cartItem.js';
import { showToast, toast } from '../components/toast.js';
import { modal, showConfirm } from '../components/modal.js';

const btnLogout = document.getElementById('logout');
const cartArticles = document.getElementById('cart-articles');
const inputSearch = document.getElementById('inputSearch');
const productContainer = document.getElementById('product-container');
const cartBtn = document.getElementById('cartBtn');
const messageContainer = document.getElementById('main-container-message');
const summarySection = document.getElementById('summarySection');
const index = document.getElementById('index');
window.cart = [];
window.username = ''; // Declarar username como global

document.addEventListener(
  'DOMContentLoaded',
  async () => {
    document.body.insertAdjacentHTML('beforeend', toast());
    document.body.insertAdjacentHTML('beforeend', modal());
    try {
      const user = await authRequest.validateSession();
      localStorage.setItem('user', JSON.stringify(user.username));

      username = user.username; // Asignar al global

      const usernameSpan = document.getElementById('username');
      if (usernameSpan) usernameSpan.innerHTML = username;

      window.cart = loadCart(username);
      if (cartArticles) {
        cartArticles.innerHTML = getTotalItems();
      }

      generateAllProducts();
    } catch (error) {
      console.error('Auth failed or another error occurred:', error);
      document.location.href = './login.html';
    }
  },
  { once: true }
);
async function generateAllProducts() {
  const products = await api.getAllProducts();
  if (productContainer) {
    productContainer.innerHTML = '';
    for (const product of products) {
      productContainer.innerHTML += ProductCard(product);
    }
  }
}

function loadCart(username) {
  const key = `cart_${username}`;
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  try {
    const storedCart = localStorage.getItem(key);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Invalid cart data in localStorage:', error);
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}
window.addToCart = function (id) {
  const qtyInput = document.getElementById('qty-' + id);
  const amount = parseInt(qtyInput?.value || '1');

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.amount += amount;
  } else {
    cart.push({ id, amount });
  }

  localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
  cartArticles.innerHTML = getTotalItems();
  showToast('Product added');
};
window.removeFromCart = function (id) {
  showConfirm('Do you want to remove this item?', () => {
    const newCart = cart.filter((product) => product.id != id);
    cart = newCart;
    localStorage.setItem('cart_' + username, JSON.stringify(cart));
    loadItems();
    messageContainer.hidden = getTotalItems() > 0;
    cartArticles.innerHTML = getTotalItems();
    summarySection.hidden = !getTotalItems() > 0;
    showToast('Item removed', 'secondary');
    // });
  });
};
window.updateQuantity = function (id, inputElement) {
  const newQty = parseInt(inputElement.value);
  // Asegura que sea válido
  if (isNaN(newQty) || newQty < 1) return;

  const index = cart.findIndex((product) => product.id === id);
  if (index !== -1) {
    cart[index].amount = newQty;
    localStorage.setItem('cart_' + username, JSON.stringify(cart));
    showToast(`Updated amount`, 'info');
  }
  sumTotalItems();
  cartArticles.innerHTML = getTotalItems();


};

// buttons
btnLogout.addEventListener('click', async () => {
  await authRequest.logout();
  localStorage.removeItem(`cart_${username}`);
  location.href = './login.html';
});

cartBtn.addEventListener('click', async () => {
  await loadItems();
  messageContainer.hidden = getTotalItems() > 0;
  summarySection.hidden = !getTotalItems() > 0;
  sumTotalItems();
});
index.addEventListener('click', async () => {
  productContainer.innerHTML = generateAllProducts();
  messageContainer.hidden = true;
  summarySection.hidden = true;
});
async function loadItems() {
  productContainer.innerHTML = '';
  for (const { id, amount } of cart) {
    const product = await api.getProduct(id);
    productContainer.innerHTML += cartItem(product, amount);
  }
}

inputSearch.addEventListener('keyup', async (e) => {
  e.preventDefault();
  const name = document.getElementById('inputSearch').value.trim();
  if (name.length == 0) return generateAllProducts();
  try {
    const products = await api.searchProduct(name);
    if (productContainer) {
      productContainer.innerHTML = '';
      for (const product of products) {
        productContainer.innerHTML += ProductCard(product);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
function getTotalItems() {
  const totalArticles = cart.reduce((acc, item) => acc + item.amount, 0);
  cartArticles.hidden = totalArticles === 0;
  return totalArticles;
}

function sumTotalItems() {
  const totalAmount = document.getElementById('total-amount');

  // console.log(amount)
  const totalItems = document.getElementById('total-items');
  // totalAmount.innerHTML = amount
  totalItems.innerHTML = getTotalItems();
}
