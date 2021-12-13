import { readFileSync } from 'fs';

enum Axis {
  X = 'x',
  Y = 'y',
}

interface Instruction {
  axis: Axis;
  value: number;
}

const findInstructions = (instruction: string): Instruction[] => {
  const instructions: Instruction[] = [];

  instruction.split('\n').forEach((element) => {
    const elem = element.split(' ')[2].split('=');

    if (elem[0] === 'x') instructions.push({ axis: Axis.X, value: +elem[1] });
    if (elem[0] === 'y') instructions.push({ axis: Axis.Y, value: +elem[1] });
  });

  return instructions;
};

const sortAsc = (a: number, b: number): number => {
  return a - b;
};

const findSize = (points: Set<string>): { x: number; y: number } => {
  const x: number[] = [];
  const y: number[] = [];

  points.forEach((point) => {
    const [x1, y1] = point.split(',');

    x.push(+x1);
    y.push(+y1);
  });

  return { x: x.sort(sortAsc).pop() ?? 0, y: y.sort(sortAsc).pop() ?? 0 };
};

const fillMatrix = (rowCount: number, columnCount: number): string[][] =>
  Array(rowCount + 1)
    .fill('.')
    .map(() => Array(columnCount + 1).fill('.'));

const print2DArray = (arr: string[][]): void => {
  arr.forEach((element) => {
    console.log(element.toString().replaceAll(',', ''));
  });
};

const calculate = (filePath: string): void => {
  const input = readFileSync(filePath, 'utf8').split('\n\n');

  const coordinates = input[0].split('\n');
  const instructions = findInstructions(input[1]);

  const distinctPoints = coordinates.reduce(
    (acc: Set<string>, curr: string): Set<string> => {
      const [y, x] = curr.split(',');

      acc.add(`${y},${x}`);

      return acc;
    },
    new Set<string>()
  );

  instructions.forEach((instruction: Instruction, idx: number) => {
    const { axis, value } = instruction;

    distinctPoints.forEach((point: string) => {
      const y = +point.split(',')[0];
      const x = +point.split(',')[1];

      // flip and merge on X
      if (axis === Axis.X && y > value) {
        const newY = Math.abs(value * 2 - y);

        distinctPoints.add(`${newY},${x}`);
        distinctPoints.delete(point);
      }

      // flip and merge on Y
      if (axis === Axis.Y && x > value) {
        const newX = Math.abs(value * 2 - x);

        distinctPoints.add(`${y},${newX}`);
        distinctPoints.delete(point);
      }
    });

    if (idx === 0) console.log('Dots after 1st fold = ', distinctPoints.size);
  });

  const { y, x } = findSize(distinctPoints);

  const matrix = fillMatrix(y, x);

  distinctPoints.forEach((coord) => {
    const [y, x] = coord.split(',');
    matrix[+x][+y] = '#';
  });

  print2DArray(matrix);
};

calculate('day13/input.txt');
