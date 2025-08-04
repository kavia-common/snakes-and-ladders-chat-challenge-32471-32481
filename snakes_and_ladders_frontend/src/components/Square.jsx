import React from 'react';
import { motion } from 'framer-motion';

// PUBLIC_INTERFACE
const Square = ({ number, position, onClick }) => {
  const getSquareColor = () => {
    // Alternating color pattern based on number
    const colorMap = {
      0: 'var(--board-yellow)',
      1: 'var(--board-red)',
      2: 'var(--board-green)',
      3: 'var(--board-blue)',
    };
    return colorMap[number % 4] || colorMap[0];
  };

  return (
    <motion.div
      className="board-square"
      style={{
        backgroundColor: getSquareColor(),
        gridRow: position.gridRow,
        gridColumn: position.gridColumn,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="square-number">{number}</span>
    </motion.div>
  );
};

export default Square;
