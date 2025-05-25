import { memo } from 'react';
import type { FC } from 'react';
import { BrainCircuit, Sigma, GitBranch, Infinity as InfinityIcon } from 'lucide-react';

interface AlgorithmsPanelProps {
  isActive: boolean;
}

const AlgorithmsPanel: FC<AlgorithmsPanelProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div
      id="algorithms-panel"
      role="tabpanel"
      className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 mb-6 overflow-auto h-[400px] text-sm"
    >
      <div className="space-y-4">
        {/* Minimax Algorithm */}
        <div className="p-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-900/50">
          <div className="flex items-center mb-2">
            <BrainCircuit className="w-5 h-5 mr-2 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-400">Minimax Algorithm with α-β Pruning</h3>
          </div>
          <div className="text-gray-300 space-y-2">
            <p>
              A recursive depth-first adversarial search algorithm implementing perfect play in zero-sum games.
              The algorithm recursively evaluates the game tree using the minimax decision rule:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-blue-300">
{`function minimax(node, depth, isMaximizingPlayer, α, β):
    if node is a terminal node or depth = 0:
        return static evaluation of node

    if isMaximizingPlayer:
        value := -∞
        for each child of node:
            value := max(value, minimax(child, depth-1, false, α, β))
            α := max(α, value)
            if β ≤ α:
                break // β cutoff
        return value
    else:
        value := +∞
        for each child of node:
            value := min(value, minimax(child, depth-1, true, α, β))
            β := min(β, value)
            if β ≤ α:
                break // α cutoff
        return value`}
              </pre>
            </div>
            <p>
              Time complexity: O(b<sup>m</sup>) where b is the branching factor and m is the maximum depth.
              With α-β pruning, the complexity is reduced to O(b<sup>m/2</sup>) in the best case, though
              the worst-case remains O(b<sup>m</sup>).
            </p>
            <p className="text-xs text-gray-400">
              The algorithm employs a heuristic evaluation function that assigns scores to terminal states:
              +10 for AI win, -10 for AI loss, and 0 for draws, with depth-adjusted scoring to prefer
              shorter paths to victory.
            </p>
          </div>
        </div>

        {/* Heuristic Evaluation */}
        <div className="p-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-900/50">
          <div className="flex items-center mb-2">
            <Sigma className="w-5 h-5 mr-2 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-400">Heuristic Evaluation Function</h3>
          </div>
          <div className="text-gray-300 space-y-2">
            <p>
              The static evaluation function f(s) for non-terminal states employs positional heuristics
              and pattern recognition:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-green-300">
{`f(s) = ∑(w_i × p_i(s))

where:
- w_i represents the weight of pattern i
- p_i(s) is 1 if pattern i exists in state s, 0 otherwise

Patterns include:
- Center control: w_center = 3
- Corner occupation: w_corner = 2
- Edge occupation: w_edge = 1
- Two-in-a-row with open third: w_two_row = 5
- Blocking opponent's two-in-a-row: w_block = 4`}
              </pre>
            </div>
            <p>
              For terminal states, the evaluation function is defined as:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-green-300">
{`f(s) = {
   +10 - depth  if AI wins
   -10 + depth  if opponent wins
   0            if draw
}`}
              </pre>
            </div>
            <p className="text-xs text-gray-400">
              The depth adjustment incentivizes the algorithm to prefer shorter paths to victory and
              longer paths to defeat, optimizing for efficient play.
            </p>
          </div>
        </div>

        {/* Alpha-Beta Pruning */}
        <div className="p-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-900/50">
          <div className="flex items-center mb-2">
            <GitBranch className="w-5 h-5 mr-2 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-400">Alpha-Beta Pruning Optimization</h3>
          </div>
          <div className="text-gray-300 space-y-2">
            <p>
              Alpha-Beta pruning is an optimization technique that reduces the number of nodes evaluated
              in the minimax algorithm's search tree:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-purple-300">
{`α = maximum lower bound of possible solutions
β = minimum upper bound of possible solutions

Pruning occurs when:
- MAX node: current value ≥ β (β cutoff)
- MIN node: current value ≤ α (α cutoff)

Efficiency depends on node ordering:
- Examine best moves first for MAX
- Examine worst moves first for MIN`}
              </pre>
            </div>
            <p>
              The pruning efficiency E can be approximated as:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-purple-300">
{`E ≈ b^(d/2)

where:
- b is the branching factor
- d is the search depth`}
              </pre>
            </div>
            <p className="text-xs text-gray-400">
              With optimal move ordering, the effective branching factor is reduced to approximately
              the square root of the original branching factor, allowing for significantly deeper search.
            </p>
          </div>
        </div>

        {/* Dynamic Depth Adjustment */}
        <div className="p-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-900/50">
          <div className="flex items-center mb-2">
            <InfinityIcon className="w-5 h-5 mr-2 text-indigo-400" />
            <h3 className="text-lg font-semibold text-indigo-400">Dynamic Depth Adjustment</h3>
          </div>
          <div className="text-gray-300 space-y-2">
            <p>
              The algorithm employs dynamic depth adjustment based on the game state complexity:
            </p>
            <div className="p-2 bg-gray-900/70 rounded border border-gray-700 font-mono text-xs overflow-x-auto">
              <pre className="text-yellow-300">
{`maxDepth = f(emptyCells, difficulty)

where:
- emptyCells is the number of unoccupied positions
- difficulty is the selected AI difficulty level

For hard difficulty:
maxDepth = {
  4  if emptyCells > 7
  6  if 5 < emptyCells ≤ 7
  9  if emptyCells ≤ 5
}`}
              </pre>
            </div>
            <p>
              This approach balances computational efficiency with strategic depth, allowing for:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Shallower search in early game (high branching factor)</li>
              <li>Deeper search in late game (reduced state space)</li>
              <li>Complete endgame solving when few moves remain</li>
            </ul>
            <p className="text-xs text-gray-400">
              The search depth is inversely proportional to the remaining empty cells, with a non-linear
              scaling factor to optimize the trade-off between computation time and move quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

AlgorithmsPanel.displayName = 'AlgorithmsPanel';
export default memo(AlgorithmsPanel);
