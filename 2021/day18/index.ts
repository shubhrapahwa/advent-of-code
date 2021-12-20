import { readFileSync } from 'fs';

type RegExpMatchArrayIndex = RegExpMatchArray & { index: number };

const split = (fish: string, match: RegExpMatchArrayIndex): string => {
  const left = fish.slice(0, match.index);
  const right = fish.slice(match.index + 2);

  const elemToSplit = +match[0];

  const x = Math.floor(elemToSplit / 2);
  const y = Math.ceil(elemToSplit / 2);

  return `${left}[${x},${y}]${right}`;
};

const deduceRight = (str: string, val: number): string =>
  str.replace(/(\d+)/, (n: string): string => (+n + val).toString());

const deduceLeft = (str: string, val: number): string => {
  const leftToRight = str.split(',').reverse().join();
  const right = deduceRight(leftToRight, val);

  return right.split(',').reverse().join();
};

const explode = (fish: string, match: RegExpMatchArrayIndex): string => {
  const [xy, x, y, ...everythingElse] = match;

  const left = deduceLeft(fish.slice(0, match.index), +x);
  const right = deduceRight(fish.slice(match.index + match[0].length), +y);

  return `${left}0${right}`;
};

const depth = (fish: string, match: RegExpMatchArrayIndex): number => {
  let d = 0;
  let i = 0;

  while (i < match.index) {
    if (fish[i] === '[') {
      d += 1;
    } else if (fish[i] === ']') {
      d -= 1;
    }
    i += 1;
  }

  return d;
};

const reduce = (fish: string): string => {
  outer: while (true) {
    for (const match of fish.matchAll(/\[(\d+),(\d+)]/g)) {
      const d = depth(fish, match as RegExpMatchArrayIndex);
      if (d >= 4) {
        fish = explode(fish, match as RegExpMatchArrayIndex);
        continue outer;
      }
    }
    for (const match of fish.matchAll(/\d\d+/g)) {
      fish = split(fish, match as RegExpMatchArrayIndex);
      continue outer;
    }
    break;
  }
  return fish;
};

const findMagnitude = (fishes: any[]): number => {
  if (fishes.length > 1) {
    return 3 * findMagnitude(fishes[0]) + 2 * findMagnitude(fishes[1]);
  }

  return +fishes;
};

const sum = (fish1: string, fish2: string): string => {
  return reduce(`[${fish1},${fish2}]`);
};

const calculatePart1 = (filePath: string) => {
  const input = readFileSync(filePath, 'utf8').split('\n');

  const result = input.reduce((acc, curr) => sum(acc, curr));

  console.log('Part 1: ', findMagnitude(JSON.parse(result)));
};

const calculatePart2 = (filePath: string) => {
  const input = readFileSync(filePath, 'utf8').split('\n');

  const magnitudes: number[] = [];

  for (let i = 0; i < input.length - 1; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      const a = findMagnitude(JSON.parse(reduce(`[${input[i]},${input[j]}]`)));
      const b = findMagnitude(JSON.parse(reduce(`[${input[j]},${input[i]}]`)));

      magnitudes.push(a);
      magnitudes.push(b);
    }
  }
  console.log('Part 2: ', Math.max(...magnitudes));
};

calculatePart1('./input.txt');
calculatePart2('./input.txt');
