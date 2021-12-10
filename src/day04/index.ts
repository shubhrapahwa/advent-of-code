import { readFileSync } from 'fs';
import {
  chunkArray,
  getMarkedMap,
  getOccurrences,
  getSum,
  Position,
} from './utils';

/**
 * Part - 1
 */
export const calculateResultPart1 = (filePath: string): void => {
  const inputArray = readFileSync(filePath, 'utf8').split('\n');

  const [pl, ...others] = inputArray;

  const playingNumbers = pl.split(',').map((num: string): number => +num);

  const boards = chunkArray(others, 6);

  let markedMap = new Map<number, Position[]>();
  let resultROW: number[] = [];
  let pnNumber: number = playingNumbers[0];
  let resultKey: number = 0;

  for (const currentPN of playingNumbers) {
    markedMap = getMarkedMap(markedMap, boards, currentPN);

    markedMap.forEach((value, key) => {
      if (value.length >= 5) {
        const x = value.map((x1) => x1.x);
        const y = value.map((y1) => y1.y);

        const occurrencesX = getOccurrences(x);

        const valuesX = Object.values(occurrencesX).find((x1) => x1 === 5);

        if (valuesX !== undefined) {
          const indexOfX =
            Object.keys(occurrencesX).find(
              (keyX) => occurrencesX[keyX] === valuesX
            ) ?? '0';
          resultKey = key;
          resultROW = boards[key][+indexOfX];
          pnNumber = currentPN;

          return;
        }

        const occurrencesY = getOccurrences(y);

        const valuesY = Object.values(occurrencesY).find((y1) => y1 === 5);

        if (valuesY !== undefined) {
          const indexOfY =
            Object.keys(occurrencesY).find(
              (keyY) => occurrencesY[keyY] === valuesY
            ) ?? '0';
          resultKey = key;
          resultROW = boards[key][+indexOfY];
          pnNumber = currentPN;
          return;
        }
      }
    });

    if (resultROW.length !== 0) {
      const sumOfUnMarkedNumbers = getSum(
        boards[resultKey],
        markedMap.get(resultKey)
      );

      console.log(sumOfUnMarkedNumbers * pnNumber);

      return;
    }
  }
};

/**
 * Part - 2
 */
export const calculateResultPart2 = (filePath: string): void => {
  const inputArray = readFileSync(filePath, 'utf8').split('\n');

  const [pl, ...others] = inputArray;

  const playingNumbers = pl.split(',').map((num: string): number => +num);

  const boards = chunkArray(others, 6);

  let markedMap = new Map<number, Position[]>();
  let pnNumber: number = playingNumbers[0];
  let resultKey: number = 0;
  const markedBoard: Set<number> = new Set<number>();

  for (const currentPN of playingNumbers) {
    markedMap = getMarkedMap(markedMap, boards, currentPN);

    markedMap.forEach((value, key) => {
      if (markedBoard.has(key)) {
        return;
      }

      if (value.length >= 5) {
        const x = value.map((x1) => x1.x);
        const y = value.map((y1) => y1.y);

        const occurrencesX = getOccurrences(x);

        const valuesX = Object.values(occurrencesX).find((val) => val === 5);

        if (valuesX !== undefined) {
          resultKey = key;
          pnNumber = currentPN;
          markedBoard.add(key);

          return;
        }

        const occurrencesY = getOccurrences(y);

        const valuesY = Object.values(occurrencesY).find((val) => val === 5);

        if (valuesY !== undefined) {
          resultKey = key;
          pnNumber = currentPN;
          markedBoard.add(key);

          return;
        }
      }
    });

    if (markedBoard.size === boards.length) {
      const sumOfUnMarkedNumbers = getSum(
        boards[resultKey],
        markedMap.get(resultKey)
      );

      console.log(sumOfUnMarkedNumbers * pnNumber);
      return;
    }
  }
};
