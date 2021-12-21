import { readFileSync } from 'fs';

interface Player {
  start: number;
  score: number;
}

const calculatePart1 = (filePath: string) => {
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

  let dice = 1;
  let curr = p1;

  while (true) {
    const roll = 3 * dice + 3;
    
    curr.start = ((curr.start - 1 + roll) % 10) + 1;
    curr.score += curr.start;

    dice += 3;

    if (curr.score >= 1000) {
      break;
    }
    curr = curr === p1 ? p2 : p1;
  }

  console.log(Math.min(p1.score, p2.score) * (dice - 1));
};

calculatePart1('./input.txt');
