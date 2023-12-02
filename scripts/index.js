
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard (cardInfo){
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  cardClone.querySelector('.card__title').textContent = cardInfo.name;
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;

  const cardDeleteButton = cardClone.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => {deleteCard(cardClone);});

  return cardClone;
}

function deleteCard (cardInfo) {
  cardInfo.remove();
}

initialCards.forEach(item =>{
  cardList.append(createCard(item, deleteCard));
});
