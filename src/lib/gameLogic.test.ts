import { describe, it, expect } from 'vitest';
import { makeAIMove, findWinningMove, evaluateBoard } from './gameLogic';

describe('Game Logic', () => {
  describe('findWinningMove', () => {
    it('should find a winning move for X in a row', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'X', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(2); // Third position in the top row
    });

    it('should find a winning move for X in a column', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', null, null,
        'X', null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(6); // Bottom of the first column
    });

    it('should find a winning move for X in a diagonal', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', null, null,
        null, 'X', null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(8); // Bottom-right corner
    });

    it('should find a winning move for O', () => {
      const board: Array<'X' | 'O' | null> = [
        'O', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'O');
      expect(result).toBe(2); // Third position in the top row
    });

    it('should return null if no winning move is available', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = findWinningMove(board, 'X');
      expect(result).toBe(null);
    });
  });

  describe('makeAIMove', () => {
    it('should make a winning move when available (medium difficulty)', () => {
      const board: Array<'X' | 'O' | null> = [
        'O', 'O', null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(2); // Complete the row for a win
    });

    it('should block opponent\'s winning move (medium difficulty)', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'X', null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(2); // Block X from winning
    });

    it('should take center if available and no winning/blocking moves (medium difficulty)', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', null, null,
        null, null, null,
        null, null, null
      ];
      const result = makeAIMove(board, 'O', 'medium');
      expect(result).toBe(4); // Center position
    });

    it('should make a move in hard difficulty', () => {
      const board: Array<'X' | 'O' | null> = [
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
      const board: Array<'X' | 'O' | null> = [
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
    it('should return 0 for an ongoing game', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'X', null,
        null, 'O', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X');
      expect(score).toBe(0);
    });

    it('should return 0 for a draw', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      const score = evaluateBoard(board, 'X');
      expect(score).toBe(0);
    });

    it('should return a positive score for a winning board for the player', () => {
      const board: Array<'X' | 'O' | null> = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X');
      expect(score).toBe(10);
    });

    it('should return a negative score for a winning board for the opponent', () => {
      const board: Array<'X' | 'O' | null> = [
        'O', 'O', 'O',
        'X', 'X', null,
        null, null, null
      ];
      const score = evaluateBoard(board, 'X');
      expect(score).toBe(-10);
    });
  });
});
