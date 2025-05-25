import React, { useState } from 'react';
import { AtSign } from 'lucide-react';
import HowToPlayModal from './HowToPlayModal';

const HowToPlayButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="absolute top-2 right-12 p-2 rounded-full bg-gray-800/70 hover:bg-gray-700/70 text-blue-400 hover:text-blue-300 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/50 shadow-lg hover:shadow-blue-900/20 z-20"
        aria-label="How to Play"
      >
        <AtSign className="w-5 h-5" /> {/* Adjusted size to match HelpCircle */}
      </button>
      <HowToPlayModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default HowToPlayButton;
