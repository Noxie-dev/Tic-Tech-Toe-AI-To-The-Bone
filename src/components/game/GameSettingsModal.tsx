import { useState, useEffect } from 'react';
import { X, Users, Shield, Zap, Brain, HelpCircle, Settings, Cpu } from 'lucide-react';

// Define types
type GameMode = 'humanVsHuman' | 'humanVsAI' | 'aiVsAI';
type Difficulty = 'easy' | 'medium' | 'hard';
type TabType = 'gameMode' | 'difficulty';

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

// Tooltip component for consistent term explanations
const Tooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block">
    <HelpCircle className="w-4 h-4 text-blue-400 inline-block ml-1 cursor-help" />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-xs text-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  </div>
);

const GameSettingsModal: React.FC<GameSettingsModalProps> = ({
  isOpen,
  onClose,
  gameMode,
  onModeChange,
  difficulty,
  onDifficultyChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('gameMode');

  // When game mode changes to one that involves AI, switch to difficulty tab
  useEffect(() => {
    if (gameMode === 'humanVsAI' || gameMode === 'aiVsAI') {
      // Only auto-switch if we're on the game mode tab and this is not the initial render
      if (activeTab === 'gameMode') {
        // Small delay for visual effect
        const timer = setTimeout(() => {
          setActiveTab('difficulty');
        }, 300);
        return () => clearTimeout(timer);
      }
    } else {
      // If game mode is humanVsHuman, always go back to game mode tab
      setActiveTab('gameMode');
    }
  }, [gameMode]);

  // Term definitions
  const termDefinitions = {
    BI: "Biological Intelligence: Human players who make decisions based on their own thinking.",
    AI: "Artificial Intelligence: Computer algorithm that calculates the best moves based on programmed logic."
  };

  // Explanation texts for game modes
  const modeDescriptions = {
    humanVsHuman: "Two human players take turns on the same device",
    humanVsAI: "You play against the computer's AI algorithm",
    aiVsAI: "Watch two AI algorithms play against each other"
  };

  // Explanation texts for difficulty levels
  const difficultyDescriptions = {
    easy: "Mostly random moves",
    medium: "Strategic priority-based moves",
    hard: "Optimal minimax algorithm"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      {/* Modal Content */}
      <div className="relative w-full max-w-md rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-b border-gray-700">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
            Game Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
            aria-label="Close settings modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Term Definitions */}
          <div className="flex justify-center space-x-6 mb-2">
            <div className="flex items-center">
              <span className="text-green-400 font-medium">BI</span>
              <Tooltip text={termDefinitions.BI} />
            </div>
            <div className="flex items-center">
              <span className="text-blue-400 font-medium">AI</span>
              <Tooltip text={termDefinitions.AI} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button
              type="button"
              className={`flex items-center px-4 py-2 font-medium transition-colors ${
                activeTab === 'gameMode'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('gameMode')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Game Mode
            </button>

            <button
              type="button"
              className={`flex items-center px-4 py-2 font-medium transition-colors ${
                activeTab === 'difficulty'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-gray-300'
              } ${(gameMode === 'humanVsHuman') ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                if (gameMode !== 'humanVsHuman') {
                  setActiveTab('difficulty');
                }
              }}
              disabled={gameMode === 'humanVsHuman'}
            >
              <Cpu className="w-4 h-4 mr-2" />
              Difficulty
              {gameMode !== 'humanVsHuman' && (
                <span className="ml-2 w-2 h-2 bg-purple-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[280px]">
            {/* Game Mode Tab */}
            {activeTab === 'gameMode' && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Game mode selection">
                  {/* Human vs Human */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="humanVsHuman"
                      checked={gameMode === 'humanVsHuman'}
                      onChange={() => onModeChange('humanVsHuman')}
                      aria-checked={gameMode === 'humanVsHuman'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      gameMode === 'humanVsHuman'
                        ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          gameMode === 'humanVsHuman'
                            ? 'bg-green-500'
                            : 'border border-gray-600'
                        }`}>
                          {gameMode === 'humanVsHuman' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Users className="w-4 h-4 mr-2 text-green-400" aria-hidden="true" />
                            BI vs BI
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{modeDescriptions.humanVsHuman}</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Human vs AI */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="humanVsAI"
                      checked={gameMode === 'humanVsAI'}
                      onChange={() => onModeChange('humanVsAI')}
                      aria-checked={gameMode === 'humanVsAI'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      gameMode === 'humanVsAI'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          gameMode === 'humanVsAI'
                            ? 'bg-blue-500'
                            : 'border border-gray-600'
                        }`}>
                          {gameMode === 'humanVsAI' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Shield className="w-4 h-4 mr-2 text-blue-400" aria-hidden="true" />
                            BI vs AI
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{modeDescriptions.humanVsAI}</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* AI vs AI */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="aiVsAI"
                      checked={gameMode === 'aiVsAI'}
                      onChange={() => onModeChange('aiVsAI')}
                      aria-checked={gameMode === 'aiVsAI'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      gameMode === 'aiVsAI'
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          gameMode === 'aiVsAI'
                            ? 'bg-purple-500'
                            : 'border border-gray-600'
                        }`}>
                          {gameMode === 'aiVsAI' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Zap className="w-4 h-4 mr-2 text-purple-400" aria-hidden="true" />
                            AI vs AI
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{modeDescriptions.aiVsAI}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Difficulty Tab */}
            {activeTab === 'difficulty' && (gameMode === 'humanVsAI' || gameMode === 'aiVsAI') && (
              <div className="animate-fade-in">
                <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="AI difficulty selection">
                  {/* Easy */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="easy"
                      checked={difficulty === 'easy'}
                      onChange={() => onDifficultyChange('easy')}
                      aria-checked={difficulty === 'easy'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      difficulty === 'easy'
                        ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 border-green-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          difficulty === 'easy'
                            ? 'bg-green-500'
                            : 'border border-gray-600'
                        }`}>
                          {difficulty === 'easy' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Shield className="w-4 h-4 mr-2 text-green-400" aria-hidden="true" />
                            Easy
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{difficultyDescriptions.easy}</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Medium */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="medium"
                      checked={difficulty === 'medium'}
                      onChange={() => onDifficultyChange('medium')}
                      aria-checked={difficulty === 'medium'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      difficulty === 'medium'
                        ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border-blue-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          difficulty === 'medium'
                            ? 'bg-blue-500'
                            : 'border border-gray-600'
                        }`}>
                          {difficulty === 'medium' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Brain className="w-4 h-4 mr-2 text-blue-400" aria-hidden="true" />
                            Medium
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{difficultyDescriptions.medium}</p>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Hard */}
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      className="sr-only"
                      value="hard"
                      checked={difficulty === 'hard'}
                      onChange={() => onDifficultyChange('hard')}
                      aria-checked={difficulty === 'hard'}
                    />
                    <div className={`p-3 rounded-lg border ${
                      difficulty === 'hard'
                        ? 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 border-purple-500'
                        : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex-shrink-0 ${
                          difficulty === 'hard'
                            ? 'bg-purple-500'
                            : 'border border-gray-600'
                        }`}>
                          {difficulty === 'hard' && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center font-medium text-white">
                            <Zap className="w-4 h-4 mr-2 text-purple-400" aria-hidden="true" />
                            Hard
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{difficultyDescriptions.hard}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {/* Back button - only show on difficulty tab */}
            <div>
              {activeTab === 'difficulty' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('gameMode')}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors"
                >
                  Back
                </button>
              )}
            </div>

            {/* Next button - only show on game mode tab when AI is involved */}
            <div>
              {activeTab === 'gameMode' && (gameMode === 'humanVsAI' || gameMode === 'aiVsAI') && (
                <button
                  type="button"
                  onClick={() => setActiveTab('difficulty')}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Contributors Section */}
          <section className="mt-6 pt-4 border-t border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-3 text-center">Contributors</h3>
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <img 
                  src="/nanitech-logo.png" 
                  alt="NanTech DevShop Logo" 
                  className="w-24 h-24 object-contain mb-2"
                />
                <span className="text-sm text-gray-300">NanTech DevShop</span>
              </div>
            </div>
          </section>

          {/* Start Game Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg
                     shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                     border border-blue-500/30"
            aria-label="Start game with selected settings"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSettingsModal;
