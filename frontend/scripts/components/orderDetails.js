export const orderDetails = ({ price, amount, product_name }) => {
  return `
    <div class="card shadow-sm mb-3">
      <div class="card-body py-2 px-3">
        <div class="row align-items-center">
          <div class="col-6">
            <h6 class="mb-1 fw-bold text-primary">${product_name}</h6>
          </div>
          <div class="col-3 text-end">
            <small class="text-muted">Price:</small><br>
            <span class="text-success fw-semibold">$${price}</span>
          </div>
          <div class="col-3 text-end">
            <small class="text-muted">Amount:</small><br>
            <span class="fw-semibold">${amount}</span>
          </div>
        </div>
      </div>
    </div>
  `;
};
