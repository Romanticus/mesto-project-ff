// import css файлов и др
import './import.js';
import { initialCards, createCard,HandlerLikeCard,HandlerDeleteCard,HandlerOpenImageCard } from './cards.js';
import { handleAddCardFormSubmit, fillEditForm,handleEditFormSubmit,fillImagePrevievModal, openModal,closeModal } from './modal.js';

const cardList = document.querySelector('.places__list');
// форма изменения профиля и 2 поля куда прилетят

// Начальные карточки
initialCards.forEach(item =>{
  cardList.append(createCard(item,HandlerLikeCard,HandlerDeleteCard,HandlerOpenImageCard));
});

// Выбрали попап
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Нашли форму
const editProfileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];

// Выбираем кнопку попапа
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const newCardOpenButton = document.querySelector('.profile__add-button');
// На все кнопки закрытия ставим закрытие открытого попапа
const closePopupButtons = document.querySelectorAll('.popup__close');
closePopupButtons.forEach((item)=>
  item.addEventListener('click', () => {
  closeModal(document.querySelector('.popup_is-opened'))
}));

// Открываем изменение профиля
editPopupOpenButton.addEventListener('click', () =>{
  fillEditForm();
  openModal(editModal);
});

// Открываем меню добавления карточки
newCardOpenButton.addEventListener('click',()=> {
  openModal(newCardModal);
})

editProfileForm.addEventListener('submit', handleEditFormSubmit);
cardForm.addEventListener('submit',handleAddCardFormSubmit);

// -------------------------------------------------------------

