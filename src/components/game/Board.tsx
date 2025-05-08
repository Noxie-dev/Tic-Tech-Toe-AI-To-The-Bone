import { memo } from 'react';
import Cell from './Cell';

type BoardProps = {
  board: Array<'X' | 'O' | null>;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
};

const Board = ({ board, onCellClick, winningLine, disabled }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index) || false}
          disabled={disabled || cell !== null}
        />
      ))}
    </div>
  );
};

export default memo(Board);