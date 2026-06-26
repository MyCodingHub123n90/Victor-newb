// ===== GAME (Tic-Tac-Toe) =====
const Game = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    gameOver: false,
    scores: { X: 0, O: 0 },

    init() {
        this.renderBoard();
        this.updateStatus();
        this.setupReset();
    },

    renderBoard() {
        const boardEl = document.getElementById('gameBoard');
        if (!boardEl) return;

        boardEl.innerHTML = this.board.map((cell, index) => `
            <div class="game-cell ${cell ? 'taken' : ''}" 
                 data-index="${index}"
                 onclick="Game.makeMove(${index})">
                ${cell || ''}
            </div>
        `).join('');
    },

    makeMove(index) {
        if (this.board[index] || this.gameOver) return;

        this.board[index] = this.currentPlayer;
        this.renderBoard();

        const winner = this.checkWinner();
        if (winner) {
            this.gameOver = true;
            this.scores[winner]++;
            this.updateStatus(`🎉 Player ${winner} wins!`);
            this.updateScores();
            return;
        }

        if (this.board.every(cell => cell !== null)) {
            this.gameOver = true;
            this.updateStatus("🤝 It's a draw!");
            return;
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus(`Player ${this.currentPlayer}'s turn`);
    },

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }
        return null;
    },

    updateStatus(message) {
        const statusEl = document.getElementById('gameStatus');
        if (statusEl) {
            statusEl.textContent = message || `Player ${this.currentPlayer}'s turn`;
        }
    },

    updateScores() {
        const scoreEl = document.getElementById('gameScores');
        if (scoreEl) {
            scoreEl.textContent = `🏆 X: ${this.scores.X} | O: ${this.scores.O}`;
        }
    },

    setupReset() {
        const resetBtn = document.getElementById('gameReset');
        if (resetBtn) {
            resetBtn.onclick = () => this.resetGame();
        }
    },

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.renderBoard();
        this.updateStatus(`Player X's turn`);
    }
};