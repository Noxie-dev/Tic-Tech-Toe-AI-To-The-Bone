import { memo } from 'react';
import type { FC } from 'react';

interface StatusDisplayProps {
  gameStatus: 'ongoing' | 'won' | 'draw';
  message: string;
}

const StatusDisplay: FC<StatusDisplayProps> = ({ gameStatus, message }) => {

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

        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

StatusDisplay.displayName = 'StatusDisplay';
export default memo(StatusDisplay);
