import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameBoard from './GameBoard';

// Mock the Cell component
vi.mock('./Cell', () => ({
  default: ({ value, onClick, isWinningCell, disabled }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-value={value}
      data-winning={isWinningCell}
      aria-label={`Cell ${value || 'empty'}`}
    >
      {value}
    </button>
  ),
}));

describe('GameBoard Component', () => {
  it('should render a 3x3 grid', () => {
    const board = Array(9).fill(null);
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={() => false}
        gameStatus="ongoing"
        gameMode="humanVsHuman"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(9);
  });

  it('should render cells with correct values', () => {
    const board = [
      'X', null, 'O',
      null, 'X', null,
      'O', null, null
    ];
    
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={() => false}
        gameStatus="ongoing"
        gameMode="humanVsHuman"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    expect(cells[0]).toHaveAttribute('data-value', 'X');
    expect(cells[1]).toHaveAttribute('data-value', '');
    expect(cells[2]).toHaveAttribute('data-value', 'O');
    expect(cells[4]).toHaveAttribute('data-value', 'X');
    expect(cells[6]).toHaveAttribute('data-value', 'O');
  });

  it('should call handleCellClick with correct index when a cell is clicked', async () => {
    const board = Array(9).fill(null);
    const handleCellClick = vi.fn();
    
    render(
      <GameBoard
        board={board}
        handleCellClick={handleCellClick}
        isWinningCell={() => false}
        gameStatus="ongoing"
        gameMode="humanVsHuman"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    await userEvent.click(cells[3]); // Click the 4th cell (index 3)
    
    expect(handleCellClick).toHaveBeenCalledWith(3);
  });

  it('should mark winning cells correctly', () => {
    const board = [
      'X', 'X', 'X',
      null, 'O', null,
      'O', null, null
    ];
    
    const isWinningCell = (index: number) => [0, 1, 2].includes(index);
    
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={isWinningCell}
        gameStatus="won"
        gameMode="humanVsHuman"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    expect(cells[0]).toHaveAttribute('data-winning', 'true');
    expect(cells[1]).toHaveAttribute('data-winning', 'true');
    expect(cells[2]).toHaveAttribute('data-winning', 'true');
    expect(cells[3]).toHaveAttribute('data-winning', 'false');
  });

  it('should disable cells when game is not ongoing', () => {
    const board = Array(9).fill(null);
    
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={() => false}
        gameStatus="won"
        gameMode="humanVsHuman"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    // All cells should be disabled when game is won
    cells.forEach(cell => {
      expect(cell).toBeDisabled();
    });
  });

  it('should disable cells in AI vs AI mode', () => {
    const board = Array(9).fill(null);
    
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={() => false}
        gameStatus="ongoing"
        gameMode="aiVsAI"
        currentPlayer="X"
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    // All cells should be disabled in AI vs AI mode
    cells.forEach(cell => {
      expect(cell).toBeDisabled();
    });
  });

  it('should disable cells when it\'s AI\'s turn in Human vs AI mode', () => {
    const board = Array(9).fill(null);
    
    render(
      <GameBoard
        board={board}
        handleCellClick={() => {}}
        isWinningCell={() => false}
        gameStatus="ongoing"
        gameMode="humanVsAI"
        currentPlayer="O" // AI's turn
      />
    );
    
    const cells = screen.getAllByRole('button');
    
    // All cells should be disabled when it's AI's turn
    cells.forEach(cell => {
      expect(cell).toBeDisabled();
    });
  });
});
