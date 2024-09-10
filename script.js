const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const resultScreen = document.querySelector('.result-screen');
const resultText = document.getElementById('resultText');
const newGameButton = document.getElementById('newGameButton');

let isXTurn = true;
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellClick(e) {
  const clickedCell = e.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (boardState[clickedIndex] !== '' || !gameActive) {
    return;
  }

  boardState[clickedIndex] = isXTurn ? 'X' : 'O';
  clickedCell.textContent = isXTurn ? 'X' : 'O';

  if (checkForWinner()) {
    showResult(`Player ${isXTurn ? 'X' : 'O'} wins!`);
    gameActive = false;
  } else if (boardState.every(cell => cell !== '')) {
    showResult(`It's a draw!`);
    gameActive = false;
  } else {
    isXTurn = !isXTurn;
    statusMessage.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
  }
}

function checkForWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return boardState[index] === (isXTurn ? 'X' : 'O');
    });
  });
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.classList.remove('hidden');
}

function restartGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  isXTurn = true;
  statusMessage.textContent = "Player X's turn";
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

function startNewGame() {
  restartGame();
  resultScreen.classList.add('hidden');
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', startNewGame);
