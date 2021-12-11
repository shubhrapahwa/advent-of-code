import { readFileSync } from 'fs';
import { countFlashes, findAdjacentPoints, findFreq } from './utils';

export const calculate = (filePath: string): void => {
  const input = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((element: string) => element.split('').map((x: string): number => +x));

  let count = 0;
  let step = 1;
  let numOfFlashes = 0;

  let initialMatrix = [...input];

  while (count <= 100) {
    // increment
    const outputMatrix = initialMatrix.map((x) => {
      return x.map((y) => y + 1);
    });

    // calculate numOfFlashes
    numOfFlashes = countFlashes(outputMatrix);

    while (numOfFlashes > 0) {
      // check numOfFlashes
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

    count = freq;

    if (freq === 100) {
      break;
    }

    initialMatrix = outputMatrix;

    step++;
  }

  console.log(step);
};

calculate('day11/input.txt');
