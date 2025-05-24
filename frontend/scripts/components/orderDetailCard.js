export const OrderDetailCard = ({ id, date, total }) => {
  const formattedDate = new Date(date).toLocaleString();

  return `
      <div class="card shadow-sm mb-4 border-0">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span>Order #${id}</span>
          <button class="btn btn-sm btn-light" onclick="showOrderDetails(${id})">
            View Details
          </button>
        </div>
        <div class="card-body bg-light">
          <p class="mb-2"><strong>Date:</strong> ${formattedDate}</p>
          <p class="mb-0"><strong>Total:</strong> $${parseFloat(total).toFixed(2)}</p>
        </div>
      </div>
    `;
};
