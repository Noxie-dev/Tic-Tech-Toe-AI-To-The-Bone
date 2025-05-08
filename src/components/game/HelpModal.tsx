import { useState } from 'react';
import { HelpCircle, X, Code, BookOpen } from 'lucide-react';
import AlgorithmsPanel from './AlgorithmsPanel';

interface HelpModalProps {
  className?: string;
}

const HelpModal: React.FC<HelpModalProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'help' | 'algorithms'>('help');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Help Icon Button */}
      <button
        onClick={openModal}
        className={`absolute top-2 right-2 p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-blue-400
          hover:text-blue-300 transition-all duration-300 backdrop-blur-sm border border-gray-700/50
          hover:border-gray-600/50 shadow-lg hover:shadow-blue-900/20 z-20 ${className}`}
        aria-label="Help and Information"
      >
        <HelpCircle className="w-5 h-5" />
        <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-b border-gray-700">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
                Tic Tac Toe - Game Guide
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
                aria-label="Close help modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Animated background effect similar to the game */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23818cf8\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '150px 150px' }}></div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700 px-6 pt-4" role="tablist">
              <button
                onClick={() => setActiveTab('help')}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-300 flex items-center relative
                  ${activeTab === 'help'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
                role="tab"
                aria-selected={activeTab === 'help'}
                aria-controls="help-panel"
              >
                <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
                Game Guide
                {activeTab === 'help' && (
                  <div className="absolute inset-0 bg-blue-400/20 rounded-t-lg animate-pulse"></div>
                )}
              </button>

              <button
                onClick={() => setActiveTab('algorithms')}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-300 flex items-center ml-2 relative
                  ${activeTab === 'algorithms'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
                role="tab"
                aria-selected={activeTab === 'algorithms'}
                aria-controls="algorithms-panel"
              >
                <Code className="w-4 h-4 mr-2" aria-hidden="true" />
                Algorithms
                {activeTab === 'algorithms' && (
                  <div className="absolute inset-0 bg-indigo-400/20 rounded-t-lg animate-pulse"></div>
                )}
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Help Panel */}
              {activeTab === 'help' && (
                <div id="help-panel" role="tabpanel" className="h-[400px] overflow-auto pr-2">
                  {/* Game Modes Section */}
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-400">Game Modes</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-green-400">Human vs Human</h4>
                        <p>Play against a friend on the same device. Take turns placing X and O on the board.</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-blue-400">Human vs AI</h4>
                        <p>Challenge the computer AI. You play as X, and the AI plays as O.</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-purple-400">AI vs AI</h4>
                        <p>Watch two AI players compete against each other. Great for learning strategies!</p>
                      </div>
                    </div>
                  </section>

                  {/* Difficulty Levels Section */}
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-400">AI Difficulty Levels</h3>
                    <div className="space-y-2 text-gray-300">
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-green-400">Easy</h4>
                        <p>The AI makes mostly random moves with occasional smart plays. Perfect for beginners.</p>
                        <p className="text-sm text-gray-400 mt-1">Strategy: 80% random moves, 20% strategic moves</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-blue-400">Medium</h4>
                        <p>The AI uses a priority-based strategy. It will try to win, block your wins, and make strategic moves.</p>
                        <p className="text-sm text-gray-400 mt-1">Strategy: Win if possible → Block opponent → Take center → Take corners → Take sides</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-purple-400">Hard</h4>
                        <p>The AI uses the minimax algorithm with alpha-beta pruning to make optimal moves. Extremely challenging!</p>
                        <p className="text-sm text-gray-400 mt-1">Strategy: Analyzes all possible future moves to find the best option</p>
                      </div>
                    </div>
                  </section>

                  {/* Game Features Section */}
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-400">Game Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-amber-400">Score Tracking</h4>
                        <p>The game keeps track of wins for each player and draws. Scores are saved between sessions.</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-amber-400">Game Timer</h4>
                        <p>A timer shows how long the current game has been in progress.</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-amber-400">Keyboard Shortcuts</h4>
                        <p>Press 'R' to reset the game at any time.</p>
                      </div>
                      <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
                        <h4 className="font-medium text-amber-400">Visual Effects</h4>
                        <p>Enjoy smooth animations, glowing effects, and a modern dark theme UI.</p>
                      </div>
                    </div>
                  </section>

                  {/* How to Play Section */}
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold text-blue-400">How to Play</h3>
                    <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 text-gray-300">
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Select a game mode (Human vs Human, Human vs AI, or AI vs AI).</li>
                        <li>If playing against AI, select a difficulty level (Easy, Medium, or Hard).</li>
                        <li>The game is played on a 3×3 grid.</li>
                        <li>Players take turns placing their symbol (X or O) in empty cells.</li>
                        <li>The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins.</li>
                        <li>If all cells are filled and no player has won, the game is a draw.</li>
                        <li>Use the Reset Game button or press 'R' to start a new game.</li>
                      </ol>
                    </div>
                  </section>
                </div>
              )}

              {/* Algorithms Panel */}
              {activeTab === 'algorithms' && (
                <AlgorithmsPanel isActive={true} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpModal;
