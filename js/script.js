"use strict";

class CardGame {
  constructor(level) {
    this.level = level;
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
  // создание массива объектов
  generateCards(cards) {
    for (let i = 0; i < this.level; i++) {
      cards.push({
        isBug: i === 0,
        type: i === 0 ? "bug" : "gameOver",
      });
    }
    this.shuffleCards(this.cards);
  }
  // алгоритм фишера йетса
  shuffleCards(cards) {
    for (let k = cards.length - 1; k > 0; k--) {
      let j = Math.floor(Math.random() * (k + 1));
      let temp = cards[j];
      cards[j] = cards[k];
      cards[k] = temp;
    }
    this.addCards(this.cards);
  }
  // Добавление карт в разметку
  addCards(cards) {
    cards.forEach((card) => {
      this.newCard = document.createElement("div");
      this.newCard.classList.add("card");
      // this.newCard.addEventListener("click", this.flipCard);

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front", "card-face");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back", "card-face");

      const cardFrontImg = document.createElement("img");
      cardFrontImg.src = `img/${card.type}-cart.png`;

      const cardBackImg = document.createElement("img");
      cardBackImg.src = "img/card-back.png";

      // create Card
      const game = this.gameArea.appendChild(this.newCard);

      game.appendChild(cardFront);
      game.appendChild(cardBack);
      cardFront.appendChild(cardFrontImg);
      cardBack.appendChild(cardBackImg);
    });
    this.readyToFlip();
  }
  // Переворот карты
  readyToFlip() {
    this.canFlip = true;
    this.newCards = document.querySelectorAll(".card");
    this.newCards.forEach((card) => {
      card.addEventListener("click", () => {
        if (this.canFlip) {
          card.classList.add("clicked");
          this.canFlip = false;
          this.clickedCard = document.querySelector(".clicked");
          this.restartGame(this.clickedCard);
        }
      });
    });
  }
  /*
  flipCard() {
    this.classList.add("clicked");
  }
*/
  restartGame() {
    this.clickedCard.addEventListener("click", () => {
      this.intro.classList.add("visible");
      this.gameTable.classList.remove("visible");
      this.gameArea.innerHTML = null;
    });
  }
}

class StartMenu {
  constructor() {
    this.startButton = document.querySelector(".btn-start");
    this.levelButton = document.querySelectorAll(".btn-difficulty");
    this.level;
  }

  setLevel(level) {
    this.levelButton.forEach((button) => {
      let buttonValue = button.dataset.numberOfCards;
      button.addEventListener("click", () => {
        this.level = buttonValue;
        this.removeActive(this.levelButton);
        button.classList.add("active");
        this.prepareGame(this.level);
      });
    });
  }

  removeActive() {
    this.levelButton.forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  prepareGame() {
    this.startButton.addEventListener("click", () => {
      if (this.level) {
        let game = new CardGame(this.level);
        game.startGame();
        this.level = 0;
      }
    });
  }
}

let runerGame = () => {
  let goGame = new StartMenu();
  goGame.setLevel();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runerGame());
} else {
  runerGame();
}
/*
const runGame = (start) => {
  const startButton = document.querySelector(".btn-start");
  const difficultyButton = document.querySelectorAll(".btn-difficulty");
  let difficultyLevel;

  console.log(difficultyLevel);
  setTimeout(() => {
    console.log(difficultyLevel);
  }, 3000);

  // Кнопки уровней сложности
  difficultyButton.forEach((button) => {
    const btnValue = button.dataset.numberOfCards;
    button.addEventListener("click", () => {
      difficultyLevel = btnValue;
      removeActive(difficultyButton);
      button.classList.add("active");
    });
  });

  function removeActive(btns) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  }

  // Кнопка начала игры

  startButton.addEventListener("click", () => {
    if (difficultyLevel) {
      let game = new CardGame(difficultyLevel);
      game.startGame();
    }
  });
};
*/
