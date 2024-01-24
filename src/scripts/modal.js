import {createCard, HandlerLikeCard,HandlerDeleteCard,HandlerOpenImageCard} from './cards.js'
// Выбрали попап
export const imageModal = document.querySelector('.popup_type_image');

// Открываем окно
export function openModal (modalElement) {
  modalElement.classList.add('popup_is-animated');
  setTimeout((modalElement)=> {
  modalElement.classList.add('popup_is-opened');
  }, 100, modalElement);
  document.addEventListener('keydown', ESCcloseModal);
  document.addEventListener('click', OverlayClose);
}
// Закрываем окно
export function closeModal(modalElement) {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', ESCcloseModal);
  document.removeEventListener('click', OverlayClose);
}
// Закрываем при ESC
function ESCcloseModal(event) {
    if (event.key === 'Escape') {
      console.log(event)
      closeModal(document.querySelector('.popup_is-opened'));
  }
}
// Закрываем при внешнем нажатии
function OverlayClose (event) {
  if (event.target.classList.contains('popup_is-opened')) {
    closeModal(event.target);
  }
}

// Заполняем форму изменения профиля
export function fillEditForm() {
// Нашли данные пользователя на странице сейчас
  editProfileForm.name.value = profieTitle.textContent;
  editProfileForm.description.value = profieDescription.textContent;
}

// Делаем рабочий просмотр фото
const popupImage = document.querySelector('.popup__image');
const popupTitle = document.querySelector('.popup__caption');
export function fillImagePrevievModal (cardInfo) {
  popupImage.alt= cardInfo.alt;
  popupImage.src = cardInfo.src;
  popupTitle.textContent = cardInfo.alt;

}

const editModal = document.querySelector('.popup_type_edit');
const editProfileForm = document.forms['edit-profile'];
const profieTitle = document.querySelector('.profile__title');
const profieDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы изменения профиля
export function handleEditFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей из свойства value
    const newName =  editProfileForm.name.value;
    const newDescription = editProfileForm.description.value;

    profieTitle.textContent = newName;
    profieDescription.textContent = newDescription;

    closeModal(editModal)
}

// new Cards modal
const cardForm = document.forms['new-place'];
const cardList = document.querySelector('.places__list');
const newCardModal = document.querySelector('.popup_type_new-card');

export function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardInfo ={};
   newCardInfo.link = cardForm.link.value;
   newCardInfo.name =  cardForm['place-name'].value;

  cardList.prepend(createCard(newCardInfo,HandlerLikeCard,HandlerDeleteCard,HandlerOpenImageCard ));
  closeModal(newCardModal);
  cardForm.link.value='';
  cardForm['place-name'].value='';
}
