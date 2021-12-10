import {
  checkBrackets,
  completeMissingBrackets,
  readInput,
  sortAsc,
} from "./utils";

const weightMap: Map<string, number> = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4],
]);

export const calculateResultPart2 = (filePath: string): number => {
  const inputArray = readInput(filePath);

  const result = inputArray.reduce((accumulator: number[], currentValue, index, arr) => {
    const illegal: string[] = [];
    const chars: string[] = [];

    currentValue.forEach((bracket) => {
      checkBrackets(bracket, chars, illegal);
    });

    const incomplete: string[] = [];

    if (illegal.length === 0) {
      chars.forEach((bracket) => {
        completeMissingBrackets(bracket, incomplete);
      });
    }

    // calculate score
    const score = incomplete.reverse().reduce((acc: number, curr: string): number => {
      const weight = weightMap.get(curr) ?? 0;
      return acc * 5 + weight;
    }, 0);

    if (score !== 0) accumulator.push(score);

    return accumulator;
  }, []);

  return result.sort(sortAsc)[Math.floor(result.length / 2)];
};
