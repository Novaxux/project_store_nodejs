export const cartItem = ({ name, price, image, stock, id },amount) => {
  return `
        <div class="col">
          <div class="card border-light h-100 shadow-sm ">
            <img src="${image}" class="card-img-top" alt="${name}" style="object-fit: cover; height: 250px;">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text mb-1"><strong>Price:</strong> $${price}</p>
              
              <div class="input-group mt-3">
                <span class="input-group-text">Qty</span>
                <input type="number" class="form-control" id="cart-qty-${id}"  value="${amount}" min="1" max="${stock}" oninput="updateQuantity(${id}, this)">
              </div>
            </div>
            <div class="card-footer bg-transparent border-top-0">
              <button class="btn btn-outline-danger  w-100" onclick="removeFromCart(${id})">Remove from cart</button>
            </div>
          </div>
        </div>
      `;
};
