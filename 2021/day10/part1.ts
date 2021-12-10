import { checkBrackets, readInput } from './utils';

const weightMap: Map<string, number> = new Map([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

export const calculateResultPart1 = (filePath: string): number => {
  const inputArray = readInput(filePath);

  return inputArray.reduce((acc: number, curr: string[]): number => {
    const illegal: string[] = [];
    const chars: string[] = [];

    curr.forEach((bracket: string) => {
      checkBrackets(bracket, chars, illegal);
    });

    const weight = weightMap.get(illegal[0]) ?? 0;

    return acc + weight;
  }, 0);
};
