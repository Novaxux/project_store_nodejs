export const orderCard = ({ id, date, total }) => {
  const formattedDate = new Date(date).toLocaleString();

  return `
      <div class="card shadow-sm mb-4 border-0" id="order-card-${id}">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>Order #${id}</span>
          <button class="btn btn-sm btn-outline-light" id="toggle-details-${id}" onclick="toggleOrderDetails(${id})">
            View Details
          </button>
        </div>
        <div class="card-body bg-light">
          <p class="mb-2"><strong>Date:</strong> ${formattedDate}</p>
          <p class="mb-0"><strong>Total:</strong> $${parseFloat(total).toFixed(2)}</p>
        </div>
        <div id=orderDetails${id} class="card-body bg-light">
        </div>
      </div>
    `;
};
