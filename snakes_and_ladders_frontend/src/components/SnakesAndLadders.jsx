import React from 'react';
import { snakesConfig, laddersConfig } from '../utils/gameConfig';

// PUBLIC_INTERFACE
const SnakesAndLadders = () => {
  return (
    <svg className="snakes-and-ladders-layer">
      {/* Ladders */}
      {laddersConfig.map((ladder, index) => (
        <g key={`ladder-${index}`} className="ladder">
          <line
            x1={ladder.start.x}
            y1={ladder.start.y}
            x2={ladder.end.x}
            y2={ladder.end.y}
            className="ladder-rail"
            style={{ stroke: 'var(--ladder-wood)' }}
          />
          {ladder.rungs.map((rung, i) => (
            <line
              key={`rung-${i}`}
              x1={rung.x1}
              y1={rung.y1}
              x2={rung.x2}
              y2={rung.y2}
              className="ladder-rung"
              style={{ stroke: ladder.color }}
            />
          ))}
        </g>
      ))}

      {/* Snakes */}
      {snakesConfig.map((snake, index) => (
        <path
          key={`snake-${index}`}
          d={snake.path}
          className="snake"
          style={{
            fill: 'none',
            stroke: snake.color,
            strokeWidth: snake.width
          }}
        />
      ))}
    </svg>
  );
};

export default SnakesAndLadders;
