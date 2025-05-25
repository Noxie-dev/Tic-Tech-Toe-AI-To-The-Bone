import React from 'react';
import { X } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-slate-900 border border-slate-700 rounded-lg shadow-xl text-white w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-blue-400">How to Play</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-3 text-gray-300">
          {/* How to Play Section - Content updated based on HelpModal.tsx */}
          {/* The main modal header "How to Play" is already present above, so we don't need another h3 here. */}
          {/* We will directly use the list structure. */}
          <div className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50">
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
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;
