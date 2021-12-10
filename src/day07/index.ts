import { readFileSync } from 'fs';

const sortAsc = (a: number, b: number): number => {
  return a - b;
};

const findMinValueInMap = (map: Map<number, number>): number =>
  [...map.entries()].reduce((acc, curr) => (curr[1] < acc[1] ? curr : acc))[1];

const getPositions = (
  arr: number[]
): { minPosition: number; maxPosition: number } => {
  const maxPosition = arr.sort(sortAsc).pop() ?? 0;
  const minPosition = arr[0] ?? 0;

  return { minPosition, maxPosition };
};

enum DistanceType {
  LINEAR = 'linear',
  EXPONENTIAL = 'exponential',
}

export const calculateLeastDistance = (
  filePath: string,
  distanceType: string
): number | undefined => {
  const inputArray = readFileSync(filePath, 'utf8')
    .split(',')
    .map((num: string): number => +num);

  const { minPosition, maxPosition } = getPositions([...inputArray]);

  const result: Map<number, number> = new Map<number, number>();

  for (let i = minPosition; i <= maxPosition; i++) {
    let totalDistanceAtI: number = 0;

    inputArray.forEach((element) => {
      const distance = Math.abs(i - element);

      if (distanceType === DistanceType.LINEAR) {
        totalDistanceAtI += distance;
      }

      if (distanceType === DistanceType.EXPONENTIAL) {
        totalDistanceAtI += (distance * (distance + 1)) / 2;
      }
    });

    result.set(i, totalDistanceAtI);
  }

  return findMinValueInMap(result);
};
