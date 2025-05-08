import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TimerDisplayProps {
  seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ seconds }) => {
  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Game Time</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-mono text-center">{formatTime(seconds)}</p>
      </CardContent>
    </Card>
  );
};

export default TimerDisplay;
