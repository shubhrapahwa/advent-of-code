import { readFileSync } from 'fs';

/**
 * Part - 1
 */
export const calculateDepthIncrease = (filePath: string): number => {
  const inputArray = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((numAsStr: string): number => +numAsStr);

  return inputArray.reduce(
    (
      counter: number,
      currentValue: number,
      index: number,
      arr: number[]
    ): number => {
      if (index < 1) {
        return counter;
      }

      return currentValue > arr[index - 1] ? counter + 1 : counter;
    },
    0
  );
};

/**
 * Part - 2
 */
export const calculateDepthSumIncrease = (filePath: string): number => {
  const inputArray = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((numAsStr: string): number => +numAsStr);

  return inputArray.reduce(
    (
      counter: number,
      currentValue: number,
      index: number,
      arr: number[]
    ): number => {
      // window size is 3.
      if (index < 3) {
        return counter;
      }

      // A and beyond
      const newCurrentValue = currentValue + arr[index - 1] + arr[index - 2];
      const previousValue = arr[index - 1] + arr[index - 2] + arr[index - 3];

      return newCurrentValue > previousValue ? counter + 1 : counter;
    },
    0
  );
};
