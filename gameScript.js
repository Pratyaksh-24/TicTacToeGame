<<<<<<< HEAD
// ============================================
// FUTURISTIC TIC TAC TOE - GAME LOGIC
// ============================================

// DOM Elements
const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restart-btn');
const resetScoresBtn = document.getElementById('reset-scores-btn');
const popup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const popupIcon = document.getElementById('popup-icon');
const popupSubtitle = document.querySelector('.popup-subtitle');
const closePopup = document.getElementById('close-popup');
const playAgainBtn = document.getElementById('play-again');
const currentPlayerDisplay = document.getElementById('current-player');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');

// Game State
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };
let winningCells = [];

// Winning Combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// Initialize Game
function initGame() {
  updateTurnIndicator();
  loadScores();
  updateScoreDisplay();
}

// Update Turn Indicator
function updateTurnIndicator() {
  currentPlayerDisplay.textContent = currentPlayer;
  currentPlayerDisplay.className = 'current-player';
  currentPlayerDisplay.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');
}

// Check for Winner
=======
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

>>>>>>> e2985d3f6d106918e20c923d5df5902a57c3f222
function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
<<<<<<< HEAD
      winningCells = combination;
      highlightWinningCells(combination);
      
      // Update score
      scores[currentPlayer]++;
      saveScores();
      updateScoreDisplay();
      
      // Show winner popup after a short delay for animation
      setTimeout(() => {
        showWinner(currentPlayer);
      }, 600);
      
      return true;
    }
  }
  
  // Check for draw
  if (!board.includes('')) {
    gameActive = false;
    setTimeout(() => {
      showDraw();
    }, 300);
    return true;
  }
  
  return false;
}

// Highlight Winning Cells
function highlightWinningCells(combination) {
  combination.forEach(index => {
    cells[index].classList.add('winning-cell');
  });
}

// Show Winner Popup
function showWinner(player) {
  const messages = [
    'Incredible victory!',
    'Flawless execution!',
    'Dominated the grid!',
    'Strategic genius!',
    'Unstoppable force!'
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  winnerMessage.textContent = `${player} WINS!`;
  winnerMessage.className = '';
  winnerMessage.classList.add(player === 'X' ? 'winner-x' : 'winner-o');
  
  popupIcon.textContent = player === 'X' ? '🔥' : '💎';
  popupSubtitle.textContent = randomMessage;
  
  popup.style.display = 'flex';
}

// Show Draw Popup
function showDraw() {
  winnerMessage.textContent = "IT'S A DRAW!";
  winnerMessage.className = 'draw';
  popupIcon.textContent = '🤝';
  popupSubtitle.textContent = 'The battle continues...';
  popup.style.display = 'flex';
}

// Handle Cell Click
function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  // Check if cell is already taken or game is not active
  if (board[index] || !gameActive) return;

  // Update board state
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  cell.classList.add(currentPlayer === 'X' ? 'x-cell' : 'o-cell');

  // Check for winner
  if (!checkWinner()) {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
  }
}

// Restart Round (keeps scores)
function restartRound() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  winningCells = [];
  
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'x-cell', 'o-cell', 'winning-cell');
  });
  
  updateTurnIndicator();
  popup.style.display = 'none';
}

// Reset All Scores
function resetScores() {
  scores = { X: 0, O: 0 };
  saveScores();
  updateScoreDisplay();
  restartRound();
}

// Update Score Display
function updateScoreDisplay() {
  scoreXDisplay.textContent = scores.X;
  scoreODisplay.textContent = scores.O;
  
  // Add animation effect
  scoreXDisplay.style.transform = 'scale(1.2)';
  scoreODisplay.style.transform = 'scale(1.2)';
  
  setTimeout(() => {
    scoreXDisplay.style.transform = 'scale(1)';
    scoreODisplay.style.transform = 'scale(1)';
  }, 200);
}

// Save Scores to Local Storage
function saveScores() {
  localStorage.setItem('ticTacToeScores', JSON.stringify(scores));
}

// Load Scores from Local Storage
function loadScores() {
  const savedScores = localStorage.getItem('ticTacToeScores');
  if (savedScores) {
    scores = JSON.parse(savedScores);
  }
}

// Close Popup
function closePopupHandler() {
  popup.style.display = 'none';
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartRound);
resetScoresBtn.addEventListener('click', resetScores);
closePopup.addEventListener('click', closePopupHandler);
playAgainBtn.addEventListener('click', restartRound);

// Keyboard Support - Press 'R' to restart
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    restartRound();
  }
  if (e.key === 'Escape') {
    closePopupHandler();
  }
});

// Initialize the game on load
initGame();
=======
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
>>>>>>> e2985d3f6d106918e20c923d5df5902a57c3f222
