export const ProductCard = ({ name, price, stock, image, id }) => {
  return `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${image}" class="card-img-top" alt="${name}" style="object-fit: cover; height: 250px;">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text mb-1"><strong>Price:</strong> $${price}</p>
            <p class="card-text"><strong>Stock:</strong> ${stock} units</p>
            <div class="input-group mt-3">
              <span class="input-group-text">Qty</span>
              <input type="number" class="form-control" id="qty-${id}" value="1" min="1" max="${stock}">
            </div>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <button class="btn btn-primary w-100" onclick="addToCart(${id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
};
