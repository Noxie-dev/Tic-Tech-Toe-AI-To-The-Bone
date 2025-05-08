import React from 'react';
import Game from './components/game/Game';
import './index.css';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: '#f3f4f6',
      }}
    >
      <h1
        style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#1f2937',
        }}
      >
        Tic-Tac-Toe AI
      </h1>

      <Game />
    </div>
  );
}

export default App;
