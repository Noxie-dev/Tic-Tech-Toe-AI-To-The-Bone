import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { RadioGroup, Radio } from '../ui/radio-group';

interface ModeSelectionProps {
  gameMode: 'human-vs-human' | 'human-vs-ai' | 'ai-vs-ai';
  onModeChange: (mode: 'human-vs-human' | 'human-vs-ai' | 'ai-vs-ai') => void;
  disabled?: boolean;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({
  gameMode,
  onModeChange,
  disabled = false,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Game Mode</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={gameMode}
          onValueChange={value => onModeChange(value as 'human-vs-human' | 'human-vs-ai' | 'ai-vs-ai')}
          className="flex justify-center space-x-4"
        >
          <Radio value="human-vs-human" label="Human vs Human" disabled={disabled} />
          <Radio value="human-vs-ai" label="Human vs AI" disabled={disabled} />
          <Radio value="ai-vs-ai" label="AI vs AI" disabled={disabled} />
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ModeSelection;
