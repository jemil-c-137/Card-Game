const startButton = document.querySelector('.btn-start');
const difficultyButton = document.querySelectorAll('.btn-difficulty');
const gameOverCard = document.querySelector('.game-over');
const gameField = document.querySelector('.game-table');
// Перменная для хранения количества карт
let difficultyLevel;

// Кнопки уровней сложности
difficultyButton.forEach(button  => {
  let btnValue = button.dataset.numberOfCards;
  button.addEventListener('click', () => {
    difficultyLevel = btnValue;
    getActive(difficultyButton)
  })
})

function getActive(btns) {
  btns.forEach(btn => {
    btn.classList.remove('active');
  })
  event.target.classList.add('active');
}

// Кнопка начала игры
startButton.addEventListener('click', () => {
  if(difficultyLevel) {
    newGame();
  }
})

// Начало новой игры
function newGame() {
  const intro = document.querySelector('.intro');
  const gameTable = document.querySelector('.game-table-wrapper');
  
  // Добавление необходимого кол-ва карт
  function addCards(cardsArea) {
    for (i = 2; i < difficultyLevel; i++) {
      let cardHTML = gameOverCard.innerHTML;
      let newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.classList.add('created');
      newCard.innerHTML = cardHTML;
      cardsArea.appendChild(newCard);
    }
  }
  addCards(gameField);  

  let cards = document.querySelectorAll('.card');
  const cardBack = document.querySelectorAll('.card-front');
  
  function startGame() {
    intro.classList.remove('visible');
    gameTable.classList.add('visible');
    shuffleCards(cards);
  }
  startGame();

  //Тасование карт
  function shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
    }
  }

  function flipCard(cardsArray) {
    let canFlipCard = true;
    cardsArray.forEach(card => {
      card.addEventListener('click', () => {
        if (canFlipCard) {
          card.classList.add('clicked');
          canFlipCard = false;
          restartGame(cardBack);
        } 
      })
    })
  }
  flipCard(cards);

  // Конец игры, удаление карт, переход на начальный экран
  function restartGame(oldCards) {
    let createdCards = document.querySelectorAll('.created');
    let clicked = document.querySelector('.clicked');
    oldCards.forEach(oldCard => {
      oldCard.addEventListener('click', () => {
        intro.classList.add('visible');
        gameTable.classList.remove('visible');
        for (i = 0; i < createdCards.length; i++) {
          createdCards[i].remove();
        }
        clicked.classList.remove('clicked');
        difficultyLevel = undefined;
        getActive(difficultyButton)
      })
    })
  }
}
