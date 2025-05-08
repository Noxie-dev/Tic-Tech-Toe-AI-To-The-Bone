// Define the score structure
export interface Scores {
  human: number;
  ai1: number;
  ai2: number;
  draws: number;
}

const STORAGE_KEY = 'tic-tac-toe-scores';

// Load scores from localStorage
export const loadScores = (): Scores => {
  try {
    const storedScores = localStorage.getItem(STORAGE_KEY);
    if (storedScores) {
      return JSON.parse(storedScores);
    }
  } catch (error) {
    console.error('Error loading scores from localStorage:', error);
  }

  // Return default scores if none exist or there was an error
  return {
    human: 0,
    ai1: 0,
    ai2: 0,
    draws: 0,
  };
};

// Save scores to localStorage
export const saveScores = (scores: Scores): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving scores to localStorage:', error);
  }
};

// Update scores based on game result
export const updateScores = (
  winner: 'X' | 'O' | null,
  gameMode: 'human-vs-ai' | 'ai-vs-ai'
): Scores => {
  const scores = loadScores();

  if (winner === null) {
    // It's a draw
    scores.draws += 1;
  } else if (gameMode === 'human-vs-ai') {
    if (winner === 'X') {
      // Human wins (X)
      scores.human += 1;
    } else {
      // AI wins (O)
      scores.ai1 += 1;
    }
  } else {
    // AI vs AI mode
    if (winner === 'X') {
      // AI 1 wins (X)
      scores.ai1 += 1;
    } else {
      // AI 2 wins (O)
      scores.ai2 += 1;
    }
  }

  saveScores(scores);
  return scores;
};
