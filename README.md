# Tic-Tac-Toe AI

A modern Tic-Tac-Toe game with AI opponents built using React, TypeScript, and Shadcn UI.

## Features

- **Two Game Modes**:
  - Human vs AI: Play against an AI opponent
  - AI vs AI: Watch two AI algorithms compete against each other

- **Persistent Scoring**: Game scores are saved in localStorage and persist between sessions

- **Game Timer**: Track how long each game takes

- **Mobile-First Design**: Responsive layout that works well on all devices

- **Modern UI**: Clean, accessible interface built with Shadcn UI components

## AI Implementation

The game includes two AI implementations:

1. **Basic AI**: Makes decisions based on a priority system:
   - Win if possible
   - Block opponent's winning move
   - Take center if available
   - Take corners if available
   - Take edges if available
   - Choose a random empty cell

2. **Advanced AI**: Currently uses the same algorithm as the basic AI, but could be extended to use minimax with alpha-beta pruning for a more challenging opponent.

## Technologies Used

- React 19.1.0 with TypeScript
- Vite 6.3.5
- Tailwind CSS 3.4.1
- UI Components: Using utility libraries like class-variance-authority, clsx, and tailwind-merge
- Icons: Lucide React
- Linting: ESLint 9.25.0 with TypeScript ESLint

## Project Structure

```
Tic-Tac-Toe-AI/
├── src/
│   ├── components/
│   │   └── game/
│   │       └── Game.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── node_modules/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
├── eslint.config.js
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe-ai.git
   cd tic-tac-toe-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT
