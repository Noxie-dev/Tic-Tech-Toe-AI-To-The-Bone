import { memo } from 'react';
import type { FC } from 'react';
import { Brain, Zap, Shield } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

interface DifficultySelectionProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

const DifficultySelection: FC<DifficultySelectionProps> = ({
  difficulty,
  onDifficultyChange,
  disabled = false
}) => {
  return (
    <div
      className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0 mb-6 relative"
      role="radiogroup"
      aria-label="AI difficulty selection"
    >
      <div className="absolute inset-0 bg-gray-700/20 rounded-xl blur-sm -z-10"></div>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="easy"
          checked={difficulty === 'easy'}
          onChange={() => onDifficultyChange('easy')}
          aria-checked={difficulty === 'easy'}
          disabled={disabled}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${difficulty === 'easy'
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
            Easy
          </div>
          {difficulty === 'easy' && (
            <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="medium"
          checked={difficulty === 'medium'}
          onChange={() => onDifficultyChange('medium')}
          aria-checked={difficulty === 'medium'}
          disabled={disabled}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${difficulty === 'medium'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Brain className="w-4 h-4 mr-2" aria-hidden="true" />
            Medium
          </div>
          {difficulty === 'medium' && (
            <div className="absolute inset-0 bg-blue-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>

      <label className="flex items-center cursor-pointer relative">
        <input
          type="radio"
          className="sr-only"
          value="hard"
          checked={difficulty === 'hard'}
          onChange={() => onDifficultyChange('hard')}
          aria-checked={difficulty === 'hard'}
          disabled={disabled}
        />
        <div className={`px-4 py-2 rounded-lg font-medium transition-all duration-300
          ${difficulty === 'hard'
            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 scale-105'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
          role="radio">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
            Hard
          </div>
          {difficulty === 'hard' && (
            <div className="absolute inset-0 bg-purple-400/20 rounded-lg animate-pulse"></div>
          )}
        </div>
      </label>
    </div>
  );
};

DifficultySelection.displayName = 'DifficultySelection';
export default memo(DifficultySelection);
