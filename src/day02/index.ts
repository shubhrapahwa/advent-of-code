import { readFileSync } from 'fs';

enum Direction {
  Forward = 'forward',
  Down = 'down',
  Up = 'up',
}

interface Position {
  horizontal: number;
  depth: number;
}

/**
 * Part - 1
 */
export const calculateResultPart1 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, 'utf8').split('\n');

  const { horizontal, depth } = inputArray.reduce(
    (previousValue: Position, currentValue: string): Position => {
      const [dir, value] = currentValue.split(' ');

      const val = +value;

      switch (dir) {
        case Direction.Forward:
          return {
            horizontal: previousValue.horizontal + val,
            depth: previousValue.depth,
          };
        case Direction.Down:
          return {
            horizontal: previousValue.horizontal,
            depth: previousValue.depth + val,
          };
        case Direction.Up:
          return {
            horizontal: previousValue.horizontal,
            depth: previousValue.depth - val,
          };
        default:
          return previousValue;
      }
    },
    { horizontal: 0, depth: 0 }
  );

  return horizontal * depth;
};

interface PositionWithAim extends Position {
  aim: number;
}

/**
 * Part - 2
 */
export const calculateResultPart2 = (filePath: string): number => {
  const inputArray = readFileSync(filePath, 'utf8').split('\n');

  const { horizontal, depth } = inputArray.reduce(
    (previousValue: PositionWithAim, currentValue: string): PositionWithAim => {
      const [dir, value] = currentValue.split(' ');

      const val = +value;

      if (dir === Direction.Forward) {
        return {
          aim: previousValue.aim,
          horizontal: previousValue.horizontal + val,
          depth: previousValue.depth + previousValue.aim * val,
        };
      }

      if (dir === Direction.Up) {
        return {
          aim: previousValue.aim - val,
          horizontal: previousValue.horizontal,
          depth: previousValue.depth,
        };
      }

      if (dir === Direction.Down) {
        return {
          aim: previousValue.aim + val,
          horizontal: previousValue.horizontal,
          depth: previousValue.depth,
        };
      }

      return previousValue;
    },
    { aim: 0, horizontal: 0, depth: 0 }
  );

  return horizontal * depth;
};
