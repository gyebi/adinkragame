//shuffle the cards
const adinkraSymbols = [
  {
    symbol: "assets/Gye_Nyame.png",
    name: "Gye_Nyame",
    meaning: "Except God. A symbol expressing the omnipotence and supremacy of God."
  },
  {
    symbol: "assets/Sankofa.png",
    name: "Sankofa",
    meaning: "Go back and get it. A symbol of learning from the past to build the future."
  },
  {
    symbol: "assets/Sankofa_Akoma.png",
    name: "Sankofa_Akoma",
    meaning: "An alternative Sankofa representation symbolizing returning to one's roots for wisdom."
  },
  {
    symbol: "assets/Adinkrahene.png",
    name: "Adinkrahene",
    meaning: "King of the Adinkra symbols. A symbol of authority, leadership, and charisma."
  },
  {
    symbol: "assets/Akoma.png",
    name: "Akoma",
    meaning: "The heart. A symbol of patience and tolerance."
  },
  {
    symbol: "assets/Asase_Ye_Duru.png",
    name: "Asese_Ye_Duru",
    meaning: " The earth has weight. A symbol of the divinity of the earth and the importance of nurturing it."
  },
  {
    symbol: "assets/Tamfo_Bebre.png",
    name: "Tamfo_Bebre",
    meaning: "Enemy of the wicked. A symbol of strength and courage to overcome adversaries."
  },
  {
    symbol: "assets/Aya.png",
    name: "Aya",
    meaning: "Fern. A symbol of endurance and resourcefulness."
  }
];

const gameScreen = document.getElementById("game-screen");
const introScreen = document.getElementById("intro-screen");
const skipBtn = document.querySelector(".skip-intro-btn");
const restartBtn = document.getElementById("restart-btn");
const showIntroBtn = document.getElementById("show-intro-btn");
const gameBoard = document.getElementById("game-board");
const matchedList = document.getElementById("matched-list");

const matchedSymbols = new Set(); // prevents duplicates
const cards = [...adinkraSymbols, ...adinkraSymbols]; // duplicate icons for pairs

//flip card
let flippedCards = [];
let lockBoard = false;
let attempts = 0;
const scoreDisplay = document.createElement("p");

function startGame() {
  introScreen.classList.add("fade-out");

  setTimeout(() => {
    showGameScreen();
  }, 500); // matches CSS transition time
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

//render the board
function createBoard() {
  gameBoard.innerHTML = ""; // clear previous game

  shuffle(cards).forEach(cardData => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.dataset.symbol = cardData.symbol;

    card.innerHTML = `<img src="${cardData.symbol}" alt="" class="card-image">`;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

//MATCHING Logic
function updateScore() {
  scoreDisplay.textContent = `Attempts: ${attempts}`;
}

function getSymbolDataByPath(symbolPath) {
  return adinkraSymbols.find(item => item.symbol === symbolPath);
}

function checkForMatch() {
  const [card1, card2] = flippedCards;
  attempts++;
  updateScore();

  if (card1.dataset.symbol === card2.dataset.symbol) {
    const symbolPath = card1.dataset.symbol;

    if (!matchedSymbols.has(symbolPath)) {
      matchedSymbols.add(symbolPath);

      const symbolData = getSymbolDataByPath(symbolPath);

      if (symbolData) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${symbolData.name}:</strong><br>${symbolData.meaning}`;
        matchedList.prepend(li);
      }
    }

    flippedCards = [];

    checkWin();
  } else {
    lockBoard = true;
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      lockBoard = false;
    }, 1000);
  }
}

function checkWin() {
  const flippedCardsCount = document.querySelectorAll(".card.flipped").length;

  if (flippedCardsCount === cards.length) {
    setTimeout(() => {
      alert(`Congratulations! You won in ${attempts} attempts.`);
    }, 500);
  }
}

function resetGameState() {
  attempts = 0;
  updateScore();
  flippedCards = [];
  lockBoard = false;
  matchedList.innerHTML = "";
  matchedSymbols.clear();
  gameBoard.innerHTML = "";
}

function showGameScreen() {
  introScreen.style.display = "none";
  gameScreen.classList.remove("hidden");
  resetGameState();
  createBoard();
}

function showIntroScreen() {
  introScreen.classList.remove("fade-out");
  introScreen.style.display = "block";
  gameScreen.classList.add("hidden");
}

function initializeGame() {
  gameScreen.insertBefore(scoreDisplay, gameBoard);
  updateScore();

  skipBtn.addEventListener("click", () => {
    localStorage.setItem("introSeen", "true");
    localStorage.removeItem("skipIntro");
    startGame();
  });

  restartBtn.addEventListener("click", () => {
    resetGameState();
    createBoard();
  });

  showIntroBtn.addEventListener("click", () => {
    showIntroScreen();
  });

  const introSeen =
    localStorage.getItem("introSeen") === "true" ||
    localStorage.getItem("skipIntro") === "true";

  if (introSeen) {
    showGameScreen();
  } else {
    showIntroScreen();
  }
}

initializeGame();
