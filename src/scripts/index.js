import "./import.js";
import { createCard, handlerLikeCard, handlerDeleteCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserInfo,
  setUserInfo,
  sendNewCard,
  updateAvatarRequest,
} from "./api.js";
const cardList = document.querySelector(".places__list");

const imageModal = document.querySelector(".popup_type_image");
const editModal = document.querySelector(".popup_type_edit");
const newCardModal = document.querySelector(".popup_type_new-card");
const updateAvatarModal = document.querySelector(".popup_type_update-avatar");

const cardForm = document.forms["new-place"];

const editPopupOpenButton = document.querySelector(".profile__edit-button");
const newCardOpenButton = document.querySelector(".profile__add-button");
const closePopupButtons = document.querySelectorAll(".popup__close");

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const updateAvatarForm = document.forms["update-avatar"];
const editProfileForm = document.forms["edit-profile"];
const newCardForm = document.forms["new-place"];
const profieTitle = document.querySelector(".profile__title");
const profieDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const profileAvatarButton = document.querySelector(".profile__image");
const addCardButtonConfirm = newCardForm.querySelector(".popup__button");
const editProfileFormButtonConfirm =
  editProfileForm.querySelector(".popup__button");
const updateAvatarButtonConfirm =
  updateAvatarForm.querySelector(".popup__button");

let myUserId;

const handlerEventCard = {
  likeCard: handlerLikeCard,
  deleteCard: handlerDeleteCard,
  openImage: handlerOpenImageCard,
  myId: "",
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export function handlerOpenImageCard(cardInfo) {
  fillImagePrevievModal(cardInfo.target);
  openModal(imageModal);
}

function fillEditForm() {
  editProfileForm.name.value = profieTitle.textContent;
  editProfileForm.description.value = profieDescription.textContent;
}

function fillImagePrevievModal(cardInfo) {
  popupImage.alt = cardInfo.alt;
  popupImage.src = cardInfo.src;
  popupCaption.textContent = cardInfo.alt;
}

function fillProfile(newName, newDescription, imageUrl) {
  profieTitle.textContent = newName;
  profieDescription.textContent = newDescription;
  profileAvatar.style.backgroundImage = `URL('${imageUrl}')`;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editProfileFormButtonConfirm.textContent = "Сохранение...";
  setUserInfo(editProfileForm.name.value, editProfileForm.description.value)
    .then((data) => {
      fillProfile(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfileFormButtonConfirm.textContent = "Сохранить";
      closeModal(editProfileForm);
      editProfileForm.reset();
    });

  closeModal(editModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addCardButtonConfirm.textContent = "Сохранение...";
  sendNewCard(cardForm["place-name"].value, cardForm.link.value)
    .then((data) => {
      cardList.prepend(createCard(data, handlerEventCard));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardButtonConfirm.textContent = "Сохранить";
      closeModal(newCardModal);
      cardForm.reset();
    });
}

function handleUpdateAvatarFormSubmit(evt) {
  evt.preventDefault();
  updateAvatarButtonConfirm.textContent = "Сохранение...";
  updateAvatarRequest(updateAvatarForm["avatar-link"].value)
    .then((data) => {
      fillProfile(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      updateAvatarButtonConfirm.textContent = "Сохранить";
      closeModal(updateAvatarModal);
      updateAvatarForm.reset();
    });
}

closePopupButtons.forEach((item) =>
  item.addEventListener("click", () => {
    closeModal(document.querySelector(".popup_is-opened"));
  })
);

function disableButtonForm(formElement, popupSelectors) {
  const buttonElement = formElement.querySelector(
    popupSelectors.submitButtonSelector
  );
  if (!buttonElement.classList.contains(popupSelectors.inactiveButtonClass)) {
    buttonElement.classList.toggle(popupSelectors.inactiveButtonClass);
  }
}

// Открываем изменение профиля
editPopupOpenButton.addEventListener("click", () => {
  clearValidation(editProfileForm, validationConfig);
  fillEditForm();
  disableButtonForm(newCardForm, validationConfig);
  openModal(editModal);
});

// Открываем меню добавления карточки
newCardOpenButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  disableButtonForm(newCardForm, validationConfig);
  openModal(newCardModal);
  newCardForm.reset();
});

profileAvatarButton.addEventListener("click", () => {
  // console.log(updateAvatarModal,updateAvatarForm);
  clearValidation(updateAvatarForm, validationConfig);
  disableButtonForm(updateAvatarForm, validationConfig);
  openModal(updateAvatarModal);
  console.log();
  updateAvatarForm.reset();
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardFormSubmit);
updateAvatarForm.addEventListener("submit", handleUpdateAvatarFormSubmit);
enableValidation(validationConfig);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([resInitCard, resUserInfo]) => {
    handlerEventCard.myId = resUserInfo._id;
    fillProfile(resUserInfo.name, resUserInfo.about, resUserInfo.avatar);
    resInitCard.forEach((card) => {
      cardList.append(createCard(card, handlerEventCard));
    });
  })
  .catch((err) => {
    console.log(err);
  });
