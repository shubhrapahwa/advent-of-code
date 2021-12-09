import { createInputArray } from "./utils";

export const part1 = (filePath: string): number => {
  const inputArray = createInputArray(filePath);

  const lowestBits: number[][] = inputArray.map(
    (currentValue: number[], x: number, arr: number[][]) => {
      const lowestBit = currentValue.filter((value: number, y: number) => {
        if (
          (arr[x + 1] === undefined || arr[x + 1][y] > value) &&
          (x == 0 || arr[x - 1][y] > value) &&
          (y == 0 || currentValue[y - 1] > value) &&
          (currentValue[y + 1] === undefined || currentValue[y + 1] > value)
        ) {
          return true;
        }
        return false;
      });

      return lowestBit;
    }
  );

  const result = lowestBits
    .flat()
    .map((x) => x + 1)
    .reduce((acc, curr) => acc + curr, 0);

  return result;
};
