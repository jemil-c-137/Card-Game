"use strict";

class CardGame {
  constructor(level) {
    this.level = level;
    setTimeout(() => {
      console.log(console.log);
    }, 5000);
    this.canFlip = true;
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
    for (let i = 0; i < this.level; i++) {
      cards.push({
        isBug: i === 0,
        type: i === 0 ? "bug" : "gameOver",
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
      this.newCard = document.createElement("div");
      this.newCard.classList.add("card");
      this.newCard.addEventListener("click", this.flipCard);

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
      const game = this.gameArea.appendChild(this.newCard);

      game.appendChild(cardFront);
      game.appendChild(cardBack);
      cardFront.appendChild(cardFrontImg);
      cardBack.appendChild(cardBackImg);
    });
  }

  flipCard() {
    this.classList.add("clicked");
    console.log("hello");
  }

  restartGame() {
    console.log("im here");
    this.intro.classList.add("visible");
    this.gameTable.classList.remove("visible");
    this.gameArea.innerHTML = null;
  }
}

const runGame = () => {
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
  let game = new CardGame(8);

  startButton.addEventListener("click", () => {
    if (difficultyLevel) {
      game.startGame();
    }
  });
};

if (document.readyState === "loading") {
  console.log("hello");
  document.addEventListener("DOMContentLoaded", runGame());
} else {
  console.log("im here");
  runGame();
}
