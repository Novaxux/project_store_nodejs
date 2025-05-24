export const modal = () => {
  return `
    <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="alertModalLabel">Alert</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="alertModalBody"></div>
            <div class="modal-footer">
            <button type="button" id="btnConfirmAlert" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
        </div>
      </div>
    </div>
  `;
};


export function showAlert(message) {
  const modalBody = document.getElementById('alertModalBody');
  modalBody.textContent = message;
  const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
  alertModal.show();
}
export function showConfirm(message, onConfirm) {
  const modalBody = document.getElementById('alertModalBody');
  const confirmBtn = document.getElementById('btnConfirmAlert');
  const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));

  modalBody.textContent = message;
  alertModal.show();

  confirmBtn.onclick = () => {
    alertModal.hide();
    onConfirm();
  };
}
