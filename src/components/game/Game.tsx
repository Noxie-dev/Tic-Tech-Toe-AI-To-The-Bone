import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

// Import the components
import GameBoard from './GameBoard';
import StatusDisplay from './StatusDisplay';
import GameInfo from './GameInfo';
import HelpModal from './HelpModal';
import HowToPlayButton from './HowToPlayButton'; // Added import
import TabContainer from './TabContainer';
import GameSettingsModal from './GameSettingsModal';
import { makeAIMove as makeAILogicMove } from '../../lib/gameLogic';

// Define difficulty type
type Difficulty = 'easy' | 'medium' | 'hard';

type Player = 'X' | 'O';
type GameModeType = 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';
type BoardArray = Array<Player | null>;
interface ScoresType {
  human: number;
  ai1: number;
  ai2: number;
  draw: number;
}

export default function Game() {
  // Game state
  const [board, setBoard] = useState<BoardArray>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<'ongoing' | 'won' | 'draw'>('ongoing');
  const [scores, setScores] = useState<ScoresType>({ human: 0, ai1: 0, ai2: 0, draw: 0 });
  const [gameMode, setGameMode] = useState<GameModeType>('humanVsAI');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [timer, setTimer] = useState(0);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [gameAnimation, setGameAnimation] = useState('');
  const [lastMove, setLastMove] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isFirstAIMove, setIsFirstAIMove] = useState(true);

  // Settings modal state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(true); // Open by default on first load

  const WINNING_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],             // Diagonals
  ];

  // Start timer function
  const startTimer = useCallback(() => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    setTimer(0);
    const id = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setTimerIntervalId(id);
    setGameStarted(true);
  }, [timerIntervalId]);

  // Stop timer function
  const stopTimer = useCallback(() => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
  }, [timerIntervalId]);

  // Check for winner
  const checkWinner = useCallback(() => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const [a, b, c] = WINNING_PATTERNS[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningLine(WINNING_PATTERNS[i]);
        return board[a] as Player;
      }
    }
    return null;
  }, [board, WINNING_PATTERNS]);

  // Initialize game on mount
  useEffect(() => {
    const storedScores = localStorage.getItem('ticTacToeScores');
    if (storedScores) {
      try {
        setScores(JSON.parse(storedScores));
      } catch (e) {
        console.error("Failed to parse stored scores", e);
      }
    }
    // Don't start timer until first move
    setGameAnimation('animate-fade-in');

    return () => {
      if (timerIntervalId) clearInterval(timerIntervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // timerIntervalId is managed carefully

  // We now save scores directly in handleWin and handleDraw functions

  // Check for draw
  const checkDraw = useCallback(() => {
    return board.every(cell => cell !== null);
  }, [board]);

  // Handle win
  const handleWin = useCallback((winner: Player) => {
    setGameStatus('won');
    stopTimer();
    setGameAnimation('animate-win');

    // Update scores with proper increments
    setScores(prev => {
      const newScores = { ...prev };
      if (gameMode === 'humanVsAI') {
        if (winner === 'X') {
          newScores.human = prev.human + 1;
        } else {
          newScores.ai1 = prev.ai1 + 1;
        }
      } else if (gameMode === 'aiVsAI') {
        if (winner === 'X') {
          newScores.ai1 = prev.ai1 + 1;
        } else {
          newScores.ai2 = prev.ai2 + 1;
        }
      } else { // humanVsHuman
        if (winner === 'X') {
          newScores.human = prev.human + 1;
        } else {
          newScores.ai1 = prev.ai1 + 1; // Using ai1 for Player O in human vs human
        }
      }

      // Save to localStorage immediately
      localStorage.setItem('ticTacToeScores', JSON.stringify(newScores));
      return newScores;
    });
  }, [gameMode, stopTimer]);

  // Handle draw
  const handleDraw = useCallback(() => {
    setGameStatus('draw');
    stopTimer();
    setGameAnimation('animate-draw');
    setScores(prev => {
      const newScores = { ...prev, draw: prev.draw + 1 };
      // Save to localStorage immediately
      localStorage.setItem('ticTacToeScores', JSON.stringify(newScores));
      return newScores;
    });
  }, [stopTimer]);

  // Find a winning move for the given player
  const findWinningMove = useCallback((player: Player, currentBoard: BoardArray) => {
    for (const line of WINNING_PATTERNS) {
      const [a, b, c] = line;
      const cells = [currentBoard[a], currentBoard[b], currentBoard[c]];
      const playerCells = cells.filter(cell => cell === player).length;
      const emptyCells = cells.filter(cell => cell === null).length;

      if (playerCells === 2 && emptyCells === 1) {
        const emptyIndex = line[cells.findIndex(cell => cell === null)];
        return emptyIndex;
      }
    }
    return -1;
  }, [WINNING_PATTERNS]);

  // AI move logic
  const makeAIMove = useCallback(() => {
    if (gameStatus !== 'ongoing') return;

    let newBoard = [...board];
    const aiPlayer = currentPlayer;
    const opponentPlayer = aiPlayer === 'X' ? 'O' : 'X';

    // Use the imported AI logic based on difficulty
    const move = makeAILogicMove(newBoard, aiPlayer, difficulty);

    if (move !== null) {
      newBoard[move] = aiPlayer;
      setBoard(newBoard);
      setLastMove(move);
      setCurrentPlayer(opponentPlayer);
    }
  }, [board, currentPlayer, difficulty, gameStatus]);

  // Game logic for win detection and AI moves
  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      handleWin(winner);
    } else if (checkDraw()) {
      handleDraw();
    } else if (gameStatus === 'ongoing') {
      if ((gameMode === 'humanVsAI' && currentPlayer === 'O') ||
          (gameMode === 'aiVsAI')) { // AI's turn in either mode

        // Start timer on first AI move if not already started
        if (!gameStarted) {
          startTimer();
        }

        // Determine delay based on game mode and if it's the first move
        let delay = 700; // Default delay for human vs AI

        if (gameMode === 'aiVsAI') {
          delay = isFirstAIMove ? 3500 : 3500; // 3.5 seconds for AI vs AI
        }

        const aiMoveTimeout = setTimeout(() => {
          makeAIMove();
          if (isFirstAIMove) {
            setIsFirstAIMove(false);
          }
        }, delay);

        return () => clearTimeout(aiMoveTimeout);
      }
    }
  }, [board, currentPlayer, gameMode, gameStatus, checkWinner, handleWin, checkDraw, handleDraw, makeAIMove, gameStarted, startTimer, isFirstAIMove]);

  // Reset game function
  const resetGame = useCallback(() => {
    setGameAnimation('animate-pulse');
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setGameStatus('ongoing');
      setWinningLine([]);
      setLastMove(null);
      stopTimer();
      // Don't start timer until first move
      setTimer(0);
      setGameStarted(false);
      setIsFirstAIMove(true);
      setGameAnimation('animate-fade-in');
      setIsSettingsModalOpen(true); // Show settings modal when game is reset
    }, 300);
  }, [stopTimer]);

  // Handle cell click
  const handleCellClick = useCallback((index: number) => {
    if (gameStatus !== 'ongoing' || board[index] ||
        (gameMode === 'humanVsAI' && currentPlayer === 'O') ||
        gameMode === 'aiVsAI') {
      return;
    }

    // Start timer on first move if not already started
    if (!gameStarted) {
      startTimer();
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setLastMove(index);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }, [board, currentPlayer, gameMode, gameStatus, gameStarted, startTimer]);

  // Format time helper
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Check if a cell is part of the winning line
  const isWinningCell = useCallback((index: number) => {
    return winningLine.includes(index);
  }, [winningLine]);

  // Handle game mode change
  const handleModeChange = (mode: GameModeType) => {
    setGameMode(mode);
    // Don't reset game here since we're using the modal now
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    // Don't reset game here since we're using the modal now
  };

  // Close settings modal
  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  // Get status message
  const getStatusMessage = useCallback(() => {
    if (gameStatus === 'won') {
      const winner = winningLine.length > 0 ? board[winningLine[0]] : null;
      if (!winner) return "Game Over!";

      if (gameMode === 'humanVsAI') {
        return winner === 'X' ? 'You win!' : `AI (${difficulty}) wins!`;
      } else if (gameMode === 'humanVsHuman') {
        return `Player ${winner} wins!`;
      } else {
        return `${winner === 'X' ? `AI 1 (${difficulty}) (X)` : `AI 2 (${difficulty}) (O)`} wins!`;
      }
    } else if (gameStatus === 'draw') {
      return "It's a draw!";
    } else {
      let playerDisplay = "";
      if (gameMode === 'humanVsAI') {
        playerDisplay = currentPlayer === 'X' ? 'You (X)' : `AI (${difficulty}) (O)`;
      } else if (gameMode === 'humanVsHuman') {
        playerDisplay = `Player ${currentPlayer}`;
      } else { // aiVsAI
        playerDisplay = currentPlayer === 'X' ? `AI 1 (${difficulty}) (X)` : `AI 2 (${difficulty}) (O)`;
      }
      return `Current Player: ${playerDisplay}`;
    }
  }, [gameStatus, currentPlayer, gameMode, board, winningLine, difficulty]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === 'r') {
            resetGame();
        }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [resetGame]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-6"
         role="main"
         aria-label="Tic TECH Toe Game">
      {/* Animated metallic particles (background effect) */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black"></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23818cf8\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '150px 150px' }}></div>
      </div>

      {/* Game Settings Modal */}
      <GameSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettingsModal}
        gameMode={gameMode}
        onModeChange={handleModeChange}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      <div className={`relative z-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md
        backdrop-blur-sm backdrop-filter border border-gray-700 transform transition-all duration-500 ${gameAnimation}`}
        aria-live="polite">

        {/* Help Modal */}
        <HelpModal />
        {/* How to Play Button/Modal */}
        <HowToPlayButton />

        <h1 className="text-3xl font-bold text-center mb-6 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-text-shimmer">
            Tic TECH Toe
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur-lg -z-10"></div>
        </h1>

        {/* Hide TabContainer since we're using the modal for settings now */}

        <StatusDisplay gameStatus={gameStatus} message={getStatusMessage()} />

        <GameBoard
          board={board}
          handleCellClick={handleCellClick}
          isWinningCell={isWinningCell}
          gameStatus={gameStatus}
          gameMode={gameMode}
          currentPlayer={currentPlayer}
        />

        <GameInfo
          timer={timer}
          formatTime={formatTime}
          scores={scores}
          gameMode={gameMode}
        />

        {/* Reset Button */}
        <button
          onClick={resetGame}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg
                     shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                     flex items-center justify-center space-x-2"
          aria-label="Reset game"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Reset Game (R)</span>
        </button>
      </div>
    </div>
  );
}
