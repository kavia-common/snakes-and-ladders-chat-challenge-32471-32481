import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameBoard from './components/GameBoard';
import { rollDice, calculateNextPosition, generateAIResponse } from './utils/gameLogic';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  const [gameState, setGameState] = useState({
    playerPositions: {
      player1: 1,
      ai: 1
    },
    currentPlayer: 'player1',
    diceValue: null,
    rollingDice: false,
    gameOver: false,
    messages: [],
    lastAction: null
  });

  const addMessage = (text, sender) => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, { text, sender, timestamp: Date.now() }]
    }));
  };

  const handleDiceRoll = async () => {
    if (gameState.rollingDice || gameState.gameOver) return;

    setGameState(prev => ({ ...prev, rollingDice: true }));
    
    // Animate dice roll
    const value = rollDice();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentPos = gameState.playerPositions[gameState.currentPlayer];
    const newPos = calculateNextPosition(currentPos, value);
    
    // Determine message type based on position change
    let messageType = 'rolled';
    if (newPos > currentPos + value) messageType = 'climbed';
    if (newPos < currentPos + value) messageType = 'snake';
    if (newPos === 100) messageType = 'winning';

    setGameState(prev => ({
      ...prev,
      diceValue: value,
      playerPositions: {
        ...prev.playerPositions,
        [prev.currentPlayer]: newPos
      },
      rollingDice: false,
      lastAction: messageType,
      gameOver: newPos === 100
    }));

    // Add player message
    addMessage(`Rolled a ${value} and moved to ${newPos}`, 'player1');

    // Handle AI turn after short delay
    if (!gameState.gameOver && gameState.currentPlayer === 'player1') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      handleAITurn();
    }
  };

  const handleAITurn = async () => {
    setGameState(prev => ({ ...prev, currentPlayer: 'ai', rollingDice: true }));
    
    // AI rolls dice
    const value = rollDice();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentPos = gameState.playerPositions.ai;
    const newPos = calculateNextPosition(currentPos, value);
    
    // Determine message type
    let messageType = 'rolled';
    if (newPos > currentPos + value) messageType = 'climbed';
    if (newPos < currentPos + value) messageType = 'snake';
    if (newPos === 100) messageType = 'winning';

    setGameState(prev => ({
      ...prev,
      diceValue: value,
      playerPositions: {
        ...prev.playerPositions,
        ai: newPos
      },
      currentPlayer: 'player1',
      rollingDice: false,
      lastAction: messageType,
      gameOver: newPos === 100
    }));

    // Add AI messages
    const aiResponse = generateAIResponse({ lastAction: messageType });
    addMessage(`Rolled a ${value} and moved to ${newPos}`, 'ai');
    await new Promise(resolve => setTimeout(resolve, 500));
    addMessage(aiResponse, 'ai');
  };

  const handleNewGame = () => {
    setGameState({
      playerPositions: {
        player1: 1,
        ai: 1
      },
      currentPlayer: 'player1',
      diceValue: null,
      rollingDice: false,
      gameOver: false,
      messages: [],
      lastAction: null
    });
    addMessage("Let's play! I'll try to go easy on you... maybe.", 'ai');
  };

  // Initialize game
  useEffect(() => {
    handleNewGame();
  }, []);

  return (
    <div className="App">
      <div className="game-container">
        <div className="game-board-section">
          <GameBoard
            currentPlayer={gameState.currentPlayer}
            playerPositions={gameState.playerPositions}
            rollingDice={gameState.rollingDice}
          />
          <div className="game-controls">
            <motion.button
              className="btn"
              onClick={handleDiceRoll}
              disabled={gameState.currentPlayer !== 'player1' || gameState.rollingDice || gameState.gameOver}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Roll Dice
            </motion.button>
            {gameState.gameOver && (
              <motion.button
                className="btn"
                onClick={handleNewGame}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                New Game
              </motion.button>
            )}
          </div>
          {gameState.diceValue && (
            <motion.div
              className="dice"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {Array.from({ length: gameState.diceValue }).map((_, i) => (
                <div key={i} className="dot" />
              ))}
            </motion.div>
          )}
        </div>

        <div className="chat-panel">
          <h3>Game Chat</h3>
          <div className="chat-messages">
            <AnimatePresence>
              {gameState.messages.map((message, index) => (
                <motion.div
                  key={message.timestamp}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {message.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
