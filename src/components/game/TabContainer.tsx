import GameModeSelection from './GameModeSelection';
import DifficultySelection from './DifficultySelection';
// Define difficulty type
type Difficulty = 'easy' | 'medium' | 'hard';

type GameMode = 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';

interface TabContainerProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  showDifficulty: boolean;
}

const TabContainer = ({
  gameMode,
  onModeChange,
  difficulty,
  onDifficultyChange,
  showDifficulty
}: TabContainerProps) => {

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-center text-blue-400 mb-4">Game Settings</h2>
      </div>

      <div>
        <GameModeSelection gameMode={gameMode} onModeChange={onModeChange} />

        {showDifficulty && (
          <DifficultySelection
            difficulty={difficulty}
            onDifficultyChange={onDifficultyChange}
          />
        )}
      </div>
    </div>
  );
};

export default TabContainer;
