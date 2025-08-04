// PUBLIC_INTERFACE
export const getGridPosition = (squareNumber) => {
  const row = Math.ceil(squareNumber / 10);
  const isEvenRow = row % 2 === 0;
  const col = isEvenRow
    ? 10 - ((squareNumber - 1) % 10)  // Right to left
    : ((squareNumber - 1) % 10) + 1;  // Left to right
  
  return {
    gridRow: 11 - row,  // CSS Grid is top-down, board is bottom-up
    gridColumn: col
  };
};

// PUBLIC_INTERFACE
export const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

// PUBLIC_INTERFACE
export const checkSnakesAndLadders = (position) => {
  // Check if the position has a snake or ladder
  const snakes = {
    98: 21,
    87: 13,
    64: 20
  };

  const ladders = {
    4: 25,
    9: 31,
    17: 58,
    28: 84
  };

  return snakes[position] || ladders[position] || position;
};

// PUBLIC_INTERFACE
export const calculateNextPosition = (currentPosition, diceRoll) => {
  let newPosition = currentPosition + diceRoll;
  
  // Check if player has won
  if (newPosition > 100) {
    return currentPosition;
  }

  // Check for snakes and ladders
  return checkSnakesAndLadders(newPosition);
};

// PUBLIC_INTERFACE
export const generateAIResponse = (gameState) => {
  const responses = {
    rolled: [
      "Watch and learn!",
      "My lucky number!",
      "This is how it's done.",
      "You're in trouble now!"
    ],
    climbed: [
      "Up we go!",
      "Taking the express route!",
      "See you at the top!",
      "Climbing the corporate ladder!"
    ],
    snake: [
      "Oops, wrong turn!",
      "This wasn't part of the plan...",
      "Well, that's embarrassing.",
      "I meant to do that!"
    ],
    winning: [
      "Better luck next time!",
      "Was there ever any doubt?",
      "GG EZ!",
      "And that's how it's done!"
    ],
    losing: [
      "You just got lucky!",
      "I demand a rematch!",
      "This game is rigged!",
      "Well played... for a human."
    ]
  };

  const category = gameState.lastAction;
  const responses_array = responses[category] || responses.rolled;
  return responses_array[Math.floor(Math.random() * responses_array.length)];
};
