"use strict";

class CardGame {
  constructor(level) {
    this.level = level;
    this.intro = document.getElementById("intro");
    this.gameTable = document.getElementById("game-table");
    this.gameArea = document.getElementById("game-area");
    this.cards = [];
  }

  startGame() {
    this.intro.classList.remove("visible");
    this.gameTable.classList.add("visible");

    this.generateCards();
  }
  // создание массива объектов
  generateCards() {
    for (let i = 0; i < this.level; i++) {
      this.cards.push({
        type: i === 0 ? "bug" : "gameOver",
      });
    }
    this.shuffleCards();
  }
  // алгоритм фишера йетса
  shuffleCards() {
    for (let k = this.cards.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [this.cards[k], this.cards[j]] = [this.cards[j], this.cards[k]];
    }
    this.addCards();
  }
  // Добавление карт в разметку
  addCards() {
    this.cards.forEach((card) => {
      this.gameArea.insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
          <div class="card-front card-face"><img alt="card-front" src="img/${card.type}-cart.png"></div>
          <div class="card-back card-face"><img alt="card-back" src="img/card-back.png"></div>
        </div>`
      );
    });
    this.readyToFlip();
  }
  // Переворот карты
  readyToFlip() {
    let canFlip = true;
    const newCards = document.querySelectorAll(".card");
    newCards.forEach((card) => {
      card.addEventListener("click", () => {
        if (canFlip) {
          card.classList.add("clicked");
          canFlip = false;
          const clickedCard = document.querySelector(".clicked");
          this.restartGame(clickedCard);
        }
      });
    });
  }
  restartGame(clickedCard) {
    clickedCard.addEventListener("click", () => {
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
    this.level = null;
  }

  setLevel() {
    this.levelButton.forEach((button) => {
      const buttonValue = button.dataset.numberOfCards;
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
        const game = new CardGame(this.level);
        game.startGame();
        this.level = 0;
      }
    });
  }
}

const runGame = () => {
  const goGame = new StartMenu();
  goGame.setLevel();
};

const onDocumentLoad = () => {
  runGame();
};

document.addEventListener("DOMContentLoaded", onDocumentLoad);
