// Game state types
export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];
export type GameStatus = 'playing' | 'won' | 'draw';
export type GameMode = 'human-vs-ai' | 'ai-vs-ai';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
}

// Check if a player has won
export const checkWinner = (board: Board): Player | null => {
  const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player;
    }
  }

  return null;
};

// Check if the game is a draw
export const checkDraw = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

// Get the game status
export const getGameStatus = (board: Board): { status: GameStatus; winner: Player | null } => {
  const winner = checkWinner(board);
  if (winner) {
    return { status: 'won', winner };
  }
  if (checkDraw(board)) {
    return { status: 'draw', winner: null };
  }
  return { status: 'playing', winner: null };
};

// Make a move on the board
export const makeMove = (board: Board, index: number, player: Player): Board => {
  if (board[index] !== null) {
    return board; // Cell already occupied
  }

  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
};

// Switch player
export const switchPlayer = (currentPlayer: Player): Player => {
  return currentPlayer === 'X' ? 'O' : 'X';
};

// AI move - Simple implementation
export const getAIMove = (board: Board, player: Player): number => {
  // Check if AI can win in the next move
  const winningMove = findWinningMove(board, player);
  if (winningMove !== -1) {
    return winningMove;
  }

  // Check if opponent can win in the next move and block
  const opponentPlayer = player === 'X' ? 'O' : 'X';
  const blockingMove = findWinningMove(board, opponentPlayer);
  if (blockingMove !== -1) {
    return blockingMove;
  }

  // Try to take the center
  if (board[4] === null) {
    return 4;
  }

  // Try to take the corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(corner => board[corner] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Take any available edge
  const edges = [1, 3, 5, 7];
  const availableEdges = edges.filter(edge => board[edge] === null);
  if (availableEdges.length > 0) {
    return availableEdges[Math.floor(Math.random() * availableEdges.length)];
  }

  // If all else fails, choose a random empty cell
  const emptyCells = board
    .map((cell, index) => (cell === null ? index : -1))
    .filter(index => index !== -1);

  if (emptyCells.length === 0) {
    return -1; // No valid moves
  }

  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

// Find a winning move for the given player
const findWinningMove = (board: Board, player: Player): number => {
  const winPatterns = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    // Check if two cells have the player's mark and the third is empty
    if (
      (board[a] === player && board[b] === player && board[c] === null) ||
      (board[a] === player && board[c] === player && board[b] === null) ||
      (board[b] === player && board[c] === player && board[a] === null)
    ) {
      // Return the empty cell index
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }

  return -1; // No winning move found
};

// Advanced AI using minimax algorithm
export const getAdvancedAIMove = (board: Board, player: Player): number => {
  // For simplicity, we'll use the basic AI for AI 2
  // In a real implementation, you might want to implement minimax with alpha-beta pruning
  return getAIMove(board, player);
};
