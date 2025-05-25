import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Game from './Game';

// Mock the gameLogic module
vi.mock('../../lib/gameLogic', () => ({
  makeAIMove: vi.fn((board) => {
    // Find the first empty cell
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return i;
      }
    }
    return null;
  }),
}));

describe('Game Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Reset all mocks
    vi.clearAllMocks();

    // Mock timer
    vi.useFakeTimers();
  });

  it('should render the game title', () => {
    render(<Game />);
    expect(screen.getByText('Tic TECH Toe')).toBeInTheDocument();
  });

  it('should show settings modal on initial render', () => {
    render(<Game />);
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
  });

  it('should start game when settings are confirmed', async () => {
    render(<Game />);

    // Select BI vs AI mode
    const biVsAiOption = screen.getByText('BI vs AI');
    await userEvent.click(biVsAiOption);

    // Click Start Game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Check that the game board is visible
    expect(screen.getByRole('grid', { name: /Tic TECH Toe game board/i })).toBeInTheDocument();
  });

  it('should update the board when a cell is clicked', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Find all cells
    const cells = screen.getAllByRole('button', { name: /cell/i });

    // Click the first cell
    await userEvent.click(cells[0]);

    // Check that the cell now contains X
    expect(cells[0]).toHaveTextContent('X');
  });

  it('should not allow clicking on an already filled cell', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Find all cells
    const cells = screen.getAllByRole('button', { name: /cell/i });

    // Click the first cell
    await userEvent.click(cells[0]);

    // Try to click the same cell again
    await userEvent.click(cells[0]);

    // Check that the cell still contains X (not O)
    expect(cells[0]).toHaveTextContent('X');
  });

  it('should reset the game when reset button is clicked', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Find all cells
    const cells = screen.getAllByRole('button', { name: /cell/i });

    // Click the first cell
    await userEvent.click(cells[0]);

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /reset game/i });
    await userEvent.click(resetButton);

    // Check that settings modal is shown again
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
  });

  it('should reset the game when R key is pressed', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Find all cells
    const cells = screen.getAllByRole('button', { name: /cell/i });

    // Click the first cell
    await userEvent.click(cells[0]);

    // Press R key
    fireEvent.keyDown(document, { key: 'r' });

    // Check that settings modal is shown again
    expect(screen.getByText('Game Settings')).toBeInTheDocument();
  });

  it('should start timer on first move', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Find all cells
    const cells = screen.getAllByRole('button', { name: /cell/i });

    // Click the first cell
    await userEvent.click(cells[0]);

    // Advance timer
    vi.advanceTimersByTime(3000);

    // Check that timer is running
    expect(screen.getByText('Time:')).toBeInTheDocument();
  });

  it('should show help modal when help button is clicked', async () => {
    render(<Game />);

    // Start the game
    const startButton = screen.getByText('Start Game');
    await userEvent.click(startButton);

    // Click help button
    const helpButton = screen.getByRole('button', { name: /help and information/i });
    await userEvent.click(helpButton);

    // Check that help modal is shown
    expect(screen.getByText('Game Guide')).toBeInTheDocument();
  });
});
