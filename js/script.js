"use strict";

// Перменная для хранения количества карт
class CardGame {
  constructor(level) {
    this.difficultyLevel = level;
    this.intro = document.getElementById("intro");
    this.gameTable = document.getElementById("game-table");
    this.gameArea = document.getElementById("game-area");
  }

  startGame() {
    this.intro.classList.remove("visible");
    this.gameTable.classList.add("visible");
    this.cards = [];
    this.generateCards(this.cards);
  }

  generateCards(cards) {
    for (let i = 0; i < difficultyLevel; i++) {
      cards.push({
        isBug: i === 0,
        type: i === 0 ? "bug" : "gameOver",
        canFlip: true,
      });
    }
    console.log(cards);
    this.shuffleCards(this.cards);
  }

  shuffleCards(cards) {
    for (let k = cards.length - 1; k > 0; k--) {
      let j = Math.floor(Math.random() * (k + 1));
      let temp = cards[j];
      cards[j] = cards[k];
      cards[k] = temp;
    }
    this.addCards(this.cards);
  }

  addCards(cards) {
    cards.forEach((card) => {
      console.log(cards);
      const newCard = document.createElement("div");
      newCard.classList.add("card");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front", "card-face");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back", "card-face");

      const cardFrontImg = document.createElement("img");
      cardFrontImg.src = `img/${card.type}-cart.png`;

      const cardBackImg = document.createElement("img");
      cardBackImg.src = "img/card-back.png";

      // create Card
      console.log(this.gameArea);
      const game = this.gameArea.appendChild(newCard);

      game.appendChild(cardFront);
      game.appendChild(cardBack);
      cardFront.appendChild(cardFrontImg);
      cardBack.appendChild(cardBackImg);
    });
    this.checkToFlip(cards);
  }

  checkToFlip(cards) {
    cards.forEach((card) => {
      if (card.canFlip) {
        console.log(card);
        card.addEventListener("click", this.flipCard(card));
      }
    });
  }

  flipCard(card) {
    card.classList.add("clicked");
    card.addEventListener("click", restartGame);
    this.cards.canFlip = false;
  }

  restartGame() {
    this.intro.classList.add("visible");
    this.gameTable.classList.remove("visible");
    this.gameArea.innerHTML = null;
  }
}

const startButton = document.querySelector(".btn-start");
const difficultyButton = document.querySelectorAll(".btn-difficulty");
let difficultyLevel;

// Кнопки уровней сложности
difficultyButton.forEach((button) => {
  const btnValue = button.dataset.numberOfCards; // изменил на конст
  button.addEventListener("click", () => {
    difficultyLevel = btnValue;
    removeActive(difficultyButton);
    button.classList.add("active"); // Изменил глобальную переменную
  });
});

function removeActive(btns) {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}

// Кнопка начала игры
let game = new CardGame(difficultyLevel);
startButton.addEventListener("click", () => {
  if (difficultyLevel) {
    game.startGame();
  }
});

// НЕ ОБРАЩАЕМ ВНИМАНИЕ :) СТАРЫЙ КОД

/* 
// Начало новой игры
function newGame() {
  const intro = document.querySelector('.intro');
  const gameTable = document.querySelector('.game-table-wrapper');

  // Добавление необходимого кол-ва карт
  let addCards = cardsArea => {

    for (let i = 2; i < difficultyLevel; i++) { // Объявил I явно
      const cardHTML = gameOverCard.innerHTML; // изменил на конст
      const newCard = document.createElement('div'); // тут тоже
      newCard.classList.add('card');
      newCard.classList.add('created');
      newCard.innerHTML = cardHTML;
      cardsArea.appendChild(newCard);
    }
  }
  addCards(gameField);

  let cards = document.querySelectorAll('.card');
  const cardBack = document.querySelectorAll('.card-front');

  let startGame = () => {
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

  let flipCard = cardsArray => {
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
  let restartGame = oldCards => {
    let createdCards = document.querySelectorAll('.created');
    let clicked = document.querySelector('.clicked');
    oldCards.forEach(oldCard => {                // Исправил на forEach
      oldCard.addEventListener('click', () => {
        intro.classList.add('visible');
        gameTable.classList.remove('visible');
        createdCards.forEach(createdCard => {
          createdCard.remove();
        })
        clicked.classList.remove('clicked');
        difficultyLevel = undefined;
        getActive(difficultyButton)
      })
    })
  }
}
*/
/* 
const gameField = document.getElementById("game-table");
const cards = [];
const generateCards = (cards) => {
  for (let i = 0; i < num; i++) {
    cards.push({
      isBug: i === 0,
      type: i === 0 ? "bug" : "gameOver",
    });
  }
  console.log(cards);
};

generateCards(cards);

const getArray = (cards) => {
  for (let k = cards.length - 1; k > 0; k--) {
    let j = Math.floor(Math.random() * (k + 1));
    let temp = cards[j];
    cards[j] = cards[k];
    cards[k] = temp;
  }
};

getArray(cards);
let canFlip = true;

function flipCard() {
  if (canFlip) {
    this.classList.add("clicked");
    canFlip = false;
    this.addEventListener("click", () => {
      gameField.innerHTML = null;
    });
  }
}
*/

/*if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', flipCard(cards));
} else {
  flipCard(cards);
}*/

/*
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', flipCard(cards));
} else {
  flipCard(cards);
}
*/
