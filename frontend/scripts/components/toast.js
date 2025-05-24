export const toast = () => {
  return `
      <!-- Toast de mensaje temporal -->
      <div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
        <div id="toastAlert" class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" id="toastBody">Placeholder message</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    `;
};

export function showToast(message, type = 'success') {
  const toastElement = document.getElementById('toastAlert');
  const toastBody = document.getElementById('toastBody');
  toastBody.textContent = message;
  // Cambiar color del toast según tipo (success, danger, warning, info)
  toastElement.className = `toast align-items-center text-white bg-${type} border-0`;
  const toast = new bootstrap.Toast(toastElement, {
    delay: 3000,
  });
  toast.show();
}