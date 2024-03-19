const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let interval;
const totalPairs = cards.length / 2;
let matchedPairs = 0;

function checkForGameCompletion() {
  if (matchedPairs === totalPairs) {
    stopTimer();
    console.log("Game completed!");
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    if (!interval) {
      startTimer();
    }
    return;
  }

  secondCard = this;
  checkForMatch();
  movesCounter();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;
  checkForGameCompletion();
  resetBoard();
}

function stopTimer() {
  clearInterval(interval);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));


//--------------------------------------------------------------------------------

const timeValue = document.getElementById("time");


let seconds = 0,
  minutes = 0;


function startTimer() {
  interval = setInterval(timeGenerator, 1000);
}


const timeGenerator = () => {
  seconds += 1;
  
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  
};

//-------------------------------------------------------------------------------------

const moves = document.getElementById("moves-count");

let movesCount = 0
moves.innerHTML = `<span>Moves:</span>${movesCount}`;

const movesCounter = () => {
  movesCount +=1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};



