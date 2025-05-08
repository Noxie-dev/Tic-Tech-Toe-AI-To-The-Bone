import { memo } from 'react';
import type { FC } from 'react';

interface StatusDisplayProps {
  gameStatus: 'ongoing' | 'won' | 'draw';
  message: string;
}

const StatusDisplay: FC<StatusDisplayProps> = ({ gameStatus, message }) => {
  // Function to highlight the current player symbol (X or O) with a glowing effect
  const formatPlayerMessage = (message: string) => {
    if (gameStatus !== 'ongoing' || !message.includes('Current Player:')) {
      return <span className="font-medium">{message}</span>;
    }

    // Extract the current player symbol (X or O)
    let playerSymbol = null;

    // Check for different message formats
    if (message.includes('(X)')) {
      playerSymbol = 'X';
    } else if (message.includes('(O)')) {
      playerSymbol = 'O';
    } else if (message.includes('Player X')) {
      playerSymbol = 'X';
    } else if (message.includes('Player O')) {
      playerSymbol = 'O';
    }

    if (!playerSymbol) {
      return <span className="font-medium">{message}</span>;
    }

    // For "Player X" or "Player O" format
    if (message.includes(`Player ${playerSymbol}`)) {
      return (
        <span className="font-medium">
          Current Player: Player{' '}
          <span
            className={`inline-block animate-pulse-glow font-bold ${
              playerSymbol === 'X'
                ? 'text-blue-400 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400'
                : 'text-amber-400 bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-500'
            }`}
          >
            {playerSymbol}
          </span>
        </span>
      );
    }

    // For other formats, split the message to insert the styled player symbol
    const parts = message.split(playerSymbol);
    const beforeSymbol = parts[0];
    const afterSymbol = parts.slice(1).join(playerSymbol);

    return (
      <span className="font-medium">
        {beforeSymbol}
        <span
          className={`inline-block animate-pulse-glow font-bold ${
            playerSymbol === 'X'
              ? 'text-blue-400 bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-purple-400'
              : 'text-amber-400 bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-500'
          }`}
        >
          {playerSymbol}
        </span>
        {afterSymbol}
      </span>
    );
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <div className={`relative px-4 py-2 rounded-lg font-medium text-center w-full overflow-hidden transition-all duration-300
        ${gameStatus === 'won'
          ? 'bg-gradient-to-r from-emerald-800/50 to-emerald-900/50 text-emerald-300 border border-emerald-500/30'
          : gameStatus === 'draw'
            ? 'bg-gradient-to-r from-amber-800/50 to-amber-900/50 text-amber-300 border border-amber-500/30'
            : 'bg-gradient-to-r from-blue-800/30 to-blue-900/30 text-blue-300 border border-blue-500/20'}`}
        aria-live="assertive">
        {/* Animated shine effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>

        {formatPlayerMessage(message)}
      </div>
    </div>
  );
};

StatusDisplay.displayName = 'StatusDisplay';
export default memo(StatusDisplay);
