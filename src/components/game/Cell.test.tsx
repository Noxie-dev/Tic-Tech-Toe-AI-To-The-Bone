import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cell from './Cell';

describe('Cell Component', () => {
  it('should render an empty cell', () => {
    render(<Cell value={null} onClick={() => {}} isWinningCell={false} disabled={false} />);
    const cell = screen.getByRole('button');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute('aria-label', 'Empty cell');
  });

  it('should render a cell with X', () => {
    render(<Cell value="X" onClick={() => {}} isWinningCell={false} disabled={false} />);
    const cell = screen.getByRole('button');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute('aria-label', 'Cell with X');
    expect(cell).toHaveTextContent('X');
  });

  it('should render a cell with O', () => {
    render(<Cell value="O" onClick={() => {}} isWinningCell={false} disabled={false} />);
    const cell = screen.getByRole('button');
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveAttribute('aria-label', 'Cell with O');
    expect(cell).toHaveTextContent('O');
  });

  it('should apply winning cell styles when isWinningCell is true', () => {
    render(<Cell value="X" onClick={() => {}} isWinningCell={true} disabled={false} />);
    const cell = screen.getByRole('button');
    // Check for winning cell class or style
    expect(cell.className).toContain('winning');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Cell value={null} onClick={() => {}} isWinningCell={false} disabled={true} />);
    const cell = screen.getByRole('button');
    expect(cell).toBeDisabled();
  });

  it('should call onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Cell value={null} onClick={handleClick} isWinningCell={false} disabled={false} />);
    const cell = screen.getByRole('button');
    
    await userEvent.click(cell);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    render(<Cell value={null} onClick={handleClick} isWinningCell={false} disabled={true} />);
    const cell = screen.getByRole('button');
    
    await userEvent.click(cell);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should not call onClick when already filled', async () => {
    const handleClick = vi.fn();
    render(<Cell value="X" onClick={handleClick} isWinningCell={false} disabled={false} />);
    const cell = screen.getByRole('button');
    
    await userEvent.click(cell);
    
    // The component should be disabled internally when it has a value
    expect(handleClick).not.toHaveBeenCalled();
  });
});
