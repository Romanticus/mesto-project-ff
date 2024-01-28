const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardInfo, cardCallbacks) {
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardClone.querySelector(".card__image");
  cardClone.querySelector(".card__title").textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  // const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardClone.addEventListener("click", cardCallbacks.deleteCard);

  const cardLikeButton = cardClone.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", cardCallbacks.likeCard);

  cardImage.addEventListener("click", cardCallbacks.openImage);
  return cardClone;
}

export function handlerLikeCard(likeButton) {
  likeButton.currentTarget.classList.toggle("card__like-button_is-active");
}

export function handlerDeleteCard(card) {
  if (card.target.classList.contains("card__delete-button")) {
    card.currentTarget.remove();
  }
}
