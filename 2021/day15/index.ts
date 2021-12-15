import { readFileSync } from 'fs';

interface Point {
  x: number;
  y: number;
}

const findAdjacentPoints = (x: number, y: number): Point[] => [
  { x: x + 1, y },
  { x: x - 1, y },
  { x, y: y + 1 },
  { x, y: y - 1 },
];

const fillMatrix = (rowCount: number, columnCount: number): number[][] =>
  Array(rowCount)
    .fill(Infinity)
    .map(() => Array(columnCount).fill(Infinity));

export const calculate = (filePath: string, factor = 1): void => {
  const input = readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((x) => x.split('').map((y) => +y));

  const h = input.length;
  const w = input[0].length;

  const height = h * factor;
  const width = w * factor;

  const graph = [...Array(height)].map((_, y) => {
    return [...Array(width)].map((_, x) => {
      return (
        ((input[y % h][x % w] + Math.floor(y / h) + Math.floor(x / w) - 1) %
          9) +
        1
      );
    });
  });

  const riskGraph: number[][] = fillMatrix(height, width);

  graph[0][0] = 0;
  riskGraph[0][0] = 0;
  let i = 0;

  while (i < 10) {
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (x === 0 && y === 0) {
          continue;
        }
        const adjPoints = findAdjacentPoints(x, y);
        const adjRisks = adjPoints.map((p: Point) => {
          if (riskGraph[p.y]?.[p.x] !== undefined) {
            return riskGraph[p.y]?.[p.x];
          }
          return Infinity;
        });
        const minRisk = Math.min(...adjRisks);
        riskGraph[y][x] = minRisk + graph[y][x];
      }
    }
    i++;
  }

  // risk of bottom-right node
  console.log(riskGraph[height - 1][width - 1]);
};

calculate('./input.txt', 1);
calculate('./input.txt', 5);
