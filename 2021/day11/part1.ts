import { readFileSync } from 'fs';
import { findAdjacentPoints, findFreq, countFlashes } from './utils';

export const calculate = (filePath: string): void => {
  const input = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((element: string) =>
      element.split('').map((x: string): number => +x)
    );

  let count = 0;
  const steps = 100;
  let i = 0;

  let initialMatrix = [...input];

  while (i < steps) {
    // increment
    const outputMatrix = initialMatrix.map((x) => {
      return x.map((y) => y + 1);
    });

    // calculate numOfFlashes
    let numOfFlashes = countFlashes(outputMatrix);

    while (numOfFlashes > 0) {
      // check for flashes
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (outputMatrix[i][j] > 9) {
            // find and increase adjacent
            const adj = findAdjacentPoints(i, j, { height: 10, width: 10 });

            adj.forEach((point) => {
              const [x, y] = point;
              const val = outputMatrix[x][y];

              if (val !== 0) outputMatrix[x][y] = val + 1;
            });

            outputMatrix[i][j] = 0;
          }
        }
      }

      // re calculate numOfFlashes
      numOfFlashes = countFlashes(outputMatrix);
    }

    const freq = findFreq(outputMatrix, 0);

    count = count + freq;

    initialMatrix = outputMatrix;

    i++;
  }

  console.log(count);
};

calculate('day11/input.txt');
