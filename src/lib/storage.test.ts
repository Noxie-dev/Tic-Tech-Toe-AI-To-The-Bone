import { describe, it, expect, beforeEach } from 'vitest';
import { loadScores, saveScores, updateScores } from './storage';

describe('Storage Functions', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('loadScores', () => {
    it('should return default scores when no scores are stored', () => {
      const scores = loadScores();
      expect(scores).toEqual({
        human: 0,
        ai1: 0,
        ai2: 0,
        draws: 0,
      });
    });

    it('should load scores from localStorage', () => {
      const testScores = {
        human: 5,
        ai1: 3,
        ai2: 1,
        draws: 2,
      };
      localStorage.setItem('tic-tac-toe-scores', JSON.stringify(testScores));
      
      const scores = loadScores();
      expect(scores).toEqual(testScores);
    });

    it('should return default scores if localStorage contains invalid JSON', () => {
      localStorage.setItem('tic-tac-toe-scores', 'invalid-json');
      
      const scores = loadScores();
      expect(scores).toEqual({
        human: 0,
        ai1: 0,
        ai2: 0,
        draws: 0,
      });
    });
  });

  describe('saveScores', () => {
    it('should save scores to localStorage', () => {
      const testScores = {
        human: 5,
        ai1: 3,
        ai2: 1,
        draws: 2,
      };
      
      saveScores(testScores);
      
      const storedScores = JSON.parse(localStorage.getItem('tic-tac-toe-scores') || '{}');
      expect(storedScores).toEqual(testScores);
    });
  });

  describe('updateScores', () => {
    it('should increment draw count on a draw', () => {
      const result = updateScores(null, 'human-vs-ai');
      expect(result.draws).toBe(1);
    });

    it('should increment human score when human wins in human-vs-ai mode', () => {
      const result = updateScores('X', 'human-vs-ai');
      expect(result.human).toBe(1);
    });

    it('should increment AI score when AI wins in human-vs-ai mode', () => {
      const result = updateScores('O', 'human-vs-ai');
      expect(result.ai1).toBe(1);
    });

    it('should increment AI1 score when AI1 wins in ai-vs-ai mode', () => {
      const result = updateScores('X', 'ai-vs-ai');
      expect(result.ai1).toBe(1);
    });

    it('should increment AI2 score when AI2 wins in ai-vs-ai mode', () => {
      const result = updateScores('O', 'ai-vs-ai');
      expect(result.ai2).toBe(1);
    });

    it('should not change player scores in human-vs-human mode', () => {
      const result = updateScores('X', 'human-vs-human');
      expect(result.human).toBe(0);
      expect(result.ai1).toBe(0);
    });

    it('should save updated scores to localStorage', () => {
      updateScores('X', 'human-vs-ai');
      
      const storedScores = JSON.parse(localStorage.getItem('tic-tac-toe-scores') || '{}');
      expect(storedScores.human).toBe(1);
    });
  });
});
