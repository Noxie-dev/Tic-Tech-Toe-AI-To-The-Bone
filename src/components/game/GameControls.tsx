import { memo } from 'react';
import GameModeSelection from './GameModeSelection';

type GameMode = 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';

interface GameControlsProps {
  onReset: () => void;
  gameMode: GameMode;
  onChangeMode: (mode: GameMode) => void;
}

const GameControls = ({ onReset, gameMode, onChangeMode }: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-center gap-2">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Reset Game
        </button>
      </div>

      <GameModeSelection
        gameMode={gameMode}
        onModeChange={onChangeMode}
      />
    </div>
  );
};

export default memo(GameControls);