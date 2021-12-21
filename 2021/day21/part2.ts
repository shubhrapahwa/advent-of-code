import { readFileSync } from 'fs';

interface Player {
  start: number;
  score: number;
}

const multiplier = new Map<number, number>([
  [3, 1], // [1,1,1]
  [4, 3], // [1,1,2], [1,2,1], [2,1,1]
  [5, 6], // [1,1,3], [1,3,1], [3,1,1], [1,2,2], [2,1,2], [2,2,1]
  [6, 7], // [1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1], [2,2,2]
  [7, 6], // [2,2,3], [2,3,2], [3,2,2], [1,3,3], [3,1,3], [3,3,1]
  [8, 3], // [2,3,3], [3,2,3], [3,3,2]
  [9, 1], // [3,3,3]
]);

const split = (p1: Player, p2: Player, isP1: boolean): number => {
  if (p1.score >= 21) {
    return 1;
  } else if (p2.score >= 21) {
    return 0;
  }

  const curr = isP1 ? p1 : p2;
  let sum = 0;
  let roll = 3;

  while (roll <= 9) {
    const { start, score } = curr;

    curr.start = ((curr.start - 1 + roll) % 10) + 1;
    curr.score += curr.start;

    const mult = multiplier.get(roll) ?? 0;
    sum += mult * split(p1, p2, !isP1);

    curr.start = start;
    curr.score = score;

    roll += 1;
  }

  return sum;
};

const calculatePart2 = (filePath: string): void => {
  const [p1Start, p2Start] = readFileSync(filePath, 'utf-8')
    .split('\n')
    .map((x) => +x.slice(-1));

  const p1: Player = {
    start: p1Start,
    score: 0,
  };

  const p2: Player = {
    start: p2Start,
    score: 0,
  };

  const sum = split(p1, p2, true);

  console.log(sum);
};

calculatePart2('./input.txt');
