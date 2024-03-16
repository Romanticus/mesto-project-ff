import { data } from "autoprefixer";
import { deleteUserCard, likeAddRequest, likeDeleteRequest } from "./api";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardInfo, cardCallbacks) {
  const cardClone = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardClone.querySelector(".card__image");
  cardClone.querySelector(".card__title").textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  if (cardCallbacks.myId == cardInfo.owner._id) {
    cardClone.addEventListener("click", (evt) => {
      cardCallbacks.deleteCard(evt, cardInfo);
    });
  } else {
    const cardDeleteButton = cardClone.querySelector(".card__delete-button");
    cardDeleteButton.remove();
  }

  const cardLikeButton = cardClone.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", (evt) => {
    cardCallbacks.likeCard(evt, cardInfo, cardCallbacks, cardLikeCounter);
  });
  if (checkMyLike(cardInfo, cardCallbacks)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  const cardLikeCounter = cardClone.querySelector(".card__like-counter");
  if (cardInfo.likes.length > 0) {
    cardLikeCounter.textContent = cardInfo.likes.length;
  }

  cardImage.addEventListener("click", cardCallbacks.openImage);
  return cardClone;
}

function checkMyLike(cardInfo, cardCallbacks) {
  if (
    cardInfo.likes.some((likeOwner) => {
      return likeOwner._id == cardCallbacks.myId;
    })
  ) {
    return true;
  } else {
    return false;
  }
}

function handlerRequestLikeCounter(
  cardInfo,
  cardWithLike,
  likeButton,
  cardLikeCounter
) {
  cardInfo.likes = cardWithLike.likes;
  likeButton.target.classList.toggle("card__like-button_is-active");
  if (cardWithLike.likes.length > 0) {
    cardLikeCounter.textContent = cardWithLike.likes.length;
  } else {
    cardLikeCounter.textContent = "";
  }
}

export function handlerLikeCard(
  likeButton,
  cardInfo,
  cardCallbacks,
  cardLikeCounter
) {
  if (checkMyLike(cardInfo, cardCallbacks)) {
    likeDeleteRequest(cardInfo).then((cardWithLike) => {
      handlerRequestLikeCounter(
        cardInfo,
        cardWithLike,
        likeButton,
        cardLikeCounter
      );
    });
  } else {
    likeAddRequest(cardInfo).then((cardWithLike) => {
      handlerRequestLikeCounter(
        cardInfo,
        cardWithLike,
        likeButton,
        cardLikeCounter
      );
    });
  }
}

export function handlerDeleteCard(card, cardInfo) {
  if (card.target.classList.contains("card__delete-button")) {
    const currentCard = card.currentTarget;
    deleteUserCard(cardInfo._id)
      .then((data) => {
        if (data) {
          currentCard.remove();
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }
}

