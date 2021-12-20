import fs from 'fs';

const findAdjacentPoints = (x: number, y: number): number[][] => {
  const points: number[][] = [];

  points.push([x - 1, y - 1]);
  points.push([x - 1, y]);
  points.push([x - 1, y + 1]);
  points.push([x, y - 1]);
  points.push([x, y]);
  points.push([x, y + 1]);
  points.push([x + 1, y - 1]);
  points.push([x + 1, y]);
  points.push([x + 1, y + 1]);

  return points;
};

const count = (image: (0 | 1)[][]) =>
  image.reduce((acc: number, curr: (0 | 1)[]): number => {
    acc += curr.reduce(
      (acc1: number, curr1: 0 | 1): number =>
        curr1 === 1 ? (acc1 += 1) : acc1,
      0
    );
    return acc;
  }, 0);

const binaryToDecimal = (binary: (0 | 1)[]): number =>
  parseInt(binary.join(''), 2);

const calcAdj = (
  algorithm: (0 | 1)[],
  image: (0 | 1)[][],
  i: number,
  x: number,
  y: number
) => {
  const empty = i % 2 ? algorithm[0] : 0;
  const idx = findAdjacentPoints(x, y).map((x) => image[x[0]]?.[x[1]] ?? empty);
  const decimal = binaryToDecimal(idx);
  return algorithm[decimal];
};

const enhance = (
  algorithm: (0 | 1)[],
  image: (0 | 1)[][],
  i: number
): (0 | 1)[][] => {
  const enhancedImage: (0 | 1)[][] = [];
  for (let x = -1; x < image.length + 1; x += 1) {
    const entry: (0 | 1)[] = [];
    for (let y = -1; y < image.length + 1; y += 1) {
      entry.push(calcAdj(algorithm, image, i, x, y));
    }
    enhancedImage.push(entry);
  }
  return enhancedImage;
};

const calculate = (filePath: string, iterations: number): number => {
  const [input1, input2] = fs.readFileSync(filePath, 'utf8').split('\n\n');

  const algorithm = input1.split('').map((x) => (x === '#' ? 1 : 0));
  let image = input2
    .split('\n')
    .map((x) => x.split('').map((y) => (y === '#' ? 1 : 0)));

  let i = 0;
  while (i < iterations) {
    image = enhance(algorithm, image, i);
    i += 1;
  }

  return count(image);
};

console.log('Part 1: ', calculate('./input.txt', 2));
console.log('Part 2: ', calculate('./input.txt', 50));
