import { readFileSync } from 'fs';
import { sortAsc } from '../day10/utils';

interface TargetArea {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

const probe = (
  x1: number,
  y1: number,
  ta: TargetArea
): number | undefined => {
  const { xMin, xMax, yMin, yMax } = ta;
  // start from (0,0)
  let [x, y] = [0, 0];
  let maxY = -Infinity;

  while (x <= xMax && y >= yMin) {
    x += x1;
    y += y1;
    maxY = Math.max(maxY, y);
    x1 -= Math.sign(x1);
    y1--;
    if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
      // if in range, return.
      return maxY;
    }
  }
};

const readInput = (filePath: string): TargetArea => {
  const [t, a, xRange, yRange] = readFileSync(filePath, 'utf-8').split(' ');
  const [xMin, xMax] = xRange
    .replaceAll(',', '')
    .split('=')[1]
    .split('..')
    .map((x) => +x);
  const [yMin, yMax] = yRange
    .split('=')[1]
    .split('..')
    .map((y) => +y);

  return { xMin, xMax, yMin, yMax };
};

const calculate = (filePath: string) => {
  const ta: TargetArea = readInput(filePath);

  const possibleYs = [-Infinity];

  for (let y1 = ta.yMin; y1 < -ta.yMin; y1++) {
    for (let x1 = ta.xMax; x1 > 0; x1--) {
      const maybeMaxY = probe(x1, y1, ta);
      if (maybeMaxY !== undefined) {
        possibleYs.push(maybeMaxY);
      }
    }
  }

  console.log('Part 1: ', possibleYs.sort(sortAsc).pop());
  console.log('Part 2: ', possibleYs.length);
};

calculate('./input.txt');
