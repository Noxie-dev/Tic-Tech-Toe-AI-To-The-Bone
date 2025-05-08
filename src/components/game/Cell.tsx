import { memo, useState } from 'react';
import type { FC } from 'react';

interface CellProps {
  value: 'X' | 'O' | null;
  onClick: () => void;
  isWinningCell: boolean;
  disabled: boolean;
}

const Cell: FC<CellProps> = memo(({ value, onClick, isWinningCell, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getCellClass = () => {
    const baseClass = `flex items-center justify-center w-24 h-24 text-4xl font-bold transition-all duration-300
      relative overflow-hidden rounded-lg transform`;

    let bgClass = 'bg-gray-900 border-2';
    let textClass = 'text-gray-300';
    let effectClass = '';
    let borderClass = 'border-gray-700';

    if (isWinningCell) {
      bgClass = 'bg-gradient-to-br from-emerald-900 to-emerald-950';
      textClass = 'text-emerald-300';
      borderClass = 'border-emerald-700';
      effectClass += ' animate-pulse';
    }

    if (value === 'X') {
      textClass = isWinningCell ? 'text-emerald-300' : 'text-blue-400';
    } else if (value === 'O') {
      textClass = isWinningCell ? 'text-emerald-300' : 'text-amber-400';
    }

    if (!value && !disabled) {
      if (isHovered) {
        bgClass = 'bg-gradient-to-br from-gray-800 to-gray-900';
        borderClass = 'border-gray-600';
        effectClass += ' scale-[1.03] shadow-lg shadow-blue-900/20';
      }
      if (isPressed) {
        bgClass = 'bg-gradient-to-br from-gray-900 to-gray-800';
        effectClass += ' scale-[0.98]';
      }
    }

    const stateClass = !value && !disabled ? 'cursor-pointer' : 'cursor-default';

    return `${baseClass} ${bgClass} ${textClass} ${borderClass} ${effectClass} ${stateClass}`;
  };

  const cellValue = value || 'empty';
  const cellStatus = isWinningCell ? 'winning' : '';

  // Add onKeyDown for accessibility if not already handled by a wrapper
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !value) {
      onClick();
      event.preventDefault();
    }
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      aria-label={`${cellValue} cell ${cellStatus}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0
        transition-opacity duration-300 ${isHovered && !value && !disabled ? 'opacity-100' : ''}`}></div>

      {value && (
        <div className={`relative transform transition-all duration-300 ${isWinningCell ? 'animate-bounce-subtle' : ''}`}>
          {value === 'X' ? (
            <span className="relative z-10 inline-block bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400
              filter drop-shadow-sm shadow-blue-400">X</span>
          ) : (
            <span className="relative z-10 inline-block bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-500
              filter drop-shadow-sm shadow-amber-400">O</span>
          )}
        </div>
      )}

      {isPressed && !value && !disabled && (
        <div className="absolute inset-0 bg-blue-500/20 animate-ripple rounded-lg"></div>
      )}
    </div>
  );
});

Cell.displayName = 'Cell';
export default Cell;