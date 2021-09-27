const X_CLASS = "x";
const O_CLASS = "o";
const endGameText = document.querySelector(".message-text");
const restartButton = document.getElementById("restart-button");
const messageBox = document.querySelector(".message-box");
const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningComb = [
  [0, 1, 2],
  [3, 4, 5],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let oTurn;

startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  oTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.removeEventListener("click", clicked);
    cell.addEventListener("click", clicked, { once: true });
  });
  howerClass();
  messageBox.classList.remove("show");
}

function clicked(e) {
  const cell = e.target;
  const currentTurn = oTurn ? O_CLASS : X_CLASS;
  // place the mark
  placeMark(cell, currentTurn);
  //check for win
  if (checkWin(currentTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    howerClass();
  }
}

function endGame(draw) {
  if (draw) {
  } else {
    endGameText.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
  }
  messageBox.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    //turn cells into an arry wo every can be used
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function placeMark(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

function swapTurns() {
  oTurn = !oTurn;
}

function howerClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);
  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentTurn) {
  return winningComb.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentTurn);
    });
  });
}
