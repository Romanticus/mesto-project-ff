// Открываем окно
export function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", escapeCloseModal);
  document.addEventListener("click", overlayClose);
}
// Закрываем окно
export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escapeCloseModal);
  document.removeEventListener("keydown", overlayClose);
}
// Закрываем при ESC
function escapeCloseModal(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}
// Закрываем при внешнем нажатии
function overlayClose(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }
}
