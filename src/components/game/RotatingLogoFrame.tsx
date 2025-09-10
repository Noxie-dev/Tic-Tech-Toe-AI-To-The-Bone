import React from 'react';

interface RotatingLogoFrameProps {
  className?: string;
}

export const RotatingLogoFrame: React.FC<RotatingLogoFrameProps> = ({ className }) => {
  return (
    <div className={`relative w-40 h-40 flex items-center justify-center ${className}`}>
      {/* Rotating Frame */}
      <div className="absolute w-full h-full rotating-frame" />

      {/* Static Logo Container */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden z-10">
        <img
          src="/nanitech-logo.png"
          alt="NanTech DevShop Logo"
          className="w-full h-full object-cover rounded-full transform scale-110 logo-image"
        />
      </div>
    </div>
  );
};

export default RotatingLogoFrame;
