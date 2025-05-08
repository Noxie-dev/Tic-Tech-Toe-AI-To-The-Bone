import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ScoreDisplayProps {
  scores: {
    human: number;
    ai1: number;
    ai2: number;
    draws: number;
  };
  gameMode: 'human-vs-ai' | 'ai-vs-ai';
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ scores, gameMode }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          {gameMode === 'human-vs-ai' ? (
            <>
              <div className="text-center">
                <p className="text-sm font-medium">You (X)</p>
                <p className="text-2xl font-bold">{scores.human}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Draws</p>
                <p className="text-2xl font-bold">{scores.draws}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">AI (O)</p>
                <p className="text-2xl font-bold">{scores.ai1}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm font-medium">AI 1 (X)</p>
                <p className="text-2xl font-bold">{scores.ai1}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Draws</p>
                <p className="text-2xl font-bold">{scores.draws}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">AI 2 (O)</p>
                <p className="text-2xl font-bold">{scores.ai2}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDisplay;
