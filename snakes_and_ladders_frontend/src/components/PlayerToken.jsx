import React from 'react';
import { motion } from 'framer-motion';
import { getGridPosition } from '../utils/gameLogic';

// PUBLIC_INTERFACE
const PlayerToken = ({ player, position, isCurrentPlayer, isAnimating }) => {
  const gridPos = getGridPosition(position);
  
  const tokenColors = {
    player1: '#FF6B6B',
    player2: '#4ECDC4',
    ai: '#FFD93D'
  };

  const tokenAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className="player-token"
      style={{
        backgroundColor: tokenColors[player],
        gridRow: gridPos.gridRow,
        gridColumn: gridPos.gridColumn,
        border: `3px solid ${isCurrentPlayer ? '#fff' : 'rgba(255,255,255,0.5)'}`,
        zIndex: isCurrentPlayer ? 4 : 3
      }}
      initial="initial"
      animate={isCurrentPlayer && isAnimating ? "bounce" : "animate"}
      variants={tokenAnimation}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
    />
  );
};

export default PlayerToken;
