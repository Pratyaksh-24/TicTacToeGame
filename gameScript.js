const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const popup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const closePopup = document.getElementById('close-popup');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      showWinner(currentPlayer);
      return true;
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    showWinner('Nobody');
  }
  return false;
}

function showWinner(player) {
  winnerMessage.textContent = `${player} wins!`;
  popup.style.display = 'flex';
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  
  // Add color to the current player's move
  cell.style.color = currentPlayer === 'X' ? '#ff5733' : '#3498db';

  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.style.color = '';  // Reset color
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
closePopup.addEventListener('click', () => (popup.style.display = 'none'));
