import { memo } from 'react';
import type { FC } from 'react';
import { Users, Shield, Zap } from 'lucide-react';

type GameMode = 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';

interface GameModeSelectionProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameModeSelection: FC<GameModeSelectionProps> = ({ gameMode, onModeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 mb-6 relative" role="radiogroup" aria-label="Game mode selection">
      <div className="absolute inset-0 bg-gray-700/20 rounded-xl blur-sm -z-10"></div>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="humanVsHuman"
          checked={gameMode === 'humanVsHuman'}
          onChange={() => onModeChange('humanVsHuman')}
          aria-checked={gameMode === 'humanVsHuman'}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${gameMode === 'humanVsHuman'
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" aria-hidden="true" />
            Human vs Human
          </div>
          {gameMode === 'humanVsHuman' && (
            <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="humanVsAI"
          checked={gameMode === 'humanVsAI'}
          onChange={() => onModeChange('humanVsAI')}
          aria-checked={gameMode === 'humanVsAI'}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${gameMode === 'humanVsAI'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
            Human vs AI
          </div>
          {gameMode === 'humanVsAI' && (
            <div className="absolute inset-0 bg-blue-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="aiVsAI"
          checked={gameMode === 'aiVsAI'}
          onChange={() => onModeChange('aiVsAI')}
          aria-checked={gameMode === 'aiVsAI'}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${gameMode === 'aiVsAI'
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
            AI vs AI
          </div>
          {gameMode === 'aiVsAI' && (
            <div className="absolute inset-0 bg-purple-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>
    </div>
  );
};

GameModeSelection.displayName = 'GameModeSelection';
export default memo(GameModeSelection);
