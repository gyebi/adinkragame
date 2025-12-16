
const gameBoard = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');

//shuffle the cards
const symbols = [
  "assets/adinkra_1.png",
  "assets/adinkra_2.png",
  "assets/adinkra_3.png",
  "assets/adinkra_4.png",
  "assets/adinkra_5.png",
  "assets/adinkra_6.png",
  "assets/adinkra_7.png",
  "assets/adinkra_8.png"
];
const names = [ "Gye Nyame", "Sankofa", "Dwennimmen",  "Eban",  "Fawohodie", "Akoko Nan", "Mate Masie", "Nsoromma",];

const cards = [...symbols, ...symbols]; //duplicate icons for pairs

function shuffle(array){

    return array.sort(() => Math.random() - 0.5);

}

//render the board

function createBoard(){

    gameBoard.innerHTML = ''; // clear previous game 

    shuffle(cards).forEach(symbol => {

        const card = document.createElement('div');

        card.classList.add('card');
        card.textContent= '';
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        card.innerHTML = `
            <img src="${symbol}" alt="" class="card-image" />
            `;
            //alt="${names[symbols.indexOf(symbol)]}" class="card-image"
        gameBoard.appendChild(card);
    });
}

createBoard();

//flip card
let flippedCards = [];
let lockBoard = false;

function flipCard(){
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2){
        checkForMatch();
    }
}

//MATCHING Logic

let attempts = 0;
const scoreDisplay = document.createElement('p');   

document.body.insertBefore(scoreDisplay, gameBoard);

function updateScore(){
    scoreDisplay.textContent = `Attempts: ${attempts}`;
}

    updateScore();

function checkForMatch(){
    const [card1, card2] = flippedCards;
    attempts++;
    updateScore();

    if (card1.dataset.symbol === card2.dataset.symbol){
        flippedCards = [];

        checkWin();
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);           

    }
}


function checkWin(){
    const allFlipped = document.querySelectorAll('.card.flipped').every(card => card.classList.contains('flipped'));
    if (allFlipped){
        setTimeout(() => {
            alert(`Congratulations! You won in ${attempts} attempts.`);
        }, 500);
    }
}

//restart game
restartBtn.addEventListener('click', () => {
    createBoard();
    attempts = 0;
    updateScore();
    flippedCards = [];
    lockBoard = false;
}); 


  

