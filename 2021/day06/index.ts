import { readFileSync } from 'fs';

const fishGrowthInADay = (
  fishMap: Map<string, number>
): Map<string, number> => {
  const resultMap = new Map<string, number>();

  for (let i = 0; i < 9; i++) {
    const val = fishMap.get(i.toString()) ?? 0;
    const idx = ((i + 8) % 9).toString();

    resultMap.set(idx, val);
  }

  const valOfSix = (resultMap.get('6') ?? 0) + (fishMap.get('0') ?? 0);

  resultMap.set('6', valOfSix);

  return resultMap;
};

export const calculateNumberOfFishes = (
  filePath: string,
  days: number
): number => {
  const inputArray = readFileSync(filePath, 'utf8')
    .split(',')
    .map((num: string): number => +num);

  let fishMap = new Map<string, number>();

  inputArray.forEach((element: number) => {
    const idx = element.toString();
    const value = fishMap.get(idx);

    if (value === undefined) {
      fishMap.set(idx, 1);
    } else {
      fishMap.set(element.toString(), value + 1);
    }
  });

  for (let i = 0; i < days; i++) {
    fishMap = fishGrowthInADay(fishMap);
  }

  return Array.from(fishMap.values()).reduce((acc, curr) => acc + curr);
};
