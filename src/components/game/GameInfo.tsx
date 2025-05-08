import type { FC } from 'react';
import { memo } from 'react';
import { Clock, Shield, Zap } from 'lucide-react';

interface Scores {
  human: number;
  ai1: number;
  ai2: number;
  draw: number;
}

interface GameInfoProps {
  timer: number;
  formatTime: (seconds: number) => string;
  scores: Scores;
  gameMode: 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';
}

const GameInfo: FC<GameInfoProps> = ({ timer, formatTime, scores, gameMode }) => {
  return (
    <div className="flex flex-col space-y-4 mb-6">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-inner shadow-gray-900/80"
           aria-label="Game timer">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-blue-400 mr-2" aria-hidden="true" />
          <span className="text-gray-300">Time:</span>
        </div>
        <span className="font-mono font-medium text-blue-300">{formatTime(timer)}</span>
      </div>

      <div className="grid grid-cols-2 gap-2" aria-label="Game scores">
        {gameMode === 'humanVsHuman' ? (
          <>
            <div className="flex justify-between items-center px-4 py-3 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/50 transition-all duration-300 hover:bg-blue-900/30"
                 aria-label="Player X score">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-400 mr-2" aria-hidden="true" />
                <span className="text-blue-300">Player X:</span>
              </div>
              <span className="font-medium text-blue-300">{scores.human}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-800/50 transition-all duration-300 hover:bg-purple-900/30"
                 aria-label="Player O score">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-purple-400 mr-2" aria-hidden="true" />
                <span className="text-purple-300">Player O:</span>
              </div>
              <span className="font-medium text-purple-300">{scores.ai1}</span>
            </div>
          </>
        ) : gameMode === 'humanVsAI' ? (
          <>
            <div className="flex justify-between items-center px-4 py-3 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/50 transition-all duration-300 hover:bg-blue-900/30"
                 aria-label="Human player score">
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-blue-400 mr-2" aria-hidden="true" />
                <span className="text-blue-300">You:</span>
              </div>
              <span className="font-medium text-blue-300">{scores.human}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-800/50 transition-all duration-300 hover:bg-purple-900/30"
                 aria-label="AI player score">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-purple-400 mr-2" aria-hidden="true" />
                <span className="text-purple-300">AI:</span>
              </div>
              <span className="font-medium text-purple-300">{scores.ai1}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center px-4 py-3 bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-800/50 transition-all duration-300 hover:bg-blue-900/30"
                 aria-label="AI player one score">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-blue-400 mr-2" aria-hidden="true" />
                <span className="text-blue-300">AI 1 (X):</span>
              </div>
              <span className="font-medium text-blue-300">{scores.ai1}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-800/50 transition-all duration-300 hover:bg-purple-900/30"
                 aria-label="AI player two score">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-purple-400 mr-2" aria-hidden="true" />
                <span className="text-purple-300">AI 2 (O):</span>
              </div>
              <span className="font-medium text-purple-300">{scores.ai2}</span>
            </div>
          </>
        )}
        <div className="col-span-2 flex justify-between items-center px-4 py-3 bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-700/30 transition-all duration-300 hover:bg-gray-800/50"
             aria-label="Draws count">
          <span className="text-gray-400">Draws:</span>
          <span className="font-medium text-gray-400">{scores.draw}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(GameInfo);