const cells = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('game');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatusMessage("Player X's turn");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setStatusMessage(`Player ${isXTurn ? 'X' : 'O'}'s turn`);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function setStatusMessage(message) {
  statusMessage.textContent = message;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function endGame(draw) {
  if (draw) {
    setStatusMessage("It's a draw!");
  } else {
    setStatusMessage(`Player ${isXTurn ? 'X' : 'O'} wins!`);
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
