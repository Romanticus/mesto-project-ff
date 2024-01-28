
import "./import.js";
import { createCard, handlerLikeCard, handlerDeleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const cardList = document.querySelector(".places__list");

const imageModal = document.querySelector(".popup_type_image");
const editModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");

const cardForm = document.forms["new-place"];

const editPopupOpenButton = document.querySelector(".profile__edit-button");
const newCardOpenButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const editProfileForm = document.forms["edit-profile"];
const profieTitle = document.querySelector(".profile__title");
const profieDescription = document.querySelector(".profile__description");

const handlerEventCard = {
  likeCard: handlerLikeCard,
  deleteCard: handlerDeleteCard,
  openImage: handlerOpenImageCard,
};

export function handlerOpenImageCard(cardInfo) {
  fillImagePrevievModal(cardInfo.target);
  openModal(imageModal);
}

initialCards.forEach((item) => {
  cardList.append(createCard(item, handlerEventCard));
});

function fillEditForm() {

  editProfileForm.name.value = profieTitle.textContent;
  editProfileForm.description.value = profieDescription.textContent;
}

function fillImagePrevievModal(cardInfo) {
  popupImage.alt = cardInfo.alt;
  popupImage.src = cardInfo.src;
  popupCaption.textContent = cardInfo.alt;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const newName = editProfileForm.name.value;
  const newDescription = editProfileForm.description.value;

  profieTitle.textContent = newName;
  profieDescription.textContent = newDescription;

  closeModal(editModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardInfo = {};
  newCardInfo.link = cardForm.link.value;
  newCardInfo.name = cardForm["place-name"].value;

  cardList.prepend(createCard(newCardInfo, handlerEventCard));
  closeModal(newCardModal);
  cardForm.reset();
}

closePopupButtons.forEach((item) =>
  item.addEventListener("click", () => {
    closeModal(document.querySelector(".popup_is-opened"));
  })
);

// Открываем изменение профиля
editPopupOpenButton.addEventListener("click", () => {
  fillEditForm();
  openModal(editModal);
});

// Открываем меню добавления карточки
newCardOpenButton.addEventListener("click", () => {
  openModal(newCardModal);
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);
