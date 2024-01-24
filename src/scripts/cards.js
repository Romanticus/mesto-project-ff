import { imageModal, openModal,fillImagePrevievModal} from './modal.js';
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
const cardTemplate = document.querySelector('#card-template').content;

export function createCard (cardInfo,likeCard, deleteCard, OpenImage){
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  cardClone.querySelector('.card__title').textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  // const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardClone.addEventListener('click', deleteCard);

  const cardLikeButton = cardClone.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click',OpenImage);
  return cardClone;
}
export function HandlerOpenImageCard (cardInfo) {
  fillImagePrevievModal(cardInfo.target);
  openModal(imageModal);
}

export function HandlerLikeCard(cardInfo) {
  cardInfo.currentTarget.classList.toggle('card__like-button_is-active');
}

export function HandlerDeleteCard (cardInfo) {
  if (cardInfo.target.classList.contains('card__delete-button')){
  cardInfo.currentTarget.remove();}
}
