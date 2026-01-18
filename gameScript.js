/**
 * PREMIUM TIC TAC TOE ENGINE
 * Clean, Modular, and Animation-Driven
 */

class TicTacToe {
  constructor() {
    // DOM Elements
    this.elements = {
      board: document.querySelector('.board'),
      cells: document.querySelectorAll('.cell'),
      currentPlayer: document.getElementById('current-player'),
      turnIndicator: document.querySelector('.turn-indicator'),
      scoreX: document.getElementById('score-x'),
      scoreO: document.getElementById('score-o'),
      crownX: document.getElementById('crown-x'),
      crownO: document.getElementById('crown-o'),
      popup: document.getElementById('winner-popup'),
      popupMessage: document.getElementById('winner-message'),
      popupIcon: document.getElementById('popup-icon'),
      popupSubtitle: document.querySelector('.popup-subtitle'),
      btns: {
        restart: document.getElementById('restart-btn'),
        reset: document.getElementById('reset-scores-btn'),
        closePopup: document.getElementById('close-popup'),
        playAgain: document.getElementById('play-again')
      }
    };

    // Configuration
    this.config = {
      winDelay: 600, // Wait for symbol animation before showing win
      popupDelay: 800, // Wait for win animation before popup
      winningCombos: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]
    };

    // State
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      isActive: true, // Prevents clicks during animations
      scores: { X: 0, O: 0 }
    };

    this.init();
  }

  init() {
    this.loadScores();
    this.updateUI();
    this.attachListeners();
  }

  /**
   * Event Listeners
   */
  attachListeners() {
    this.elements.cells.forEach(cell => {
      cell.addEventListener('click', (e) => this.handleCellClick(e));
    });

    this.elements.btns.restart.addEventListener('click', () => this.restartGame());
    this.elements.btns.reset.addEventListener('click', () => this.resetScores());
    this.elements.btns.closePopup.addEventListener('click', () => this.hidePopup());
    this.elements.btns.playAgain.addEventListener('click', () => {
      this.hidePopup();
      this.restartGame();
    });
  }

  /**
   * Core Gameplay Logic
   */
  handleCellClick(e) {
    const cell = e.currentTarget; // Use currentTarget to ensure we get the div
    const index = parseInt(cell.getAttribute('data-index'));

    // Guard clauses: Cell taken or game inactive
    if (this.state.board[index] || !this.state.isActive) return;

    // 1. Update State
    this.state.board[index] = this.state.currentPlayer;

    // 2. Animate Selection
    this.renderMove(cell, this.state.currentPlayer);

    // 3. Game Loop Check
    if (this.checkWin()) {
      this.handleWin();
    } else if (this.checkDraw()) {
      this.handleDraw();
    } else {
      this.switchTurn();
    }
  }

  switchTurn() {
    this.state.currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
    this.updateTurnIndicator();
  }

  /**
   * Win/Draw Detection
   */
  checkWin() {
    return this.config.winningCombos.find(combo => {
      return combo.every(index =>
        this.state.board[index] === this.state.currentPlayer
      );
    });
  }

  checkDraw() {
    return !this.state.board.includes(null);
  }

  /**
   * Game End Handlers
   */
  handleWin() {
    this.state.isActive = false;
    const winningCombo = this.checkWin();

    // Delay to allow the final move animation to play
    setTimeout(() => {
      this.highlightWin(winningCombo);
      this.updateScore(this.state.currentPlayer);

      setTimeout(() => {
        this.showPopup(this.state.currentPlayer);
      }, this.config.popupDelay);
    }, 100);
  }

  handleDraw() {
    this.state.isActive = false;
    this.elements.board.classList.add('game-over'); // Dims everything slightly

    setTimeout(() => {
      this.showPopup('draw');
    }, this.config.popupDelay);
  }

  /**
   * UI Rendering & Animations
   */
  renderMove(cell, player) {
    // Apply class to trigger CSS animation (pop-in)
    cell.classList.add('taken', player === 'X' ? 'x-cell' : 'o-cell');
    cell.textContent = player;
  }

  highlightWin(indices) {
    // Dim the board
    this.elements.board.classList.add('game-over');

    // Highlight specific cells
    indices.forEach(index => {
      const cell = this.elements.cells[index];
      cell.classList.add('winning-cell');
    });
  }

  updateTurnIndicator() {
    const pd = this.elements.currentPlayer;
    const indicator = this.elements.turnIndicator;

    // Text & Color Update
    pd.textContent = this.state.currentPlayer;
    pd.style.color = this.state.currentPlayer === 'X' ? 'var(--neon-pink)' : 'var(--neon-cyan)';

    // Trigger Pulse Animation (Remove -> Reflow -> Add)
    indicator.classList.remove('active-pulse');
    void indicator.offsetWidth;
    indicator.classList.add('active-pulse');
  }

  updateScore(winner) {
    this.state.scores[winner]++;
    this.saveScores();

    const scoreEl = winner === 'X' ? this.elements.scoreX : this.elements.scoreO;
    scoreEl.textContent = this.state.scores[winner];

    // Trigger Pop Animation
    scoreEl.classList.remove('pop-anim');
    void scoreEl.offsetWidth;
    scoreEl.classList.add('pop-anim');

    this.updateLeaderCrowns();
  }

  updateLeaderCrowns() {
    const { X, O } = this.state.scores;
    this.elements.crownX.classList.toggle('active', X > O);
    this.elements.crownO.classList.toggle('active', O > X);
  }

  /**
   * Popups & Overlays
   */
  showPopup(winner) {
    const { popup, popupMessage, popupIcon, popupSubtitle } = this.elements;
    const color = winner === 'X' ? 'var(--neon-pink)' : (winner === 'O' ? 'var(--neon-cyan)' : '#fff');

    if (winner === 'draw') {
      popupMessage.textContent = "IT'S A DRAW!";
      popupIcon.textContent = '🤝';
      popupSubtitle.textContent = 'A balanced clash.';
    } else {
      popupMessage.textContent = `${winner} WINS!`;
      popupIcon.textContent = '👑';
      popupSubtitle.textContent = 'Victory secured.';
    }

    popupMessage.style.color = color;

    popup.style.display = 'flex';
    void popup.offsetWidth; // Force Reflow
    popup.classList.add('show');
  }

  hidePopup() {
    this.elements.popup.classList.remove('show');
    setTimeout(() => {
      this.elements.popup.style.display = 'none';
    }, 300); // Wait for transition
  }

  /**
   * Reset Logic
   */
  restartGame() {
    // 1. Reset State
    this.state.board.fill(null);
    this.state.isActive = true;
    this.state.currentPlayer = 'X';

    // 2. Clean UI
    this.elements.board.classList.remove('game-over');
    this.elements.cells.forEach(cell => {
      cell.className = 'cell'; // Removes taken, x-cell, o-cell, winning-cell
      cell.textContent = '';
      cell.style = '';
    });

    this.updateTurnIndicator();
  }

  resetScores() {
    this.state.scores = { X: 0, O: 0 };
    this.saveScores();

    this.elements.scoreX.textContent = '0';
    this.elements.scoreO.textContent = '0';
    this.updateLeaderCrowns();

    this.restartGame();
  }

  /**
   * Persistence
   */
  saveScores() {
    localStorage.setItem('ttt_scores', JSON.stringify(this.state.scores));
  }

  loadScores() {
    const saved = localStorage.getItem('ttt_scores');
    if (saved) {
      this.state.scores = JSON.parse(saved);
    }
  }

  updateUI() {
    this.elements.scoreX.textContent = this.state.scores.X;
    this.elements.scoreO.textContent = this.state.scores.O;
    this.updateLeaderCrowns();
    this.updateTurnIndicator();
  }
}

// Start the Engine
document.addEventListener('DOMContentLoaded', () => {
  window.game = new TicTacToe();
});
