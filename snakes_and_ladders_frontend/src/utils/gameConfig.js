// Snakes configuration with SVG paths
export const snakesConfig = [
  {
    id: 'snake1',
    color: 'var(--snake-green)',
    width: 20,
    path: 'M 980 100 C 900 300, 800 400, 210 800', // Snake from 98 to 21
    head: 98,
    tail: 21
  },
  {
    id: 'snake2',
    color: 'var(--snake-blue)',
    width: 15,
    path: 'M 870 200 C 800 400, 600 500, 130 700', // Snake from 87 to 13
    head: 87,
    tail: 13
  },
  {
    id: 'snake3',
    color: 'var(--snake-green)',
    width: 15,
    path: 'M 640 400 C 500 500, 400 600, 200 700', // Snake from 64 to 20
    head: 64,
    tail: 20
  }
];

// Ladders configuration
export const laddersConfig = [
  {
    id: 'ladder1',
    color: 'var(--ladder-red)',
    start: { x: 40, y: 900 },
    end: { x: 250, y: 700 },
    rungs: [
      { x1: 40, y1: 850, x2: 230, y2: 850 },
      { x1: 45, y1: 800, x2: 235, y2: 800 },
      { x1: 50, y1: 750, x2: 240, y2: 750 }
    ]
  },
  {
    id: 'ladder2',
    color: 'var(--ladder-orange)',
    start: { x: 90, y: 900 },
    end: { x: 310, y: 650 },
    rungs: [
      { x1: 90, y1: 850, x2: 290, y2: 850 },
      { x1: 95, y1: 800, x2: 295, y2: 800 },
      { x1: 100, y1: 750, x2: 300, y2: 750 }
    ]
  },
  {
    id: 'ladder3',
    color: 'var(--ladder-red)',
    start: { x: 170, y: 800 },
    end: { x: 580, y: 500 },
    rungs: [
      { x1: 170, y1: 750, x2: 560, y2: 750 },
      { x1: 175, y1: 700, x2: 565, y2: 700 },
      { x1: 180, y1: 650, x2: 570, y2: 650 }
    ]
  },
  {
    id: 'ladder4',
    color: 'var(--ladder-orange)',
    start: { x: 280, y: 700 },
    end: { x: 840, y: 200 },
    rungs: [
      { x1: 280, y1: 650, x2: 820, y2: 650 },
      { x1: 285, y1: 600, x2: 825, y2: 600 },
      { x1: 290, y1: 550, x2: 830, y2: 550 }
    ]
  }
];
