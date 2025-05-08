import { memo } from 'react';
import type { FC } from 'react';
import { Code, Cpu, BrainCircuit } from 'lucide-react';

interface AlgorithmsTabProps {
  isActive: boolean;
  onActivate: () => void;
}

const AlgorithmsTab: FC<AlgorithmsTabProps> = ({ isActive, onActivate }) => {
  return (
    <button
      onClick={onActivate}
      className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-300 flex items-center
        ${isActive
          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30'
          : 'bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700'}`}
      role="tab"
      aria-selected={isActive}
      aria-controls="algorithms-panel"
    >
      <Code className="w-4 h-4 mr-2" aria-hidden="true" />
      Algorithms
      {isActive && (
        <div className="absolute inset-0 bg-indigo-400/20 rounded-t-lg animate-pulse"></div>
      )}
    </button>
  );
};

AlgorithmsTab.displayName = 'AlgorithmsTab';
export default memo(AlgorithmsTab);
