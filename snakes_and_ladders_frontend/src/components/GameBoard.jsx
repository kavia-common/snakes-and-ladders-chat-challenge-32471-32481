import React from 'react';
import { motion } from 'framer-motion';
import { getGridPosition } from '../utils/gameLogic';
import Square from './Square';
import PlayerToken from './PlayerToken';
import SnakesAndLadders from './SnakesAndLadders';

// PUBLIC_INTERFACE
const GameBoard = ({ currentPlayer, playerPositions, onSquareClick, rollingDice }) => {
  const squares = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="board-container">
      {/* Snakes and Ladders Layer */}
      <SnakesAndLadders />
      
      {/* Board Squares */}
      {squares.map((number) => {
        const position = getGridPosition(number);
        return (
          <Square
            key={number}
            number={number}
            position={position}
            onClick={() => onSquareClick(number)}
          />
        );
      })}

      {/* Player Tokens */}
      {Object.entries(playerPositions).map(([player, position]) => (
        <PlayerToken
          key={player}
          player={player}
          position={position}
          isCurrentPlayer={currentPlayer === player}
          isAnimating={rollingDice}
        />
      ))}
    </div>
  );
};

export default GameBoard;
