/*-------------------------------- Constants --------------------------------*/
winningArrays = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [3, 4, 5],
  [2, 5, 8],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let boardArray = [, , , , , , , ,];
let xTurn = true;
let xPosition = [];
let oPosition = [];
let winner = false;
let tie = false;
/*------------------------ Cached Element References ------------------------*/
const squaresEl = document.querySelectorAll(".sqr");
const resetBtn = document.querySelector("#reset");
const winDisplay = document.querySelector("#message");
/*-------------------------------- Functions --------------------------------*/
const checkPlayed = (square) => {
  if (square.textContent === "X" || square.textContent === "O") {
    return true;
  } else {
    return false;
  }
};
/*----------------------------- Event Listeners -----------------------------*/
squaresEl.forEach((square) => {
  square.addEventListener("click", () => {
    const squareId = Number(square.id);

    if (!checkPlayed(square)) {
      if (xTurn) {
        console.log(square.textContent);
        square.textContent = "X";
        xTurn = false;
        boardArray[squareId] = "X";
        xPosition.push(squareId);
        if (checkWinner(xPosition)) {
          displayWinner("X");
          ///endGame();
        }
        checkTie();
      } else {
        square.textContent = "O";
        xTurn = true;
        boardArray[squareId] = "O";
        oPosition.push(squareId);
        if (checkWinner(oPosition)) {
          displayWinner("O");
          ///endGame();
        }
        checkTie();
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  resetGame();
});

function checkWinner(positionArray) {
  for (let i = 0; i < winningArrays.length; i++) {
    if (winningArrays[i].every((element) => positionArray.includes(element))) {
      winner = true;
      console.log("You win!");
      return true;
    }
  }
}

function checkTie() {
  const filledSq = xPosition.length + oPosition.length;
  if (filledSq === 9 && winner === false) {
    tie = true;
    winDisplay.textContent = "It's a Tie!";
  }
}

function resetGame() {
  boardArray = [, , , , , , , ,];
  xTurn = true;
  xPosition = [];
  oPosition = [];
  winner = false;
  tie = false;
  squaresEl.forEach((square) => {
    square.textContent = "";
  });
  winDisplay.textContent = "";
}

function displayWinner(winner) {
  winDisplay.textContent = `${winner} wins!`;
}

/*function endGame(){
  squaresEl.forEach((square)=>{
    if(square.textContent != "X"|| square.textContent != "O")
    square.textContent = "*"
  })
}*/
