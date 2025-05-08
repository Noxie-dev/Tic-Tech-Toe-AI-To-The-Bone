// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Check if there's a winner
export function checkWinner(board: Array<'X' | 'O' | null>) {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: combo };
    }
  }
  return null;
}

// Check if the game is a draw
export function checkDraw(board: Array<'X' | 'O' | null>) {
  return board.every(cell => cell !== null);
}

// Basic AI move logic
export function makeAIMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O') {
  const opponent = player === 'X' ? 'O' : 'X';

  // 1. Try to win
  const winningMove = findWinningMove(board, player);
  if (winningMove !== null) return winningMove;

  // 2. Block opponent's winning move
  const blockingMove = findWinningMove(board, opponent);
  if (blockingMove !== null) return blockingMove;

  // 3. Take center if available
  if (board[4] === null) return 4;

  // 4. Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => board[corner] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Take any available space
  const availableMoves = board
    .map((cell, index) => cell === null ? index : null)
    .filter(index => index !== null) as number[];

  if (availableMoves.length > 0) {
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  return null;
}

// Find a winning move for the given player
function findWinningMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O') {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    // Check if two cells have the player's mark and the third is empty
    if (
      (board[a] === player && board[b] === player && board[c] === null) ||
      (board[a] === player && board[c] === player && board[b] === null) ||
      (board[b] === player && board[c] === player && board[a] === null)
    ) {
      // Return the empty cell index
      return board[a] === null ? a : (board[b] === null ? b : c);
    }
  }
  return null;
}
