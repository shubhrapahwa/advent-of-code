import { readFileSync } from 'fs';

interface Pairs {
  code: string;
  count: number;
  pair: string;
}

export const calculate = (filePath: string, steps: number): number => {
  const [[template], rules] = readFileSync(filePath, 'utf8')
    .split('\n\n')
    .map((rule) => rule.split('\n'));

  const ruleSet = new Map<string, string>();

  rules.forEach((rule) => {
    const [key, value] = rule.split(' -> ');
    ruleSet.set(key, value);
  });

  const frequency: Map<string, number> = [...template].reduce(
    (acc, value) => acc.set(value, (acc.get(value) ?? 0) + 1),
    new Map<string, number>()
  );

  let templatePairs: Map<string, number> = [...template].reduce(
    (acc, curr, idx, arr) =>
      idx + 1 < arr.length
        ? acc.set(curr + arr[idx + 1], (acc.get(curr + arr[idx + 1]) ?? 0) + 1)
        : acc,
    new Map<string, number>()
  );

  let i = 0;

  while (i < steps) {
    const pairs: Pairs[] = [...templatePairs.entries()].map(
      ([pair, count]): Pairs => {
        return { pair, count, code: ruleSet.get(pair) ?? 'X' };
      }
    );

    templatePairs = pairs.reduce((acc, { pair, code, count }) => {
      // increase count
      frequency.set(code, (frequency.get(code) ?? 0) + count);

      const [a, b] = pair.split('');

      // conclude insertion step
      [a + code, code + b].reduce(
        (acc1, curr1) => acc1.set(curr1, (acc1.get(curr1) ?? 0) + count),
        acc
      );

      return acc;
    }, new Map<string, number>());

    i++;
  }

  const max = Math.max(...frequency.values());
  const min = Math.min(...frequency.values());

  return max - min;
};

console.log('Part 1: ', calculate('./input.txt', 10));
console.log('Part 2: ', calculate('./input.txt', 40));
