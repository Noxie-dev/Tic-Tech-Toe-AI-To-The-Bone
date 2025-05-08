import { describe, it, expect } from 'vitest';
import { makeAIMove, findWinningMove, evaluateBoard } from './gameLogic';

describe('Game Logic', () => {
  describe('findWinningMove', () => {
    it('should find a winning move for X in a row', () => {
      const board = [
        'X', 'X', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(2); // Third position in the top row
    });

    it('should find a winning move for X in a column', () => {
      const board = [
        'X', null, null,
        'X', null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(6); // Bottom of the first column
    });

    it('should find a winning move for X in a diagonal', () => {
      const board = [
        'X', null, null,
        null, 'X', null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(8); // Bottom-right corner
    });

    it('should find a winning move for O', () => {
      const board = [
        'O', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'O');
      expect(result).toBe(2); // Third position in the top row
    });

    it('should return -1 if no winning move is available', () => {
      const board = [
        'X', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(-1);
    });
  });

  describe('makeAIMove', () => {
    it('should make a winning move when available (medium difficulty)', () => {
      const board = [
        'O', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(2); // Complete the row for a win
    });

    it('should block opponent\'s winning move (medium difficulty)', () => {
      const board = [
        'X', 'X', null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(2); // Block X from winning
    });

    it('should take center if available and no winning/blocking moves (medium difficulty)', () => {
      const board = [
        'X', null, null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(4); // Center position
    });

    it('should make a move in hard difficulty', () => {
      const board = [
        'X', null, null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'hard');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(9);
    });

    it('should make a move in easy difficulty', () => {
      const board = [
        'X', null, null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'easy');
      expect(result).not.toBeNull();
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(9);
    });
  });

  describe('evaluateBoard', () => {
    it('should return a positive score for a board favorable to the maximizing player', () => {
      const board = [
        'X', 'X', null,
        null, 'O', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X', 'O');
      expect(score).toBeGreaterThan(0);
    });

    it('should return a negative score for a board favorable to the minimizing player', () => {
      const board = [
        'O', 'O', null,
        null, 'X', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X', 'O');
      expect(score).toBeLessThan(0);
    });

    it('should return a high positive score for a winning board for the maximizing player', () => {
      const board = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X', 'O');
      expect(score).toBeGreaterThan(0);
    });

    it('should return a high negative score for a winning board for the minimizing player', () => {
      const board = [
        'O', 'O', 'O',
        'X', 'X', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X', 'O');
      expect(score).toBeLessThan(0);
    });
  });
});
