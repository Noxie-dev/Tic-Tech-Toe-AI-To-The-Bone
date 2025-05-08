import React, { useState, useCallback, useEffect } from 'react';

// Types
type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];
type GameStatus = 'playing' | 'won' | 'draw';
type GameMode = 'human-vs-ai' | 'ai-vs-ai';

// Simple game board with inline styles
const GameBoard: React.FC<{
  board: Board;
  onCellClick: (index: number) => void;
  disabled?: boolean;
}> = ({ board, onCellClick, disabled = false }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '300px',
        margin: '0 auto',
      }}
    >
      {board.map((cell, index) => (
        <button
          key={index}
          style={{
            height: '6rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: cell === 'X' ? '#3b82f6' : '#ef4444',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            cursor: disabled || cell !== null ? 'not-allowed' : 'pointer',
          }}
          disabled={disabled || cell !== null}
          onClick={() => onCellClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
  );
};

// Mode selection component
const ModeSelection: React.FC<{
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  disabled?: boolean;
}> = ({ gameMode, onModeChange, disabled = false }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <h3
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Game Mode
      </h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <input
            type="radio"
            value="human-vs-ai"
            checked={gameMode === 'human-vs-ai'}
            onChange={() => onModeChange('human-vs-ai')}
            disabled={disabled}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          />
          <span>Human vs AI</span>
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <input
            type="radio"
            value="ai-vs-ai"
            checked={gameMode === 'ai-vs-ai'}
            onChange={() => onModeChange('ai-vs-ai')}
            disabled={disabled}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          />
          <span>AI vs AI</span>
        </label>
      </div>
    </div>
  );
};

// AI functions
const findWinningMove = (board: Board, player: Player): number => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
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

const getAIMove = (board: Board, player: Player): number => {
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

// Main Game component
const Game: React.FC = () => {
  // Game state
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('human-vs-ai');
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Check if a player has won
  const checkWinner = (board: Board): Player | null => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
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
  const checkDraw = (board: Board): boolean => {
    return board.every(cell => cell !== null);
  };

  // Get game status
  const getGameStatus = (board: Board): { status: GameStatus; winner: Player | null } => {
    const winner = checkWinner(board);
    if (winner) {
      return { status: 'won', winner };
    }
    if (checkDraw(board)) {
      return { status: 'draw', winner: null };
    }
    return { status: 'playing', winner: null };
  };

  // Make a move
  const makeMove = (board: Board, index: number, player: Player): Board => {
    if (board[index] !== null) {
      return board; // Cell already occupied
    }

    const newBoard = [...board];
    newBoard[index] = player;
    return newBoard;
  };

  // Switch player
  const switchPlayer = (currentPlayer: Player): Player => {
    return currentPlayer === 'X' ? 'O' : 'X';
  };

  // Initialize the game
  const initGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinner(null);
    setSeconds(0);
    setTimerActive(true);
  }, []);

  // Handle cell click
  const handleCellClick = useCallback(
    (index: number) => {
      if (gameStatus !== 'playing' || board[index] !== null) {
        return;
      }

      // Make the move
      const newBoard = makeMove([...board], index, currentPlayer);
      setBoard(newBoard);

      // Check game status
      const { status, winner } = getGameStatus(newBoard);
      setGameStatus(status);
      setWinner(winner);

      if (status !== 'playing') {
        // Game ended
        setTimerActive(false);
      } else {
        // Switch player
        setCurrentPlayer(switchPlayer(currentPlayer));
      }
    },
    [board, currentPlayer, gameStatus]
  );

  // Handle AI move
  const handleAIMove = useCallback(() => {
    if (gameStatus !== 'playing') {
      return;
    }

    const aiMoveIndex = getAIMove([...board], currentPlayer);

    if (aiMoveIndex !== -1) {
      setTimeout(() => {
        handleCellClick(aiMoveIndex);
      }, 500); // Add a small delay to make AI moves visible
    }
  }, [board, currentPlayer, gameStatus, handleCellClick]);

  // Handle game mode change
  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    initGame();
  };

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;

    if (timerActive) {
      interval = window.setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive]);

  // AI move effect
  useEffect(() => {
    if (gameStatus === 'playing') {
      if ((gameMode === 'human-vs-ai' && currentPlayer === 'O') || gameMode === 'ai-vs-ai') {
        handleAIMove();
      }
    }
  }, [gameStatus, currentPlayer, gameMode, handleAIMove]);

  // Initialize game on first render
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Format time
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        width: '100%',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '1.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.5rem',
            borderBottom: gameStatus !== 'playing' ? '1px solid #e5e7eb' : 'none',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            Tic-Tac-Toe AI
          </h2>

          <GameBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={
              gameStatus !== 'playing' ||
              (gameMode === 'human-vs-ai' && currentPlayer === 'O') ||
              gameMode === 'ai-vs-ai'
            }
          />
        </div>

        <div
          style={{
            padding: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {gameStatus !== 'playing' ? (
            <div style={{ textAlign: 'center' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                {gameStatus === 'won'
                  ? `${
                      winner === 'X'
                        ? gameMode === 'human-vs-ai'
                          ? 'You'
                          : 'AI 1'
                        : gameMode === 'human-vs-ai'
                          ? 'AI'
                          : 'AI 2'
                    } won!`
                  : "It's a draw!"}
              </h3>
              <button
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                onClick={initGame}
              >
                New Game
              </button>
            </div>
          ) : (
            <p style={{ textAlign: 'center' }}>
              {gameMode === 'human-vs-ai'
                ? currentPlayer === 'X'
                  ? 'Your turn (X)'
                  : 'AI is thinking... (O)'
                : currentPlayer === 'X'
                  ? 'AI 1 is thinking... (X)'
                  : 'AI 2 is thinking... (O)'}
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
          }}
        >
          Game Time
        </h3>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '1.5rem',
          }}
        >
          {formatTime(seconds)}
        </p>
      </div>

      <ModeSelection
        gameMode={gameMode}
        onModeChange={handleModeChange}
        disabled={gameStatus === 'playing'}
      />
    </div>
  );
};

export default Game;
