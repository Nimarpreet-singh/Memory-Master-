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





document.addEventListener("DOMContentLoaded", function() {
  const difficultyPopup = document.getElementById("difficulty-popup");
  const easyBtn = document.getElementById("easy-btn");
  const mediumBtn = document.getElementById("medium-btn");
  const hardBtn = document.getElementById("hard-btn");
  const cardGame = document.querySelector(".card-game");

  easyBtn.addEventListener("click", function() {
    setDifficulty(6); 
    closePopup();
  });

  mediumBtn.addEventListener("click", function() {
    setDifficulty(8);
    closePopup();
  });

  hardBtn.addEventListener("click", function() {
    setDifficulty(12);
    closePopup();
  });

  function setDifficulty(numCards) {
    const memoryCards = document.querySelectorAll(".memory-card");
    if (memoryCards.length > numCards) {
      for (let i = numCards; i < memoryCards.length; i++) {
        memoryCards[i].style.display = "none"; 
      }
    } else if (memoryCards.length < numCards) {
      for (let i = memoryCards.length; i < numCards; i++) {
        cardGame.insertAdjacentHTML('beforeend', `
          <div class="memory-card" data-framework="h${i}">
            <!-- Add image elements for new cards -->
          </div>
        `);
      }
    }
  }

  function closePopup() {
    difficultyPopup.style.display = "none";
  }

  
  difficultyPopup.style.display = "block";
});








function setDifficulty(difficulty) {
  let numColumns, numRows;

  switch (difficulty) {
    case "easy":
      numColumns = 3;
      numRows = 2;
      break;
    case "medium":
      numColumns = 4;
      numRows = 2;
      break;
    case "hard":
      numColumns = 5;
      numRows = 5;
      break;
    default:
      console.error("Invalid difficulty level");
      return;
  }

  const memoryCards = document.querySelectorAll(".memory-card");
  const cardGame = document.querySelector(".card-game");
  const totalCards = numColumns * numRows;

  memoryCards.forEach((card, index) => {
    if (index < totalCards) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  cardGame.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
  cardGame.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
}








function checkForGameCompletion() {
  if (matchedPairs !== totalPairs) {
    stopTimer();
    console.log("Game completed!");

  
    const totalTime = document.getElementById("total-time");
    const totalMoves = document.getElementById("total-moves");

    totalTime.innerHTML = `<span>Total Time:</span> ${minutes}:${seconds}`;
    totalMoves.innerHTML = `<span>Total Moves:</span> ${movesCount+1}`;
  }
}