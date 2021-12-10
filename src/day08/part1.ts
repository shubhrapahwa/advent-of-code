import { readFileSync } from 'fs';

export const calculateResultPart1 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, 'utf8')
    .split('\n')
    .map((x) => x.split(' | ')[1]);

  let sum = 0;

  // Unique lengths for 1, 4, 7, 8 respectively.
  const unique = [2, 4, 3, 7];

  inputArray.forEach((element) => {
    const input = element.split(' ');

    const sumIs = input.filter((x) => unique.includes(x.length));

    sum += sumIs.length;
  });

  return sum;
};
