
const cardTemplate = document.querySelector('#card-template').content;

function createCard (cardInfo, deleteCardCallBack){
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  cardClone.querySelector('.card__title').textContent = cardInfo.name;
  cardClone.querySelector('.card__image').src = cardInfo.link;

  const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => {deleteCardCallBack(cardClone);});

  return cardClone;
}

function deleteCard (cardInfo) {
  cardInfo.remove();
}

initialCards.forEach(item =>{
  document.querySelector('.places__list').append(createCard(item, deleteCard));
});
