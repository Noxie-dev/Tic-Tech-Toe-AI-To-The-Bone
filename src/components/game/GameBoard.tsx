import { memo } from 'react';
import type { FC } from 'react';
import Cell from './Cell';

interface GameBoardProps {
  board: Array<'X' | 'O' | null>;
  handleCellClick: (index: number) => void;
  isWinningCell: (index: number) => boolean;
  gameStatus: 'ongoing' | 'won' | 'draw';
  gameMode: 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';
  currentPlayer: 'X' | 'O';
}

const GameBoard: FC<GameBoardProps> = memo(({
  board,
  handleCellClick,
  isWinningCell,
  gameStatus,
  gameMode,
  currentPlayer
}) => {
  // Determine if a cell should be disabled
  const isCellDisabled = (index: number): boolean => {
    // If cell is already filled
    if (board[index] !== null) return true;

    // If game is over
    if (gameStatus !== 'ongoing') return true;

    // If it's AI's turn in human vs AI mode
    if (gameMode === 'humanVsAI' && currentPlayer === 'O') return true;

    // If it's AI vs AI mode, all cells are disabled for user interaction
    if (gameMode === 'aiVsAI') return true;

    return false;
  };

  return (
    <div className="relative mb-6 w-full flex justify-center">
      {/* Enhanced glowing background for the game board */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-lg -z-10"></div>

      <div
        className="grid grid-cols-3 gap-2 p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 max-w-xs shadow-lg"
        role="grid"
        aria-label="Tic TECH Toe game board"
      >
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            isWinningCell={isWinningCell(index)}
            onClick={() => handleCellClick(index)}
            disabled={isCellDisabled(index)}
          />
        ))}
      </div>
    </div>
  );
});

GameBoard.displayName = 'GameBoard';
export default GameBoard;
