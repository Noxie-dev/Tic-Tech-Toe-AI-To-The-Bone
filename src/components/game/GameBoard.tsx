import React from 'react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, disabled = false }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] mx-auto">
      {board.map((cell, index) => (
        <Button
          key={index}
          variant="outline"
          className={cn('h-24 w-24 text-4xl font-bold flex items-center justify-center', {
            'text-blue-500': cell === 'X',
            'text-red-500': cell === 'O',
          })}
          disabled={disabled || cell !== null}
          onClick={() => onCellClick(index)}
        >
          {cell}
        </Button>
      ))}
    </div>
  );
};

export default GameBoard;
