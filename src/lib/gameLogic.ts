// Winning combinations (rows, columns, diagonals)
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

// Difficulty levels
type Difficulty = 'easy' | 'medium' | 'hard';

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

// Get all available moves
function getAvailableMoves(board: Array<'X' | 'O' | null>): number[] {
  return board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
}

// Make a random move
function makeRandomMove(board: Array<'X' | 'O' | null>): number | null {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return null;
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

// Find a winning move for the given player
export function findWinningMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O') {
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

// Minimax algorithm with alpha-beta pruning
function minimax(
  board: Array<'X' | 'O' | null>,
  depth: number,
  isMaximizing: boolean,
  player: 'X' | 'O',
  alpha: number = -Infinity,
  beta: number = Infinity
): { score: number; move?: number } {
  const opponent = player === 'X' ? 'O' : 'X';

  // Check for terminal states
  const winner = checkWinner(board);
  if (winner) {
    return {
      score: winner.player === player ? 10 - depth : depth - 10
    };
  }

  if (checkDraw(board)) {
    return { score: 0 };
  }

  // If we've reached the maximum depth, evaluate the board
  if (depth === 0) {
    return { score: 0 };
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove: number | undefined;

    for (const move of availableMoves) {
      // Make the move
      const newBoard = [...board];
      newBoard[move] = player;

      // Recursively evaluate
      const result = minimax(newBoard, depth - 1, false, player, alpha, beta);

      // Update best score
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }

      // Alpha-beta pruning
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }

    return { score: bestScore, move: bestMove };
  } else {
    let bestScore = Infinity;
    let bestMove: number | undefined;

    for (const move of availableMoves) {
      // Make the move
      const newBoard = [...board];
      newBoard[move] = opponent;

      // Recursively evaluate
      const result = minimax(newBoard, depth - 1, true, player, alpha, beta);

      // Update best score
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }

      // Alpha-beta pruning
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }

    return { score: bestScore, move: bestMove };
  }
}

// Find the best move using minimax
function findBestMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O', maxDepth: number): number | null {
  const result = minimax(board, maxDepth, true, player);
  return result.move !== undefined ? result.move : null;
}

// Basic AI move logic (medium difficulty)
function makeMediumAIMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O'): number | null {
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
  const sides = [1, 3, 5, 7].filter(i => board[i] === null);
  if (sides.length > 0) {
    return sides[Math.floor(Math.random() * sides.length)];
  }

  // 6. Fallback: Take any available space
  return makeRandomMove(board);
}

// Easy AI move logic
function makeEasyAIMove(board: Array<'X' | 'O' | null>, player: 'X' | 'O'): number | null {
  // 80% chance to make a random move, 20% chance to make a smart move
  if (Math.random() < 0.8) {
    return makeRandomMove(board);
  } else {
    // Occasionally make a winning move if available
    const winningMove = findWinningMove(board, player);
    if (winningMove !== null) return winningMove;

    // Otherwise make a random move
    return makeRandomMove(board);
  }
}

// Evaluate board position for a given player
export function evaluateBoard(board: Array<'X' | 'O' | null>, player: 'X' | 'O'): number {
  const winner = checkWinner(board);
  if (winner) {
    return winner.player === player ? 10 : -10;
  }
  if (checkDraw(board)) {
    return 0;
  }
  // Return neutral score for ongoing games
  return 0;
}

// AI move logic based on difficulty
export function makeAIMove(
  board: Array<'X' | 'O' | null>,
  player: 'X' | 'O',
  difficulty: Difficulty = 'medium'
): number | null {
  switch (difficulty) {
    case 'easy':
      return makeEasyAIMove(board, player);
    case 'medium':
      return makeMediumAIMove(board, player);
    case 'hard':
      // Use minimax with a depth based on the number of empty cells
      const emptyCells = board.filter(cell => cell === null).length;
      // Adjust depth based on the game state to balance performance
      const maxDepth = emptyCells > 7 ? 4 : (emptyCells > 5 ? 6 : 9);
      return findBestMove(board, player, maxDepth);
    default:
      return makeMediumAIMove(board, player);
  }
}
