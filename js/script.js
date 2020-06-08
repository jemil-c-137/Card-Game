const startButton = document.querySelector('.btn-start');
const difficultyButton = document.querySelectorAll('.btn-difficulty');
const gameOverCard = document.querySelector('.game-over');
const gameField = document.querySelector('.game-table');

let num;


difficultyButton.forEach(button  => {
  let btnData = button.dataset.numberOfCards;
  button.addEventListener('click', () => {
    num = btnData
  })
})

startButton.addEventListener('click', () => {
  const intro = document.querySelector('.intro');
  const gameTable = document.querySelector('.game-table-wrapper');
  
  function addCards(grid) {
    for (i = 2; i < num; i++) {
      let cardHTML = gameOverCard.innerHTML;
      let newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.classList.add('created');
      newCard.innerHTML = cardHTML;
      grid.appendChild(newCard);
    }
  }
  addCards(gameField);  

  let cardsColoda = document.querySelectorAll('.card');
  const cardBack = document.querySelectorAll('.card-back');
  
  function startGame() {
    intro.classList.remove('visible');
    gameTable.classList.add('visible');
    shuffleCards(cardsColoda);
  }
  startGame();
  
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
  flipCard(cardsColoda);


  function restartGame(array) {
    let createdCards = document.querySelectorAll('.created');
    let clicked = document.querySelector('.clicked');
    array.forEach(arr => {
      arr.addEventListener('click', () => {
        intro.classList.add('visible');
        gameTable.classList.remove('visible');
        for (i = 0; i < createdCards.length; i++) {
          createdCards[i].remove();
        }
        clicked.classList.remove('clicked');
      })
    })
  }
})

